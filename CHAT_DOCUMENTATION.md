# Chat System Documentation

## Overview

The Dream College Path application features a sophisticated AI-powered chat system that uses Retrieval-Augmented Generation (RAG) to provide contextual answers based on uploaded course transcripts and documents. The system combines modern web technologies with advanced AI capabilities to create an intelligent tutoring assistant.

## Architecture

### Frontend (React/TypeScript)
- **Location**: `src/pages/Chat.tsx`
- **Framework**: React with TypeScript
- **UI Library**: Tailwind CSS with custom components
- **Icons**: Lucide React

### Backend (Node.js/Express)
- **Location**: `server/index.js`
- **Framework**: Express.js
- **Runtime**: Node.js with ES modules

### AI & Vector Database
- **LLM**: OpenAI GPT-4o-mini
- **Embeddings**: OpenAI text-embedding-3-small
- **Vector Database**: Pinecone
- **Document Processing**: Custom text extraction and chunking

## Frontend Implementation

### Core Components

#### Message Interface
```typescript
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Array<{
    filename: string;
    chunkIndex: number;
    score: number;
  }>;
}
```

#### State Management
- **Messages**: Array of conversation messages with welcome message
- **Input**: Current user input string
- **Loading**: Boolean for API request state
- **Auto-scroll**: Automatic scrolling to latest messages

#### Key Features
1. **Real-time Chat Interface**: Clean, modern chat UI with user/assistant message distinction
2. **Message History**: Maintains conversation context with timestamps
3. **Source Attribution**: Displays document sources with relevance scores
4. **Loading States**: Visual feedback during API calls
5. **Auto-scroll**: Automatically scrolls to new messages
6. **Responsive Design**: Works on desktop and mobile devices

### User Experience
- **Message Bubbles**: Different styling for user (blue) vs assistant (gray) messages
- **Avatars**: User and Bot icons for message identification
- **Timestamps**: Local time display for each message
- **Source Citations**: Shows which documents informed the response
- **Loading Animation**: Bouncing dots during response generation

## Backend Implementation

### Core Dependencies
```javascript
// AI & Vector Database
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

// Document Processing
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import multer from 'multer';

// Database & Storage
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';
import admin from 'firebase-admin';
```

### Document Processing Pipeline

#### 1. File Upload & Text Extraction
```javascript
const extractTextFromFile = async (filePath, originalName) => {
  // Supports: .txt, .vtt, .srt, .pdf, .docx
  // Uses appropriate parser for each file type
}
```

**Supported File Types**:
- **Text files**: .txt, .vtt (video transcripts), .srt (subtitles)
- **PDF files**: Using pdf-parse library
- **Word documents**: .docx using mammoth library

#### 2. Text Chunking
```javascript
const chunkText = (text, chunkSize = 1000, overlap = 200) => {
  // Intelligent sentence-based chunking
  // Maintains context with overlapping chunks
  // Filters out very small chunks (<50 characters)
}
```

**Chunking Strategy**:
- **Chunk Size**: 1000 characters (configurable)
- **Overlap**: 200 characters between chunks
- **Sentence Boundary**: Splits on sentence endings (.!?)
- **Context Preservation**: Overlapping ensures no information loss

#### 3. Embedding Generation
```javascript
const createEmbedding = async (text) => {
  // Uses OpenAI text-embedding-3-small model
  // Converts text to 1536-dimensional vectors
}
```

#### 4. Vector Storage
```javascript
const storeDocumentChunks = async (documentId, chunks, metadata) => {
  // Stores in Pinecone with metadata
  // Batch processing for efficiency
  // Includes document ID, chunk index, filename, upload date
}
```

### Chat API Endpoint

#### Request Processing
```javascript
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory = [] } = req.body;
  
  // 1. Create embedding for user question
  // 2. Search Pinecone for relevant chunks
  // 3. Filter by relevance score (>0.7)
  // 4. Build context-aware prompt
  // 5. Generate response with OpenAI
  // 6. Return response with sources
});
```

#### RAG Implementation Flow

1. **Question Embedding**: Convert user question to vector using OpenAI embeddings
2. **Similarity Search**: Query Pinecone for top 5 most similar document chunks
3. **Relevance Filtering**: Only use chunks with similarity score > 0.7
4. **Context Building**: Combine relevant chunks into system prompt
5. **Response Generation**: Use GPT-4o-mini with context and conversation history
6. **Source Attribution**: Return document sources with relevance scores

