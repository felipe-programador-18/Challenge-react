import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAHj9Zl_MWFmn9UQ_N8DTMHenOpGsUi2Zo",
    authDomain: "prova-react-ab051.firebaseapp.com",
    projectId: "prova-react-ab051",
    storageBucket: "prova-react-ab051.appspot.com",
    messagingSenderId: "632762941915",
    appId: "1:632762941915:web:d37ef5ace1ebb9954827fe"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
export {db}
  
export const auth = getAuth()