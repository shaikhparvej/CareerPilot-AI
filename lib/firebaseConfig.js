// Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Check if Firebase environment variables are properly configured
const isFirebaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('demo') &&
    !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID.includes('demo')
  );
};

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase only if properly configured
let firebaseApp;
let db;

if (isFirebaseConfigured()) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    db = createMockDb();
  }
} else {
  console.warn("⚠️ Firebase not configured - using mock database");
  console.log("💡 To enable Firebase: Set Firebase environment variables in .env.local");
  db = createMockDb();
}

// Create mock database for development without Firebase
function createMockDb() {
  return {
    collection: () => ({
      addDoc: async () => {
        console.log("Mock Firebase: addDoc called");
        return { id: "mock-id-" + Date.now() };
      },
      setDoc: async () => {
        console.log("Mock Firebase: setDoc called");
      },
      getDocs: async () => {
        console.log("Mock Firebase: getDocs called");
        return { docs: [] };
      },
      query: () => ({}),
      where: () => ({}),
      doc: () => ({
        get: async () => ({
          exists: () => false,
          data: () => ({})
        }),
        set: async () => {
          console.log("Mock Firebase: doc.set called");
        }
      })
    }),
    doc: () => ({
      setDoc: async () => {
        console.log("Mock Firebase: doc.setDoc called");
      },
      get: async () => ({
        exists: () => false,
        data: () => ({})
      })
    })
  };
}

export { db, firebaseApp };
