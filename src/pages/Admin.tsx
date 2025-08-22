import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Document {
  id: string;
  filename: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  chunks?: number;
}

const Admin = () => {
  const { currentUser, userData, loading } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if user is authenticated and is an admin
  const isAdminUser = currentUser && 
    userData && 
    userData.role === 'admin' && 
    currentUser.email?.toLowerCase().endsWith('@dreamcollegepath.com');

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  // Show error if user is not an admin
  if (!isAdminUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <AlertCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
              <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
              <p className="text-red-600">Admin access requires a @dreamcollegepath.com account.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['.txt', '.pdf', '.docx', '.vtt', '.srt'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload a valid transcript file (.txt, .pdf, .docx, .vtt, .srt)');
      return;
    }

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('transcript', file);
      
      const response = await fetch('/api/admin/upload-transcript', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const result = await response.json();
      
      // Add document to list with processing status
      const newDoc: Document = {
        id: result.documentId,
        filename: file.name,
        uploadDate: new Date().toISOString(),
        status: 'processing'
      };
      
      setDocuments(prev => [newDoc, ...prev]);
      
      // Poll for processing completion
      pollDocumentStatus(result.documentId);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload transcript. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const pollDocumentStatus = async (documentId: string) => {
    const maxAttempts = 30; // 5 minutes max
    let attempts = 0;
    
    const poll = async () => {
      try {
        const response = await api.get(`/admin/document-status/${documentId}`);
        const data = response as any;
        
        if (data.status === 'ready' || data.status === 'error') {
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === documentId 
                ? { ...doc, status: data.status, chunks: data.chunks }
                : doc
            )
          );
          return;
        }
        
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000); // Poll every 10 seconds
        }
      } catch (error) {
        console.error('Error polling document status:', error);
      }
    };
    
    poll();
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const deleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await api.delete(`/admin/documents/${documentId}`);
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete document.');
    }
  };

  const loadDocuments = async () => {
    try {
      const response = await api.get('/admin/documents');
      const data = response as any;
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  // Load documents on component mount
  useState(() => {
    loadDocuments();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Upload and manage class transcripts for the tutoring bot</p>
          </div>

          {/* Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload Transcript</CardTitle>
              <CardDescription>
                Upload class transcripts in .txt, .pdf, .docx, .vtt, or .srt format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop transcript files here
                </h3>
                <p className="text-gray-600 mb-4">
                  or click to browse files
                </p>
                <Button 
                  onClick={handleFileSelect}
                  disabled={uploading}
                  className="mb-2"
                >
                  {uploading ? 'Uploading...' : 'Select Files'}
                </Button>
                <p className="text-sm text-gray-500">
                  Supported formats: .txt, .pdf, .docx, .vtt, .srt
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".txt,.pdf,.docx,.vtt,.srt"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>
                Manage your uploaded transcripts and their processing status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">No documents uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.filename}</h4>
                          <p className="text-sm text-gray-600">
                            Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                            {doc.chunks && ` • ${doc.chunks} chunks`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {doc.status === 'processing' && (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                              <span className="text-sm text-gray-600">Processing...</span>
                            </>
                          )}
                          {doc.status === 'ready' && (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">Ready</span>
                            </>
                          )}
                          {doc.status === 'error' && (
                            <>
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-red-600">Error</span>
                            </>
                          )}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteDocument(doc.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;