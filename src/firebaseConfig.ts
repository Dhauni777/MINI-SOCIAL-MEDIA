import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAJ-ReLAlfviSTFcUxjN43-ZiMY765YxpI",
  authDomain: "social-media-app-707b5.firebaseapp.com",
  databaseURL: "https://social-media-app-707b5-default-rtdb.firebaseio.com",
  projectId: "social-media-app-707b5",
  storageBucket: "social-media-app-707b5.firebasestorage.app",
  messagingSenderId: "1088668365831",
  appId: "1:1088668365831:web:6ddcf55ab78a0eb181a6a2",
  measurementId: "G-FLLLMCTZEG"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); 

export { auth, app, provider, db }; 
