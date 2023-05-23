// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_zXUwjdWXx5Oi3y142sGnLGuzwcz54rI",
    authDomain: "english-now-ce201.firebaseapp.com",
    projectId: "english-now-ce201",
    storageBucket: "english-now-ce201.appspot.com",
    messagingSenderId: "1014147422706",
    appId: "1:1014147422706:web:224d8a0a2e71c355bf736b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;