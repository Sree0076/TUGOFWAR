document.addEventListener('DOMContentLoaded', async () => {
    let player1Name: string | null = localStorage.getItem('player1-name');
    let player2Name: string | null = localStorage.getItem('player2-name');
    let score1: string | null = localStorage.getItem('score1');
    let score2: string | null = localStorage.getItem('score2');
    let name: string = '';
    let highScore: number = 0;
    let opponent: string = '';
  
    if (score1 && score2 && player1Name && player2Name) {
      const score1Num: number = parseInt(score1);
      const score2Num: number = parseInt(score2);
  
      if (score1Num > score2Num) {
        name = player1Name;
        highScore = score1Num;
        opponent = player2Name!;
      } else {
        name = player2Name;
        highScore = score2Num;
        opponent = player1Name!;
      }
    }
  
    console.log('Player Name:', name);
  
    if (name) {
      try {
        const playerNameElement: HTMLElement | null = document.getElementById('player-name');
        const playerHighscoreElement: HTMLElement | null = document.getElementById('player-highscore');
        const opponentElement: HTMLElement | null = document.getElementById('opponent');
  
        if (playerNameElement && playerHighscoreElement && opponentElement) {
          playerNameElement.innerHTML = name;
          playerHighscoreElement.innerHTML = String(highScore);
          opponentElement.innerHTML = opponent;
        } else {
          console.error('Error: One or more elements not found');
        }
      } catch (error) {
        console.error('Error fetching player profile:', error);
      }
    } else {
      console.error('Player name not found in localStorage');
    }
  });


  