import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import admin from 'firebase-admin';
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';
import rateLimit from 'express-rate-limit';
// File processing imports removed - no longer processing documents
// Removed OpenAI, Pinecone, and document processing imports - using only Firebase and Azure
import 'dotenv/config';

// File path utilities removed - no longer processing files

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

// OpenAI removed - using only Firebase and Azure

// Pinecone removed - using only Firebase and Azure

// Initialize Azure Table Storage (Users only)
let tableClient = null;
let azureInitialized = false;
try {
  const tableAccount = process.env.AZURE_STORAGE_ACCOUNT;
  const tableKey = process.env.AZURE_STORAGE_KEY;
  
  if (tableAccount && tableKey) {
    const usersTableName = process.env.AZURE_TABLE_NAME || 'Users';
    const tableUrl = `https://${tableAccount}.table.core.windows.net`;
    const credential = new AzureNamedKeyCredential(tableAccount, tableKey);
    tableClient = new TableClient(tableUrl, usersTableName, credential);
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

// File upload configuration removed - no longer processing documents

// Text extraction and chunking functions removed - no longer processing documents

// createEmbedding function removed - no longer using OpenAI embeddings

// storeDocumentChunks function removed - no longer using Pinecone vector storage

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

// Document upload endpoints removed - no longer processing documents for AI chat

// Document status endpoints removed - no longer processing documents

// Document listing endpoints removed - no longer managing documents

// Document deletion endpoints removed - no longer managing documents

// Chat endpoints removed - no longer using OpenAI and Pinecone for RAG

// Document processing functions removed - no longer using OpenAI and Pinecone

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