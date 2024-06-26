// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNzz9UWPN45_DjhuAkNgpqbewEgENkN7I",
  authDomain: "movienet-edfc2.firebaseapp.com",
  projectId: "movienet-edfc2",
  storageBucket: "movienet-edfc2.appspot.com",
  messagingSenderId: "38106922083",
  appId: "1:38106922083:web:5c53aa65910efdb0cc0c56",
  measurementId: "G-JK6ETQVBD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Authentication
const auth = getAuth(app)
const db = getFirestore(app)

async function signup(name, email, password){
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    }
    catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

async function login(email, password){
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

function logout(){
    signOut(auth)
}

export {app, auth, db, login, signup, logout}

