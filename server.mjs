// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import 'firebase/firestore';

// Allow both require and import to be used in the same file
import { createRequire } from "module";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const require = createRequire(import.meta.url);

// const firebaseApp = require("firebase/app");
// const firebaseAnal = require("firebase/analytics");
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');
const async = require("async");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKNQF-XomngqDadWvppboGoDvid3Yob4Q",
    authDomain: "peeisstoredintheballs3.firebaseapp.com",
    projectId: "peeisstoredintheballs3",
    storageBucket: "peeisstoredintheballs3.appspot.com",
    messagingSenderId: "625981462803",
    appId: "1:625981462803:web:7ec01d339e9fe84cb262e6",
    measurementId: "G-QHYLP96DJ8"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// const firebaseAnal = firebaseAnalP.getAnalytics(firebaseApp);


// =================================================

// -- HOSTING STEPS --
//
// node server.js
// or
// node --experimental-modules server.js

const port = 6969;
console.log("server.js succesfully started");

// -- FIREBASE HOSTING STEPS --
//
// firebase login
// firebase init
// firebase deploy


const expressApp = express();
expressApp.use(express.json());

var pagesRoot = "public";
// var root = __dirname;
var root = url.fileURLToPath(new URL('.', import.meta.url));

function getPublicFile(filename) {
    return root + "/" + pagesRoot + "/" + filename;
}

// -- DATABASE --

async function createAccount(email, username, password) {
    try {
        let user = await createUserWithEmailAndPassword(auth, email, password);
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
}

async function authenticate(email, password) {
    try {
        let user = await signInWithEmailAndPassword(auth, email, password);
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
}

function newServer(name, icon, email, password) {
    //
}

// -- ROUTING --

// expressApp.get(
//     "/style.css", 
//     (req, res) => { res.sendFile(GetPublicFile("style.css")); });
// expressApp.get(
//     "/sitecomponents.js", 
//     (req, res) => { res.sendFile(GetPublicFile("sitecomponents.js")); });

expressApp.get("/", (req, res) => {
    res.sendFile(getPublicFile("index.html"));
});

expressApp.get("/testingplace", (req, res) => {
    res.sendFile(getPublicFile("testing.html"));
});

// Grand access to public files
expressApp.use(express.static("public"));


// -- 404 PAGE --
expressApp.use("*", (req, res) => {
    res.sendFile(getPublicFile("404.html"));
})

expressApp.listen(port);