// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWYm99976yQQeU1RPftG-AfytDxZjlh1U",
    authDomain: "mob-app-cd081.firebaseapp.com",
    projectId: "mob-app-cd081",
    storageBucket: "mob-app-cd081.appspot.com",
    messagingSenderId: "543696985081",
    appId: "1:543696985081:web:1944c49374ea725bbe3b28"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);