// Re-export everything from the new firebase-config file
export {
  auth,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
  verifyEmail,
  logOut,
  onAuthStateChange,
  default
} from './firebase-config';