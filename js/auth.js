"use strict";
var _a, _b, _c;
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase ,ref,get, set,child} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

var firebaseConfig = {
    apiKey: "AIzaSyCELM-00gCgQzG2upcmCER-N971eQYv3fQ",
    authDomain: "game-50b12.firebaseapp.com",
    databaseURL: "https://game-50b12-default-rtdb.firebaseio.com",
    projectId: "game-50b12",
    storageBucket: "game-50b12.appspot.com",
    messagingSenderId: "923902245237",
    appId: "1:923902245237:web:7409954b2f303772c67b3c",
    measurementId: "G-S6H42D5PQW"
};
var app = (0, initializeApp)(firebaseConfig);
var auth = (0, getAuth)(app);
var provider = new GoogleAuthProvider();
(_a = document.getElementById('google')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("get");
    (0, signInWithPopup)(auth, provider)
        .then(function (result) {
        
        var credential = GoogleAuthProvider.credentialFromResult(result);
        localStorage.setItem('email', result.user?.email);
        // window.location.href = "landinpage.html";
        var token = credential === null || credential === void 0 ? void 0 : credential.accessToken;
       
        
        var user = result === null || result === void 0 ? void 0 : result.user;
        fetchData(result.user?.email);
        
        
    }).catch(function (error) {
        var _a;
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = (_a = error.customData) === null || _a === void 0 ? void 0 : _a.email;
        var credential = GoogleAuthProvider.credentialFromError(error);
    });
});
(_b = document.getElementById('email-signup')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function (event) {
    event.preventDefault();
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;
    console.log(email);
    (0, createUserWithEmailAndPassword)(auth, email, password)
        .then(function (userCredential) {
        var user = userCredential.user;
    })
        .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
});
(_c = document.getElementById('login')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function (event) {
    event.preventDefault();
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    (0, signInWithEmailAndPassword)(auth, email, password)
        .then(function (userCredential) {
        localStorage.setItem('email', email);
        var user = userCredential.user;
        fetchData(email);
        window.location.href = "landinpage.html";
        console.log(user);
    })
        .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
});




async function fetchData(email) {
    try {
        const db = getDatabase();
        const dbRef = ref(db);
        
        const snapshot = await get(child(dbRef, 'Palyers/'+email.split('@')[0]));
        
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const myArray = Object.values(snapshot.val());
             
             localStorage.setItem('player1-name',myArray[2])
             localStorage.setItem('player2-name',myArray[3])
             localStorage.setItem('score1',myArray[4])
             localStorage.setItem('score2',myArray[5])
             localStorage.setItem('highScore',myArray[0])
          
        } else {
            console.log("No data available for", ('Players/'));
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    fetchScore();
    
}
async function fetchScore() {
    try {
         console.log("score")
        const db = getDatabase();
        const dbRef = ref(db);
        
        const snapshot = await get(child(dbRef, 'Palyers/'));
        
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const myArray = Object.values(snapshot.val());
            localStorage.setItem('userData', JSON.stringify(myArray));
            console.log(myArray)
          
        } else {
            console.log("No data available for", ('Players/'));
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
     window.location.href = "landinpage.html";
}
function preventBack() { 
    window.history.forward();  
} 
setTimeout("preventBack()", 0); 
window.onunload = function () { null }; 
