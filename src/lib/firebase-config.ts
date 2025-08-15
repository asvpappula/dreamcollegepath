import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

// Environment validation
const requiredEnvVars = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars);
  console.error('Please set the following environment variables:');
  missingVars.forEach(varName => {
    console.error(`- ${varName}`);
  });
  
  // Show user-friendly error in development
  if (import.meta.env.DEV) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        z-index: 9999;
      ">
        <div style="
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          text-align: center;
        ">
          <h2 style="color: #dc3545; margin-bottom: 1rem;">Configuration Error</h2>
          <p style="margin-bottom: 1rem;">Missing Firebase environment variables:</p>
          <ul style="text-align: left; color: #6c757d;">
            ${missingVars.map(varName => `<li>${varName}</li>`).join('')}
          </ul>
          <p style="margin-top: 1rem; font-size: 0.9rem; color: #6c757d;">
            Please check your .env file and ensure all Firebase variables are set.
          </p>
        </div>
      </div>
    `;
    document.body.appendChild(errorDiv);
  }
}

// Firebase configuration with fallbacks
const firebaseConfig = {
  apiKey: requiredEnvVars.VITE_FIREBASE_API_KEY || '',
  authDomain: requiredEnvVars.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: requiredEnvVars.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: requiredEnvVars.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: requiredEnvVars.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: requiredEnvVars.VITE_FIREBASE_APP_ID || '',
};

// Initialize Firebase only if all required vars are present
let app: any = null;
let auth: any = null;

try {
  if (missingVars.length === 0) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    console.warn('Firebase not initialized due to missing environment variables');
  }
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

// Google provider
let googleProvider: GoogleAuthProvider | null = null;
if (auth) {
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
}

// Auth functions with error handling
export const signInWithGoogle = () => {
  if (!auth || !googleProvider) {
    throw new Error('Firebase not properly configured');
  }
  return signInWithPopup(auth, googleProvider);
};

export const signInWithEmail = (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase not properly configured');
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase not properly configured');
  }
  return createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email: string) => {
  if (!auth) {
    throw new Error('Firebase not properly configured');
  }
  return sendPasswordResetEmail(auth, email);
};

export const verifyEmail = (user: User) => {
  if (!auth) {
    throw new Error('Firebase not properly configured');
  }
  return sendEmailVerification(user);
};

export const logOut = () => {
  if (!auth) {
    throw new Error('Firebase not properly configured');
  }
  return signOut(auth);
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!auth) {
    console.warn('Firebase not configured, auth state changes will not work');
    return () => {}; // Return empty unsubscribe function
  }
  return onAuthStateChanged(auth, callback);
};

export { auth };
export default app;