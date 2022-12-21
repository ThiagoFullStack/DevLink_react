
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCIoQ-pNgXsTIVguO73ut36QnyTRDG0NKA",
  authDomain: "devlinks-41111.firebaseapp.com",
  projectId: "devlinks-41111",
  storageBucket: "devlinks-41111.appspot.com",
  messagingSenderId: "870130225979",
  appId: "1:870130225979:web:24adf1bf4acd2ab4115d1e",
  measurementId: "G-MRFWQMRXVE"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };