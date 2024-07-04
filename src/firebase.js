import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBBYYlQA3zUkaeAbl8B8OgcnLIrHQCmAcI",
    authDomain: "vrms-408cd.firebaseapp.com",
    projectId: "vrms-408cd",
    storageBucket: "vrms-408cd.appspot.com",
    messagingSenderId: "832347966546",
    appId: "1:832347966546:web:53892b6982e84a6360238b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };