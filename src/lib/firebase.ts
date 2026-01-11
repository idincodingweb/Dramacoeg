import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Opsional kalau mau pakai analitik

const firebaseConfig = {
  apiKey: "AIzaSyBd1fbnj6zeY7E7bHo0p0ff5yL_u6lQNDo",
  authDomain: "dramacoeg.firebaseapp.com",
  projectId: "dramacoeg",
  storageBucket: "dramacoeg.firebasestorage.app",
  messagingSenderId: "1073005442110",
  appId: "1:1073005442110:web:12ba2a1899ae38af6bcd6f",
  measurementId: "G-WVZZLLXDZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Database supaya bisa dipakai di AuthContext
export const db = getFirestore(app);