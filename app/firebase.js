import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

console.log(process.env.apikey)

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authdomain,
    projectId: process.env.projectid,
    storageBucket: process.env.storagebucket,
    messagingSenderId: process.env.messageid,
    appId: process.env.appid
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }; 