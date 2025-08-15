import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import admin from 'firebase-admin';
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
let firebaseInitialized = false;
try {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firebaseInitialized = true;
    console.log('Firebase Admin initialized successfully');
  } else {
    console.warn('Firebase credentials not provided - running in development mode');
  }
} catch (error) {
  console.warn('Firebase initialization failed - running in development mode:', error.message);
}

// Initialize OpenAI
let openai = null;
let openaiInitialized = false;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    openaiInitialized = true;
    console.log('OpenAI initialized successfully');
  } else {
    console.warn('OpenAI API key not provided - chat functionality will be limited');
  }
} catch (error) {
  console.warn('OpenAI initialization failed:', error.message);
}

// Initialize Pinecone
let pinecone = null;
let index = null;
let pineconeInitialized = false;
try {
  if (process.env.PINECONE_API_KEY) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    index = pinecone.index(process.env.PINECONE_INDEX_NAME || 'tutoring-bot');
    pineconeInitialized = true;
    console.log('Pinecone initialized successfully');
  } else {
    console.warn('Pinecone API key not provided - vector search will be limited');
  }
} catch (error) {
  console.warn('Pinecone initialization failed:', error.message);
}

// Initialize Azure Table Storage
let tableClient = null;
let documentsTableClient = null;
let azureInitialized = false;
try {
  const tableAccount = process.env.AZURE_STORAGE_ACCOUNT;
  const tableKey = process.env.AZURE_STORAGE_KEY;
  
  if (tableAccount && tableKey) {
    const usersTableName = process.env.AZURE_TABLE_NAME || 'Users';
    const documentsTableName = 'Documents';
    const tableUrl = `https://${tableAccount}.table.core.windows.net`;
    const credential = new AzureNamedKeyCredential(tableAccount, tableKey);
    tableClient = new TableClient(tableUrl, usersTableName, credential);
    documentsTableClient = new TableClient(tableUrl, documentsTableName, credential);
    azureInitialized = true;
    console.log('Azure Table Storage initialized successfully');
  } else {
    console.warn('Azure Storage credentials not provided - user data storage will be limited');
  }
} catch (error) {
  console.warn('Azure Table Storage initialization failed:', error.message);
}

(async () => {
  if (azureInitialized && tableClient && documentsTableClient) {
    try {
      await tableClient.createTable();
      console.log(`✅ Azure Table 'Users' is ready`);
    } catch (e) {
      if (e.statusCode === 409) {
        console.log(`ℹ️ Azure Table 'Users' already exists`);
      } else {
        console.error('Failed to ensure Users Azure Table exists:', e);
      }
    }
    
    try {
      await documentsTableClient.createTable();
      console.log(`✅ Azure Table 'Documents' is ready`);
    } catch (e) {
      if (e.statusCode === 409) {
        console.log(`ℹ️ Azure Table 'Documents' already exists`);
      } else {
        console.error('Failed to ensure Documents Azure Table exists:', e);
      }
    }
  }
})();

const app = express();
const PORT = process.env.PORT || 8787;

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.txt', '.pdf', '.docx', '.vtt', '.srt'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only .txt, .pdf, .docx, .vtt, .srt files are allowed.'));
    }
  }
});

// Document processing functions
const extractTextFromFile = async (filePath, originalName) => {
  const extension = path.extname(originalName).toLowerCase();
  
  try {
    switch (extension) {
      case '.txt':
      case '.vtt':
      case '.srt':
        return fs.readFileSync(filePath, 'utf8');
      
      case '.pdf':
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        return pdfData.text;
      
      case '.docx':
        const docxResult = await mammoth.extractRawText({ path: filePath });
        return docxResult.value;
      
      default:
        throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
};

const chunkText = (text, chunkSize = 1000, overlap = 200) => {
  const chunks = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  let currentChunk = '';
  let currentSize = 0;
  
  for (const sentence of sentences) {
    const sentenceLength = sentence.trim().length;
    
    if (currentSize + sentenceLength > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      
      // Create overlap
      const words = currentChunk.split(' ');
      const overlapWords = words.slice(-Math.floor(overlap / 5)); // Approximate word count for overlap
      currentChunk = overlapWords.join(' ') + ' ' + sentence.trim();
      currentSize = currentChunk.length;
    } else {
      currentChunk += (currentChunk ? ' ' : '') + sentence.trim();
      currentSize = currentChunk.length;
    }
  }
  
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks.filter(chunk => chunk.length > 50); // Filter out very small chunks
};

const createEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
    throw error;
  }
};

const storeDocumentChunks = async (documentId, chunks, metadata) => {
  try {
    const vectors = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await createEmbedding(chunk);
      
      vectors.push({
        id: `${documentId}-chunk-${i}`,
        values: embedding,
        metadata: {
          documentId,
          chunkIndex: i,
          text: chunk,
          filename: metadata.filename,
          uploadDate: metadata.uploadDate
        }
      });
    }
    
    // Upsert vectors to Pinecone in batches
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await index.upsert(batch);
    }
    
    return vectors.length;
  } catch (error) {
    console.error('Error storing document chunks:', error);
    throw error;
  }
};

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://your-app.vercel.app'] 
    : ['http://localhost:8080', 'http://localhost:8082', 'http://localhost:8084'], // Allow dev ports
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { error: 'Too many authentication attempts, please try again later.' },
});

const resetLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // Limit password reset to 3 per minute
  message: { error: 'Too many reset attempts, please try again later.' },
});

// Helper function to determine user role
const getUserRole = (email) => {
  return email && email.endsWith('@dreamcollegepath.com') ? 'admin' : 'user';
};

// Helper function to upsert user to Azure Table Storage
const upsertUser = async (userData) => {
  const entity = {
    partitionKey: 'Users',
    rowKey: userData.uid,
    email: userData.email,
    displayName: userData.displayName || '',
    provider: userData.provider || 'password',
    role: getUserRole(userData.email),
    createdAt: userData.createdAt || new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    emailVerified: userData.emailVerified || false,
    photoURL: userData.photoURL || null,
  };

  try {
    await tableClient.upsertEntity(entity, 'Replace');
    return entity;
  } catch (error) {
    console.error('Error upserting user to Azure:', error);
    throw error;
  }
};

// Middleware to verify session
const verifySession = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session;
    if (!sessionCookie) {
      return res.status(401).json({ user: null });
    }

    // Verify the session cookie
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    
    // Get user from Azure Table Storage
    try {
      const entity = await tableClient.getEntity('Users', decodedClaims.uid);
      req.user = {
        uid: entity.rowKey,
        email: entity.email,
        displayName: entity.displayName,
        role: entity.role,
        emailVerified: entity.emailVerified,
        photoURL: entity.photoURL,
      };
    } catch (azureError) {
      // User not found in Azure, create from Firebase claims
      const userData = {
        uid: decodedClaims.uid,
        email: decodedClaims.email,
        displayName: decodedClaims.name,
        emailVerified: decodedClaims.email_verified,
        photoURL: decodedClaims.picture,
      };
      const entity = await upsertUser(userData);
      req.user = {
        uid: entity.rowKey,
        email: entity.email,
        displayName: entity.displayName,
        role: entity.role,
        emailVerified: entity.emailVerified,
        photoURL: entity.photoURL,
      };
    }

    next();
  } catch (error) {
    console.error('Session verification error:', error);
    res.clearCookie('session');
    return res.status(401).json({ user: null });
  }
};

// Middleware to verify admin access
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Routes

// Admin Routes for Document Management

