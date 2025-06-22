import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2FL9Xsjmgew7VzSjrdZBmsjA6yC1TOFk",
  authDomain: "careerlunch-6856b.firebaseapp.com",
  projectId: "careerlunch-6856b",
  storageBucket: "careerlunch-6856b.firebasestorage.app",
  messagingSenderId: "99374584826",
  appId: "1:99374584826:web:d060a9dd840a25a9ceca43",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
