// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseAppP = require("firebase/app");
const firebaseAnalP = require("firebase/analytics");
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

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
const firebaseApp = firebaseAppP.initializeApp(firebaseConfig);
// const firebaseAnal = firebaseAnalP.getAnalytics(firebaseApp);


// =================================================

// -- HOSTING STEPS --
//
// node server.js

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
var root = path.dirname(require.main.filename);

function GetPublicFile(filename) {
    return root + "/" + pagesRoot + "/" + filename;
}

expressApp.get(
    "/style.css", 
    (req, res) => { res.sendFile(GetPublicFile("style.css")); });
expressApp.get(
    "/sitecomponents.js", 
    (req, res) => { res.sendFile(GetPublicFile("sitecomponents.js")); });

expressApp.get("/", (req, res) => {
    res.sendFile(GetPublicFile("index.html"));
});

expressApp.get("/testingplace", (req, res) => {
    res.sendFile(GetPublicFile("testing.html"));
});


// -- 404 PAGE --
expressApp.use("*", (req, res) => {
    res.sendFile(GetPublicFile("404.html"));
})

expressApp.listen(port);