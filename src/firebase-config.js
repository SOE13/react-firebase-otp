import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfsbIiddHAzrQ6SvsJWewWNEHodH-RnV4",
  authDomain: "phone-6d7b3.firebaseapp.com",
  projectId: "phone-6d7b3",
  storageBucket: "phone-6d7b3.appspot.com",
  messagingSenderId: "1058132165287",
  appId: "1:1058132165287:web:8779741fa57c167e5d1182",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
