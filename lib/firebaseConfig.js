// Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
// Note: In a production environment, you should use environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "demo-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id"
};

// Initialize Firebase
let firebaseApp;
let db;

try {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Provide a mock db object for development without proper Firebase credentials
  db = {
    collection: () => ({
      addDoc: async () => ({ id: "mock-id" }),
      setDoc: async () => {},
      doc: () => ({})
    }),
    doc: () => ({
      setDoc: async () => {},
    })
  };
}

export { db, firebaseApp }; 