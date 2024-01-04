import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyChkuwTZc7HYwiPYe5FHakjcc8rBfdDc6s",
    authDomain: "react-e85f7.firebaseapp.com",
    projectId: "react-e85f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db, collection, getDocs, query, where, addDoc }; // Export Firestore instance and necessary functions
