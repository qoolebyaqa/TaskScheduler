// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3q-ssf8BXM2koL0cVsFCfnInLbauujBw",
  authDomain: "udemy-max-b1bc4.firebaseapp.com",
  databaseURL: "https://udemy-max-b1bc4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "udemy-max-b1bc4",
  storageBucket: "udemy-max-b1bc4.appspot.com",
  messagingSenderId: "607052681535",
  appId: "1:607052681535:web:f5071a01b803399215838a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();

export function createUser(email:any, password:any) {
  return createUserWithEmailAndPassword(auth, email, password);
}