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

/*const firebaseConfig = {
  apiKey: "AIzaSyA-jZBOHVa2J-tFgKJqNH8NoFxjzzRrEG0",
  authDomain: "rentease-74b30.firebaseapp.com",
  projectId: "rentease-74b30",
  storageBucket: "rentease-74b30.appspot.com",
  messagingSenderId: "416530398625",
  appId: "1:416530398625:web:339b787356192182679fe0"
};*/



