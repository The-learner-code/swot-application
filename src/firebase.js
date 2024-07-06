import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-jZBOHVa2J-tFgKJqNH8NoFxjzzRrEG0",
  authDomain: "rentease-74b30.firebaseapp.com",
  projectId: "rentease-74b30",
  storageBucket: "rentease-74b30.appspot.com",
  messagingSenderId: "416530398625",
  appId: "1:416530398625:web:339b787356192182679fe0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

export { auth, db, storage };
