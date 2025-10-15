// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
import {
    addDoc,
    collection,
    getFirestore
} from 'firebase/firestore'
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyCAYPfKpvbzL967Dc_qOnFHWge6yv1yWJg",
  authDomain: "netflix-98140.firebaseapp.com",
  projectId: "netflix-98140",
  storageBucket: "netflix-98140.firebasestorage.app",
  messagingSenderId: "131110319562",
  appId: "1:131110319562:web:028110f798b46dcc7d4b33",
  measurementId: "G-1F758EG98T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app)
// const analytics = getAnalytics(app);

const login = async (email,password)=> {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Logged in successfully!");
        return TextTrackCue
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
        return false
    }
}

const signup = async(name,email, password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
        toast.success("Signed Up successfully!");
        return true
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
        return false
    }
}
const logout =() => {
    signOut(auth)
}
export { auth, db, signup, login, logout };