#### System Prompt Strategy
```javascript
const systemPrompt = `You are a helpful tutoring assistant that answers questions based ONLY on the provided class transcript content.

IMPORTANT RULES:
1. Only use information from the provided transcript content below
2. If the question cannot be answered from the transcript content, say so clearly
3. Be concise but thorough in your explanations
4. Reference specific parts of the transcript when relevant
5. Do not make up or hallucinate any information

TRANSCRIPT CONTENT:
${relevantChunks}`;
```

### Configuration & Settings

#### OpenAI Configuration
- **Model**: gpt-4o-mini (cost-effective, fast)
- **Max Tokens**: 500 (concise responses)
- **Temperature**: 0.1 (factual, consistent responses)
- **Context Window**: Last 6 messages for conversation continuity

#### Pinecone Configuration
- **Index Name**: 'tutoring-bot' (configurable via environment)
- **Top K**: 5 most similar chunks
- **Similarity Threshold**: 0.7 minimum score
- **Metadata**: Includes filename, chunk index, text content

## Data Flow

### Document Upload Flow
1. Admin uploads document via `/api/admin/upload-transcript`
2. File saved to local `uploads/` directory
3. Document metadata stored in Azure Tables
4. Async processing begins (`processDocumentAsync`)
5. Text extracted based on file type
6. Text chunked with overlap
7. Embeddings created for each chunk
8. Vectors stored in Pinecone with metadata
9. Document status updated to 'ready'

### Chat Interaction Flow
1. User types message in frontend
2. Message sent to `/api/chat` endpoint
3. User question converted to embedding
4. Pinecone searched for similar content
5. Relevant chunks filtered and combined
6. System prompt built with context
7. OpenAI generates response
8. Response returned with source attribution
9. Frontend displays message and sources

## Security & Performance

### Security Features
- **Authentication**: Firebase Admin SDK for session verification
- **Authorization**: Admin-only document upload
- **Rate Limiting**: Express rate limiting on auth endpoints
- **Input Validation**: Message content validation
- **CORS**: Configured for specific development ports

### Performance Optimizations
- **Batch Processing**: Pinecone upserts in batches of 100
- **Async Processing**: Document processing doesn't block uploads
- **Context Limiting**: Only last 6 messages for conversation context
- **Chunk Filtering**: Minimum relevance score to reduce noise
- **File Size Limits**: 50MB maximum upload size

### Error Handling
- **Graceful Degradation**: Fallback messages when no relevant content found
- **Error Logging**: Comprehensive error logging throughout pipeline
- **Status Tracking**: Document processing status in database
- **User Feedback**: Clear error messages in chat interface

## Environment Variables

```bash
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=tutoring-bot

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# Azure Storage
AZURE_STORAGE_ACCOUNT=your_storage_account
AZURE_STORAGE_KEY=your_storage_key
AZURE_TABLE_NAME=Users
```

## API Endpoints

### Chat Endpoints
- **POST `/api/chat`**: Main chat endpoint for user interactions
  - Body: `{ message: string, conversationHistory: Message[] }`
  - Response: `{ response: string, sources: Source[] }`

### Admin Endpoints
- **POST `/api/admin/upload-transcript`**: Upload new documents
- **GET `/api/admin/documents`**: List all uploaded documents
- **GET `/api/admin/document-status/:id`**: Check processing status
- **DELETE `/api/admin/documents/:id`**: Delete document and vectors

## Future Enhancements

### Potential Improvements
1. **Multi-modal Support**: Image and video content processing
2. **Advanced Chunking**: Semantic chunking based on content structure
3. **Conversation Memory**: Long-term conversation persistence
4. **Analytics**: Usage tracking and performance metrics
5. **Custom Models**: Fine-tuned models for specific domains
6. **Real-time Updates**: WebSocket support for live responses
7. **Multi-language**: Support for non-English content
8. **Advanced Search**: Hybrid search combining keyword and semantic search

## Troubleshooting

### Common Issues
1. **No relevant content found**: Check document upload and processing status
2. **Slow responses**: Monitor OpenAI API rate limits and Pinecone performance
3. **Memory issues**: Large documents may need chunking optimization
4. **Authentication errors**: Verify Firebase configuration and session tokens

### Monitoring
- Check document processing status via admin endpoints
- Monitor server logs for embedding and search errors
- Verify Pinecone index health and vector counts
- Track OpenAI API usage and costs

This chat system represents a modern implementation of RAG technology, providing accurate, contextual responses while maintaining transparency through source attribution and robust error handling.