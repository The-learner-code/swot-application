import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmtr4RFpRZb6S6VV3rpdCGDdFLzAbHDMw",
    authDomain: "cpms-fca1e.firebaseapp.com",
    projectId: "cpms-fca1e",
    storageBucket: "cpms-fca1e.appspot.com",
    messagingSenderId: "763343437611",
    appId: "1:763343437611:web:09cc7394b3d9c99389cf6e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };