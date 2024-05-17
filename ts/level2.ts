interface Question {
    question: string;
    answers: { [key: string]: string };
    correct_answers: { [key: string]: string };
  }
  
  function move_Right() {
    const shipImageJs = document.getElementById("shipImage") as HTMLElement;
  
    const currentLeft = parseFloat(shipImageJs.style.marginLeft) || 20;
  
    const newLeft = currentLeft + 5;
  
    if (newLeft < 40) {
      shipImageJs.style.marginLeft = newLeft + "%";
    } else {
      // localStorage.setItem('playerTwoScore', playerTwoScore);
      alert(
        "Player 2 has reached the edge and wins with score: " + playerTwoScore
      );
  
      location.reload();
    }
  }
  
  function move_Left() {
    const shipImageJs = document.getElementById("shipImage") as HTMLElement;
  
    const currentLeft = parseFloat(shipImageJs.style.marginLeft) || 20;
  
    const newLeft = currentLeft - 5;
  
    if (newLeft > 0) {
      shipImageJs.style.marginLeft = newLeft + "%";
    } else {
      localStorage.setItem("playerOneScore", playerOneScore.toString());
      alert(
        "Player 1 has reached the edge and wins with score: " + playerOneScore
      );
  
      location.reload();
    }
  }
  
  function playerOneColorChange() {
    const playerOne = document.getElementById("playerOne") as HTMLElement;
    const playerTwo = document.getElementById("playerTwo") as HTMLElement;
    playerOne.style.backgroundColor = "green";
    playerTwo.style.backgroundColor = "grey";
    playerOne.style.opacity = "0.9";
    playerTwo.style.opacity = "0.5";
  }
  
  function playerTwoColorChange() {
    const playerOne = document.getElementById("playerOne") as HTMLElement;
    const playerTwo = document.getElementById("playerTwo") as HTMLElement;
    playerOne.style.backgroundColor = "grey";
    playerTwo.style.backgroundColor = "green";
    playerTwo.style.opacity = "0.9";
    playerOne.style.opacity = "0.5";
  }
  
  document.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.key === "2") {
      move_Right();
      playerTwoColorChange();
    } else if (event.key === "1") {
      move_Left();
      playerOneColorChange();
    }
  });
  
  let playerChance = 1;
  let playerOneScore = 0;
  let playerTwoScore = 0;
  let time_Left = 20;
  let timerInterval: number;
  
  function winnerSelector() {
    localStorage.setItem('score1', (parseInt(localStorage.getItem('score1') || '0') + playerOneScore).toString());
    localStorage.setItem('score2', (parseInt(localStorage.getItem('score2') || '0') + playerTwoScore).toString());
    if (playerOneScore > playerTwoScore) {
      alert("Quiz over. Player 1 wins with a score: " + playerOneScore);
    } else if (playerOneScore < playerTwoScore) {
      alert("Quiz over. Player 2 wins with a score: " + playerTwoScore);
    } else {
      alert("Quiz over. It's a tie with score: " + playerOneScore);
    }
    location.reload();
  }
  
  async function fetchQuizQuestions(): Promise<Question[]> {
    const response = await fetch("../json/quiz.json");
    const questions: Question[] = await response.json();
    return questions;
  }
  
  async function renderQuiz() {
    const quizContainer = document.getElementById("quiz") as HTMLElement;
    const questions = await fetchQuizQuestions();
  
    let questionIndex = 0;
  
    renderQuestion();
  
    function renderQuestion() {
      quizContainer.innerHTML = ""; // Clear previous content
  
      const question = questions[questionIndex];
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
  
      const questionTitle = document.createElement("h2");
      questionTitle.textContent = `Q${questionIndex + 1}: ${question.question}`;
      questionElement.appendChild(questionTitle);
  
      const answersList = document.createElement("ul");
      answersList.classList.add("answers");
  
      for (const [key, value] of Object.entries(question.answers)) {
        if (value) {
          const answerItem = document.createElement("li");
          const answerButton = document.createElement("button");
          answerButton.textContent = value;
          answerButton.addEventListener("click", () => {
            checkAnswer(key);
          });
          answerItem.appendChild(answerButton);
          answersList.appendChild(answerItem);
        }
      }
  
      questionElement.appendChild(answersList);
      quizContainer.appendChild(questionElement);
  
      if (playerChance % 2 !== 0) {
        playerOneColorChange();
        playerChance++;
      } else {
        playerTwoColorChange();
        playerChance++;
      }
  
      clearInterval(timerInterval);
  
      timerInterval = window.setInterval(() => {
        time_Left--;
  
        updateTimerDisplay();
        if (time_Left <= 0) {
          questionIndex++;
  
          if (questionIndex < questions.length) {
            renderQuestion();
            time_Left = 20;
          } else {
            clearInterval(timerInterval);
            winnerSelector();
          }
        }
      }, 1000);
    }
  
    function updateTimerDisplay() {
      const time_LeftElement = document.getElementById("time_Left") as HTMLElement;
      time_LeftElement.textContent = time_Left.toString();
    }
  
    function checkAnswer(selectedAnswer: string) {
      const question = questions[questionIndex];
      const correctAnswerKey = Object.keys(question.correct_answers).find(
        (key) => question.correct_answers[key] === "true"
      );
  
      if (selectedAnswer + "_correct" === correctAnswerKey) {
        //because in the api documentation, the key is defined as answera_correct
  
        if ((playerChance - 1) % 2 !== 0) {
          playerOneScore++;
          move_Left();
          console.log("Player one score: " + playerOneScore);
        } else {
          playerTwoScore++;
          move_Right();
          console.log("Player two score: " + playerTwoScore);
        }
      }
  
      questionIndex++;
  
      if (questionIndex < questions.length) {
        renderQuestion();
        time_Left = 20;
      } else {
        clearInterval(timerInterval);
        winnerSelector();
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", renderQuiz);
  