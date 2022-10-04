// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "chitchat-4cf1a.firebaseapp.com",
  projectId: "chitchat-4cf1a",
  storageBucket: "chitchat-4cf1a.appspot.com",
  messagingSenderId: "700381504751",
  appId: "1:700381504751:web:5b175691f2183bf65fa71a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
