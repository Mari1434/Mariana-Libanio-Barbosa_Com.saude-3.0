import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDLa-GN7pV45BCwgqU4kVeHTrso7eIstug",
  authDomain: "comsaude3-fd868.firebaseapp.com",
  projectId: "comsaude3-fd868",
  storageBucket: "comsaude3-fd868.firebasestorage.app",
  messagingSenderId: "726228261307",
  appId: "1:726228261307:web:01656ee41ebd3a01f84c9e",
  measurementId: "G-XVCP2M8WW5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };