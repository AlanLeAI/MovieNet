
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBulejNDJc6W-B86HzboWad_sieq9OhDiw",
  authDomain: "movienet-d3fea.firebaseapp.com",
  projectId: "movienet-d3fea",
  storageBucket: "movienet-d3fea.appspot.com",
  messagingSenderId: "736697750263",
  appId: "1:736697750263:web:fd84f95e1d3eee602ef9f2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

async function signup(name, email, password){
    try{
        const response = await createUserWithEmailAndPassword(auth,email,password)
        const user = response.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    }catch(error){
        console.log(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
}

async function login(email, password){
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
}

function logout(){
    signOut(auth)
}

export {auth, db, login, signup, logout}