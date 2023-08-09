// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import firebase from "firebase/compat/app";
import * as firebaseApp from "firebase/app";
import * as firebaseAnal from "firebase/analytics";
import * as firebaseAuth from "firebase/auth";
import * as firebaseFiretore from "firebase/firestore";

// Allow both require and import to be used in the same file
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// const firebaseApp = require("firebase/app");
// const firebaseAnal = require("firebase/analytics");
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');
const crypto = require("crypto");
const bodyParser = require("body-parser");

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
const _firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth(_firebaseApp);
const firestore = firebaseFiretore.getFirestore(_firebaseApp);
// const _firebaseAnal = firebaseAnal.getAnalytics(_firebaseApp);

const accountVersionId = 0.1;


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
// expressApp.use(express.json());

expressApp.use(bodyParser.urlencoded({
    extended: true
}));

var pagesRoot = "public";
// var root = __dirname;
var root = url.fileURLToPath(new URL('.', import.meta.url));

function getPublicFile(filename) {
    return root + "/" + pagesRoot + "/" + filename;
}

// -- DATABASE --

let deviations = 0;

function generateId() {
    deviations++;
    if (deviations == 68419) {
        deviations = 0;
    }
    let time = `${new Date().toString()} ${deviations} i love oily black men <3 我爱油腻腻的黑人`;
    let hash = crypto.createHash("md5").update(time).digest("hex").substring(0, 10);
    return hash;
}

async function generateNonCollidedId() {
    let newId = generateId();
    while ((await firebaseFiretore.getDoc(firebaseFiretore.doc(firestore, "users", newId))).exists) {
        newId = generateId();
    }
    return newId;
}

async function createAccount(email, username, password, gender, birthday) {
    try {
        // console.log(`Email: ${email}; Password: ${password}`);
        let user = (await firebaseAuth.createUserWithEmailAndPassword(auth, email, password)).user;

        console.log("Account created!");

        firebaseFiretore.setDoc(firebaseFiretore.doc(firestore, "users", user.uid), {
            "accountVersionId": accountVersionId,

            // ----------------------------

            "username": username,
            "handle": username,
            "avatar": "",
            "banner": "",
            "gender": gender,
            "bio": "Hello there.",
            "joined": new Date().getTime(),
            "status": 0,
            "statusText": "",
            "birthday": birthday,

            // ----------------------------

            "friends": [],
            "blocked": [],
            "conversations": [],
            "servers": [],
        });
        console.log("Account data created!");

        return {
            "message": "Success!",
            "success": true,
        };
    }
    catch (error) {
        console.log(error.message);

        let errorCode = error.code;
        let errorMessage = "Unknown error!";

        if (errorCode == "auth/email-already-in-use") {
            errorMessage = "Email already in use! Try another email.";
        }
        else if (errorCode == "auth/invalid-email") {
            errorMessage = "This email doesn't exist.";
        }
        else if (errorCode == "auth/weak-password") {
            errorMessage = "Your password sucks.";
        }
        else if (errorCode == "auth/operation-not-allowed") {
            errorMessage = "Ok seriously how the fuck did you even get this error message, like I'm honestly amazed this is even possible.";
        }

        return {
            "message": errorMessage,
            "success": false,
        };
    }
}

async function authenticate(email, password) {
    try {
        let user = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
        await firebaseAuth.signOut(auth);
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
}

function newServer(name, icon, email, password) {
    
}

// -- ROUTING --

expressApp.get("/", (req, res) => {
    res.sendFile(getPublicFile("index.html"));
});

expressApp.get("/testingplace", (req, res) => {
    res.sendFile(getPublicFile("testing.html"));
});

expressApp.get("/login", (req, res) => {
    res.sendFile(getPublicFile("login.html"));
});
expressApp.get("/register", (req, res) => {
    res.sendFile(getPublicFile("register.html"));
});

// Grant access to public files
expressApp.use(express.static("public"));

// -- FUNCTIONS --

expressApp.post("/signin", async function (req, res) {
    // console.log(req.body)
    let accountExists = await authenticate(req.body.email, req.body.password);

    if (accountExists) {
        res.json({"message": "", "success": true});
    }
    else {
        res.json({"message": "Account invalid.", "success": false});
    }
});

expressApp.post("/signup", async function (req, res) {
    console.log(req.body);
    let message = await createAccount(req.body.email, req.body.username, req.body.password, req.body.gender, req.body.birthday);
    res.json(message);
});

// expressApp.post("/")


// -- 404 PAGE --
expressApp.use("*", (req, res) => {
    res.sendFile(getPublicFile("404.html"));
})

expressApp.listen(port);