import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBo099Snr-GX4z4pOeZ4mobAbNUBs2_4Z8",
    authDomain: "dating-app-b11fc.firebaseapp.com",
    databaseURL: "https://dating-app-b11fc.firebaseio.com",
    projectId: "dating-app-b11fc",
    storageBucket: "dating-app-b11fc.appspot.com",
    messagingSenderId: "251774585591",
    appId: "1:251774585591:web:872cd2e55b9b5eb90b61f2",
    measurementId: "G-GX9L6Q5SNY"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();