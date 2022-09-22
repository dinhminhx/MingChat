import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ3A_8X1OWQarhUDA-iLMjeABkmbky0s4",
  authDomain: "mingchat-f42e8.firebaseapp.com",
  projectId: "mingchat-f42e8",
  storageBucket: "mingchat-f42e8.appspot.com",
  messagingSenderId: "802830141402",
  appId: "1:802830141402:web:25728b720bd088424ca2e3",
  measurementId: "G-LR2P8LJE8R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);