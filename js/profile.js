var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    var player1Name, player2Name, score1, score2, name, highScore, opponent, score1Num, score2Num, playerNameElement, playerHighscoreElement, opponentElement;
    return __generator(this, function (_a) {
        player1Name = localStorage.getItem('player1-name');
        player2Name = localStorage.getItem('player2-name');
        score1 = localStorage.getItem('score1');
        score2 = localStorage.getItem('score2');
        console.log(score1)
        name = '';
        highScore = 0;
        opponent = '';
        if (score1 && score2 && player1Name && player2Name) {
            score1Num = parseInt(score1);
            score2Num = parseInt(score2);
            if (score1Num > score2Num) {
                name = player1Name;
                highScore = score1Num;
                opponent = player2Name;
            }
            else {
                name = player2Name;
                highScore = score2Num;
                opponent = player1Name;
            }
            if( localStorage.getItem('highScore')<highScore)
                {
                   console.log("profilescore")
                  localStorage.setItem('highScore',highScore);
                }
        }
        
        console.log('Player Name:', name);
        if (name) {
            try {
                playerNameElement = document.getElementById('player-name');
                playerHighscoreElement = document.getElementById('player-highscore');
                opponentElement = document.getElementById('opponent');
                if (playerNameElement && playerHighscoreElement && opponentElement) {
                    playerNameElement.innerHTML = name;
                    playerHighscoreElement.innerHTML = String( localStorage.getItem('highScore'));
                    opponentElement.innerHTML = opponent;
                }
                else {
                    console.error('Error: One or more elements not found');
                }
            }
            catch (error) {
                console.error('Error fetching player profile:', error);
            }
        }
        else {
            console.error('Player name not found in localStorage');
        }
        return [2 /*return*/];
    });

 
    

}); });

function displayDataFromLocalStorage() {
    // Retrieve data from local storage
    var userData = JSON.parse(localStorage.getItem('userData'));
  
    // Check if data exists in local storage
    if (userData && userData.length > 0) {
      // Generate table rows from the data
      var tableRows = '';
      userData.forEach(function(row) {
        tableRows += '<tr>';

        tableRows += '<td>' + (row.id).split('@')[0] + '</td>';
        tableRows += '<td>' + row.highScore + '</td>';
        tableRows += '</tr>';
      });
  
      // Insert the table rows into the table body
      document.getElementById('userData').innerHTML = tableRows;
    } else {
      console.log('No data found in local storage');
    }
  }
  window.onload = displayDataFromLocalStorage;