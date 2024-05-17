import { initializeApp } from "@firebase/app";
import { getAuth, signOut} from "firebase/auth";

// Firebase configuration object type
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Initialize Firebase
const firebaseConfig: FirebaseConfig = {
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
const app=initializeApp(firebaseConfig)
const auth = getAuth(app);

function signOutUser(): void {
  signOut(auth).then(() => {
    console.log('User signed out.');
    localStorage.clear();
    // Optionally, redirect the user to another page
    window.location.href = 'login.html';
  }).catch((error) => {
    console.error('Sign Out Error', error);
  });
}function playBackgroundMusic(): void {
  const audio = document.getElementById('backgroundSound') as HTMLAudioElement;
  audio.play();
}

document.addEventListener('click', function() {
  playBackgroundMusic();
});

function openVolumeModal(): void {
  const modal = document.getElementById('volume-modal') as HTMLElement;
  modal.style.display = 'block';
}

function closeVolumeModal(): void {
  const modal = document.getElementById('volume-modal') as HTMLElement;
  modal.style.display = 'none';
}

function increaseVolume(): void {
  const audio = document.getElementById('backgroundSound') as HTMLAudioElement;
  if (audio.volume < 1.0) {
      audio.volume = Math.min(1.0, audio.volume + 0.1); // Ensure volume does not exceed 1.0
  }
  updateVolumeBar();
}

function decreaseVolume(): void {
  const audio = document.getElementById('backgroundSound') as HTMLAudioElement;
  if (audio.volume > 0.0) {
      audio.volume = Math.max(0.0, audio.volume - 0.1); // Ensure volume does not go below 0.0
  }
  updateVolumeBar();
}

function updateVolumeBar(): void {
  const audio = document.getElementById('backgroundSound') as HTMLAudioElement;
  const volumeLevel = audio.volume * 100; // Convert volume to percentage
  const volumeBar = document.getElementById('volume-bar') as HTMLElement;
  volumeBar.style.width = `${volumeLevel}%`;
}

document.addEventListener('DOMContentLoaded', function() {
  const volumeControl = document.getElementById('volume-control') as HTMLElement;
  volumeControl.addEventListener('click', function(event: MouseEvent) {
      event.preventDefault(); 
      openVolumeModal();
  });

  const closeButton = document.getElementsByClassName('close')[0] as HTMLElement;
  closeButton.addEventListener('click', closeVolumeModal);

  const increaseVolumeButton = document.getElementById('increase-volume') as HTMLElement;
  increaseVolumeButton.addEventListener('click', increaseVolume);

  const decreaseVolumeButton = document.getElementById('decrease-volume') as HTMLElement;
  decreaseVolumeButton.addEventListener('click', decreaseVolume);

  const quitGameButton = document.getElementById('quitgame') as HTMLElement;
  quitGameButton.addEventListener('click', function() {
      const quitModal = document.getElementById('quitModal') as HTMLElement;
      quitModal.style.display = 'block';
  });

  const yesButton = document.getElementById('yesButton') as HTMLElement;
  yesButton.addEventListener('click', function() {
      window.location.href = 'login.html';
  });

  const noButton = document.getElementById('noButton') as HTMLElement;
  noButton.addEventListener('click', function() {
      const quitModal = document.getElementById('quitModal') as HTMLElement;
      quitModal.style.display = 'none';
  });
});

function closeModal(): void {
  const modal = document.getElementById('quitgame') as HTMLElement;
  modal.style.display = 'none';
}

window.addEventListener('click', function(event: MouseEvent) {
  const modal = document.getElementById('quitModal') as HTMLElement;
  if (event.target === modal) {
      modal.style.display = 'none';
  }
});

function getdata(): void {
  const player1Input = (document.getElementById('player1') as HTMLInputElement).value;
  const player2Input = (document.querySelector('.player2-name input') as HTMLInputElement).value;
  const logoImage = document.querySelector('.logo') as HTMLElement;

  localStorage.setItem('player1-name', player1Input);
  localStorage.setItem('player2-name', player2Input);

  function arePlayerNamesStored(): boolean {
      const player1Name = localStorage.getItem('player1-name');
      const player2Name = localStorage.getItem('player2-name');
      return !!player1Name && !!player2Name;
  }

  function checkAndEnableLogo(): void {
      if (arePlayerNamesStored()) {
          logoImage.classList.add('hover-effect');
          logoImage.addEventListener('click', handleLogoClick);
      }
  }

  function handleLogoClick(): void {
      // Handle logo click action here
      console.log('Logo clicked!');
  }

  checkAndEnableLogo();
}
