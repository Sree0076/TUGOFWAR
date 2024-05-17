
import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
const app=initializeApp(firebaseConfig)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById('google')?.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("get");
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result!);
            const token = credential?.accessToken;
            window.location.href = "landinpage.html";
            const user = result?.user;
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
});

document.getElementById('email-signup')?.addEventListener('click', function (event) {
    event.preventDefault();
    const email = (document.getElementById('signup-email') as HTMLInputElement).value;
    const password = (document.getElementById('signup-password') as HTMLInputElement).value;
    console.log(email);
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

document.getElementById('login')?.addEventListener('click', function (event) {
    event.preventDefault();
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = "landinpage.html";
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});

function preventBack() {
    window.history.forward();
}

setTimeout(preventBack, 0);

window.onunload = function () { return null; };