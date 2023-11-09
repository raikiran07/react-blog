import React from 'react'
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

const API = import.meta.env.VITE_API_KEY 
console.log(API)

  
  // Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC2eMG8ocGskbYtAVK4mX_vtqH4aEibZo8",

  authDomain: "blogjs-52bed.firebaseapp.com",

  projectId: "blogjs-52bed",

  storageBucket: "blogjs-52bed.appspot.com",

  messagingSenderId: "141935596276",

  appId: "1:141935596276:web:f4316bd12366ec6d0044a1",

  measurementId: "G-WS54R9PRB7",

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

 
export const db = getFirestore(app)