// POST /api/admin/upload-transcript - Upload and process transcript
app.post('/api/admin/upload-transcript', verifySession, verifyAdmin, upload.single('transcript'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const documentId = uuidv4();
    const uploadDate = new Date().toISOString();
    
    // Store document metadata in Azure Table
    const documentEntity = {
      partitionKey: 'Documents',
      rowKey: documentId,
      filename: req.file.originalname,
      filePath: req.file.path,
      uploadDate,
      uploadedBy: req.user.uid,
      status: 'processing',
      chunks: 0
    };
    
    await documentsTableClient.upsertEntity(documentEntity, 'Replace');
    
    // Process document asynchronously
    processDocumentAsync(documentId, req.file.path, req.file.originalname, uploadDate);
    
    res.json({ 
      ok: true, 
      documentId,
      message: 'Document uploaded successfully and is being processed' 
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// GET /api/admin/document-status/:id - Get document processing status
app.get('/api/admin/document-status/:id', verifySession, verifyAdmin, async (req, res) => {
  try {
    const documentId = req.params.id;
    
    const entity = await documentsTableClient.getEntity('Documents', documentId);
    
    res.json({
      status: entity.status,
      chunks: entity.chunks || 0,
      filename: entity.filename,
      uploadDate: entity.uploadDate
    });
    
  } catch (error) {
    console.error('Error getting document status:', error);
    res.status(404).json({ error: 'Document not found' });
  }
});

// GET /api/admin/documents - Get all documents
app.get('/api/admin/documents', verifySession, verifyAdmin, async (req, res) => {
  try {
    const entities = documentsTableClient.listEntities({
      queryOptions: { filter: "PartitionKey eq 'Documents'" }
    });
    
    const documents = [];
    for await (const entity of entities) {
      documents.push({
        id: entity.rowKey,
        filename: entity.filename,
        uploadDate: entity.uploadDate,
        status: entity.status,
        chunks: entity.chunks || 0
      });
    }
    
    // Sort by upload date (newest first)
    documents.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    
    res.json({ documents });
    
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({ error: 'Failed to get documents' });
  }
});

// DELETE /api/admin/documents/:id - Delete document
app.delete('/api/admin/documents/:id', verifySession, verifyAdmin, async (req, res) => {
  try {
    const documentId = req.params.id;
    
    // Get document info first
    const entity = await documentsTableClient.getEntity('Documents', documentId);
    
    // Delete file from disk
    if (entity.filePath && fs.existsSync(entity.filePath)) {
      fs.unlinkSync(entity.filePath);
    }
    
    // Delete vectors from Pinecone
    try {
      const vectorIds = [];
      for (let i = 0; i < (entity.chunks || 0); i++) {
        vectorIds.push(`${documentId}-chunk-${i}`);
      }
      if (vectorIds.length > 0) {
        await index.deleteMany(vectorIds);
      }
    } catch (pineconeError) {
      console.error('Error deleting vectors from Pinecone:', pineconeError);
    }
    
    // Delete from Azure Table
    await documentsTableClient.deleteEntity('Documents', documentId);
    
    res.json({ ok: true, message: 'Document deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

// Chat Routes

// POST /api/chat - Process chat message with RAG
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Create embedding for the user's question
    const questionEmbedding = await createEmbedding(message);
    
    // Search for relevant chunks in Pinecone
    const searchResults = await index.query({
      vector: questionEmbedding,
      topK: 5,
      includeMetadata: true
    });
    
    // Extract relevant context from search results
    const relevantChunks = searchResults.matches
      .filter(match => match.score > 0.7) // Only include high-confidence matches
      .map(match => match.metadata.text)
      .join('\n\n');
    
    if (!relevantChunks) {
      return res.json({
        response: "I don't have information about that topic in the uploaded transcripts. Please ask questions related to the course materials that have been uploaded.",
        sources: []
      });
    }
    
    // Create context-aware prompt
    const systemPrompt = `You are a helpful tutoring assistant that answers questions based ONLY on the provided class transcript content. 

IMPORTANT RULES:
1. Only use information from the provided transcript content below
2. If the question cannot be answered from the transcript content, say so clearly
3. Be concise but thorough in your explanations
4. Reference specific parts of the transcript when relevant
5. Do not make up or hallucinate any information

TRANSCRIPT CONTENT:
${relevantChunks}`;
    
    // Build conversation context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      { role: 'user', content: message }
    ];
    
    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 500,
      temperature: 0.1, // Low temperature for more factual responses
    });
    
    const response = completion.choices[0].message.content;
    
    // Extract source information
    const sources = searchResults.matches
      .filter(match => match.score > 0.7)
      .map(match => ({
        filename: match.metadata.filename,
        chunkIndex: match.metadata.chunkIndex,
        score: match.score
      }));
    
    res.json({
      response,
      sources
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Async function to process documents
const processDocumentAsync = async (documentId, filePath, originalName, uploadDate) => {
  try {
    // Extract text from file
    const text = await extractTextFromFile(filePath, originalName);
    
    // Split into chunks
    const chunks = chunkText(text);
    
    // Store chunks with embeddings
    const chunkCount = await storeDocumentChunks(documentId, chunks, {
      filename: originalName,
      uploadDate
    });
    
    // Update document status
    const updateEntity = {
      partitionKey: 'Documents',
      rowKey: documentId,
      status: 'ready',
      chunks: chunkCount
    };
    
    await documentsTableClient.updateEntity(updateEntity, 'Merge');
    
    console.log(`✅ Document ${documentId} processed successfully with ${chunkCount} chunks`);
    
  } catch (error) {
    console.error(`❌ Error processing document ${documentId}:`, error);
    
    // Update document status to error
    try {
      const updateEntity = {
        partitionKey: 'Documents',
        rowKey: documentId,
        status: 'error',
        errorMessage: error.message
      };
      
      await documentsTableClient.updateEntity(updateEntity, 'Merge');
    } catch (updateError) {
      console.error('Error updating document status:', updateError);
    }
  }
};

// Auth Routes

// POST /api/auth/upsert - Handle post-login user creation/update
app.post('/api/auth/upsert', authLimiter, async (req, res) => {
  try {
    const { idToken } = req.body;
    
    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Prepare user data
    const userData = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name || '',
      emailVerified: decodedToken.email_verified || false,
      photoURL: decodedToken.picture || null,
      provider: decodedToken.firebase.sign_in_provider === 'google.com' ? 'google' : 'password',
    };

    // Upsert to Azure Table Storage
    const entity = await upsertUser(userData);

    // Create session cookie (expires in 14 days)
    const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days in milliseconds
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    // Set secure HTTP-only cookie
    res.cookie('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // Return user profile
    res.json({
      ok: true,
      user: {
        uid: entity.rowKey,
        email: entity.email,
        displayName: entity.displayName,
        role: entity.role,
        emailVerified: entity.emailVerified,
        photoURL: entity.photoURL,
      },
    });
  } catch (error) {
    console.error('Auth upsert error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// GET /api/auth/me - Get current user
app.get('/api/auth/me', verifySession, (req, res) => {
  res.json({ user: req.user });
});

// POST /api/auth/logout - Clear session
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ ok: true });
});

// POST /api/auth/reset - Send password reset email
app.post('/api/auth/reset', resetLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send password reset email via Firebase
    await admin.auth().generatePasswordResetLink(email);
    
    // Don't reveal whether email exists or not for security
    res.json({ ok: true, message: 'If an account exists for this email, a reset link has been sent.' });
  } catch (error) {
    console.error('Password reset error:', error);
    // Still return success to prevent email enumeration
    res.json({ ok: true, message: 'If an account exists for this email, a reset link has been sent.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;