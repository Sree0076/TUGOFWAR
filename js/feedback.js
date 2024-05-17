import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, get,child, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

var app = initializeApp(firebaseConfig)
var auth = getAuth(app);

document.getElementById("add").addEventListener('click',function (event) {
    event.preventDefault();
     console.log("fedddata")
    var favoriteMoment = document.getElementById("favoriteMoment").value;
    var aboutGame = document.getElementById("aboutGame").value;
    var comeback = document.querySelector('input[name="comeback"]:checked').value;
    var recommend = document.querySelector('input[name="thumbs"]:checked').value;
    
    // var feedbackData = {
    //     "Favorite_Moment": favoriteMoment,
    //     "About_Game": aboutGame,
    //     "Comeback": comeback,
    //     "Recommend": recommend
    // };

    addFeedback(favoriteMoment,aboutGame,comeback,recommend)

    alert("Thank you for your feedback!");

});
 

// function displayFeedback() {

//     console.log("feed")
//     var displayDiv = document.getElementById("displayFeedback");
//     displayDiv.innerHTML = ""; // Clear previous feedback
//     document.getElementById("container").style.display = "none";
//     // Retrieve feedback data from local storage
//     var feedbackData = localStorage.getItem("email");

//     // Check if feedbackData is not null and is an array
    
//             // Create a div to display each feedback
//             var feedbackDiv = document.createElement("div");
//             feedbackDiv.classList.add("feedbackItem");

//         feedbackDiv.innerHTML = "<h4>Email: " + feedbackData.email + "</h4>";
//         feedbackDiv.innerHTML += "<p>Favorite Moment: " + feedbackData["Favorite Moment"] + "</p>";
//         feedbackDiv.innerHTML += "<p>About Game: " + feedbackData["About Game"] + "</p>";
//         feedbackDiv.innerHTML += "<p>Comeback: " + feedbackData["Comeback"] + "</p>";
//         feedbackDiv.innerHTML += "<p>Recommend: " + feedbackData["Recommend"] + "</p>";

//             // Append the feedback div to the display div
//         displayDiv.appendChild(feedbackDiv);

      
//     }



function addFeedback(Favorite_Moment,About_Game,Comeback,Recommend ) {

        const database = getDatabase();
        console.log("feed")
     
        set(ref(database,'Feedback/'+(localStorage.getItem('email').split('@')[0])), {
            favoriteMoment:Favorite_Moment,
            aboutGame: About_Game,
            comeback:Comeback,
            recommend: Recommend,
        }).then(() => {   
            //Hide Alert Message After Seven Seconds(6)
            setTimeout(function () {
                document.querySelector('.alert').style.display = 'none';
            }, 7000);
            document.getElementById('registrationform').reset();
        }).catch((error) => {
           
        })
    }

document.getElementById("displayFeedbackButton").addEventListener('click',function (event) {
        event.preventDefault();
        fetchFeedback();
        document.getElementById('displayFeedback').style.display="block";
        document.getElementById('feedbackForm').style.display="none";
});

document.getElementById("feedbackFormButton").addEventListener('click',function (event) {
    document.getElementById('displayFeedback').style.display="none";
    document.getElementById('feedbackForm').style.display="block";
});
    async function fetchFeedback() {
    try {
        console.log("getfeed")
        const db = getDatabase();
        const dbRef = ref(db);
        
        const snapshot = await get(child(dbRef, 'Feedback/'));
        
        if (snapshot.exists()) {
            console.log(typeof(snapshot.val()));
            const feedbackData=snapshot.val();
            displayFirebaseFeedback(feedbackData)
            const myArray = Object.values(snapshot.val());
             
            console.log(myArray)
          
        } else {
            console.log("No data available for", ('Players/'));
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
   
}

function displayFirebaseFeedback(feedbackData) {
    const feedbackContainer = document.getElementById("displayFeedback");
    feedbackContainer.innerHTML = ""; 


    if (typeof feedbackData === 'object' && feedbackData !== null) {
        Object.entries(feedbackData).forEach(([key, value]) => {
            let data=value;

            const table = document.createElement("table");
            
            const feedbackItem = document.createElement("tr");
            feedbackItem.innerHTML = `<td>User Name</td><td> ${key}</td>`;
            table.appendChild(feedbackItem);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {  
                 
                  const feedbackItem = document.createElement("tr");
                  feedbackItem.innerHTML=`<td>${key}</td><td> ${data[key]}</td>`;
                  table.appendChild(feedbackItem);
                }
            }
            feedbackContainer.appendChild(table);
                console.log(key)
            console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
        });
    }
}
