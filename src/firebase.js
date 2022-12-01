// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK9vbE4wy4LZxzqB2U16tahif-S-ZYODg",
  authDomain: "cs-todo-b5731.firebaseapp.com",
  projectId: "cs-todo-b5731",
  storageBucket: "cs-todo-b5731.appspot.com",
  messagingSenderId: "521289141493",
  appId: "1:521289141493:web:5e329ad35376ad5dff89bc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
