"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// Initialize Firebase
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
// Initialize Firebase
var app = initializeApp(firebaseConfig)
var auth = getAuth(app);

function signOutUser() {
    auth.signOut().then(() => {
      console.log('User signed out.');
      localStorage.clear();
      // Optionally, redirect the user to another page
      window.location.href = 'login.html';
    }).catch((error) => {
      console.error('Sign Out Error', error);
    });
  }
var startGame = function () {
    console.log("Game started!");
    var start = document.getElementById('play');
    if (start) {
        start.click();
    }
};
function playBackgroundMusic() {
    var audio = document.getElementById('backgroundSound');
    audio.play();
}
document.addEventListener('click', function () {
    playBackgroundMusic();
});
function openVolumeModal() {
    var modal = document.getElementById('volume-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}
function closeVolumeModal() {
    var modal = document.getElementById('volume-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
function increaseVolume() {
    var audio = document.getElementById('backgroundSound');
    if (audio.volume < 1.0) {
        audio.volume += 0.1; // Increase volume by 0.1 (10%)
        updateVolumeBar();
    }
}
function decreaseVolume() {
    var audio = document.getElementById('backgroundSound');
    if (audio.volume > 0.0) {
        audio.volume -= 0.1; // Decrease volume by 0.1 (10%)
        updateVolumeBar();
    }
}
function updateVolumeBar() {
    var audio = document.getElementById('backgroundSound');
    var volumeLevel = audio.volume * 100; // Convert volume to percentage
    var volumeBar = document.getElementById('volume-bar');
    if (volumeBar) {
        volumeBar.style.width = volumeLevel + '%';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d;
    (_a = document.getElementById('volume-control')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
        event.preventDefault();
        openVolumeModal();
    });
    (_b = document.getElementsByClassName('close')[0]) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        closeVolumeModal();
    });
    (_c = document.getElementById('increase-volume')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        increaseVolume();
    });
    (_d = document.getElementById('decrease-volume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        decreaseVolume();
    });
});
function closeModal() {
    var modal = document.getElementById('quitgame');
    if (modal) {
        modal.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c;
    (_a = document.getElementById('quitgame')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var quitModal = document.getElementById('quitModal');
        if (quitModal) {
            quitModal.style.display = 'block';
        }
    });
    (_b = document.getElementById('yesButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        
        console.log("quit")
        if(localStorage.getItem('score1')!==null)
            {
       addData(localStorage.getItem('email'),localStorage.getItem('player1-name'),localStorage.getItem('player2-name'),localStorage.getItem('score1'),localStorage.getItem('score2'));
            }
            else{
                signOutUser();
            }
    });
    (_c = document.getElementById('noButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        var quitModal = document.getElementById('quitModal');
        if (quitModal) {
            quitModal.style.display = 'none';
        }
    });
});



window.addEventListener('click', function (event) {
    var modal = document.getElementById('quitModal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('logoClick').addEventListener('click', function (event) {
    event.preventDefault();

    var player1Input = document.querySelector('.player1-name input').value;
    var player2Input = document.querySelector('.player2-name input').value;
    localStorage.setItem('player1-name', player1Input);
    localStorage.setItem('player2-name', player2Input);
    console.log(localStorage.getItem('feedback'));
    if(player1Input && player2Input )
        {
            window.location.href="/pages/level1.html"
        }

});

function addData(email,name1,name2,score_1,score_2 ) {

    const database = getDatabase();
    let highScore=0
    console.log("database")
    if (score_1 > score_2) {
        
     highScore = score_1;

    }
    else {
    
        highScore = score_2;
    }
    if( localStorage.getItem('highScore')<highScore)
        {

          localStorage.setItem('highScore',highScore);
        }
    set(ref(database,'Palyers/'+email.split('@')[0]), {
        id:email,
        player1Name: name1,
        player2Name:name2,
        score1: score_1,
        score2:score_2,
        highScore:highScore,
    }).then(() => {

        
        //Hide Alert Message After Seven Seconds(6)
        setTimeout(function () {
            document.querySelector('.alert').style.display = 'none';
        }, 7000);
        document.getElementById('registrationform').reset();
    }).catch((error) => {
        signOutUser();
    })
}

