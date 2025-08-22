// Re-export everything from the new firebase-config file
export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
  verifyEmail,
  logOut,
  onAuthStateChange,
  createOrUpdateUser,
  getUserData,
  updateUserData,
  uploadAvatar,
  default
} from './firebase-config';
export type { UserData } from './firebase-config';