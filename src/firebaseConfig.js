import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBW41wAfS6N3G1cxtnm8JBV-E5s_7rDuwM",
  authDomain: "pockettailor-7331d.firebaseapp.com",
  projectId: "pockettailor-7331d",
  storageBucket: "pockettailor-7331d.appspot.com",
  messagingSenderId: "645271708126",
  appId: "1:645271708126:web:7026791bf9e62c9ceafd4f",
  measurementId: "G-654V56JNE9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
