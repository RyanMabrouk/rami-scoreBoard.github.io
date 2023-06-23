// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  let players = [];
  // Fetch old players
  if (localStorage.getItem("players")) {
    players = JSON.parse(localStorage.getItem("players"));
    // Sort by score
    players.sort(function(a, b) {
      return b.score - a.score;
    });
    renderScore(players);
  }
  for (let i = 0; i < players.length; i++) {
    document.getElementById("player"+i).addEventListener("dblclick", function () {
      players.splice(i, 1);
      renderScore(players);
      // Save to local storage
      localStorage.setItem("players", JSON.stringify(players));
      location.reload();
    });
  }
  
  // Add Player button
  document.getElementById("addPlayerBtn").addEventListener("click", function () {
    let player = {
      name: "",
      score: 0
    };
    player.name = document.getElementById("playerName").value;
    player.score = parseInt(document.getElementById("playerScore").value);
    if(player.name){
      players.push(player);
      renderScore(players);
    }
    // Reset input values
    document.getElementById("playerName").value = "";
    document.getElementById("playerScore").value = "";
    // Save to local storage
    localStorage.setItem("players", JSON.stringify(players));     
  });
  //Refresh Score
  document.getElementById("refresh").addEventListener("click", function () {
    location.reload();
  });
  //Clear Score
  document.getElementById("clear").addEventListener("dblclick", function () {
      localStorage.clear()
      location.reload();
  });
  //Update Score
  document.getElementById("newRound").addEventListener("click", function () {
      players = addNewScore(players)
      renderScore(players) 
      localStorage.setItem("players", JSON.stringify(players));
      location.reload();
  });   
  // Save to local storage
  localStorage.setItem("players", JSON.stringify(players));
});
 //Add the new score
 function addNewScore(players){
  for (let i = 0; i < players.length; i++) {
      if(parseInt(document.getElementById("score"+i).value)){
        players[i].score += parseInt(document.getElementById("score"+i.toString()).value)
      }
      
  }
  return players;
}
//Refresh the page
function renderScore(players) {
  let newTable = "";
  for (let i = 0; i < players.length; i++) {
    newTable += `
    <tr>
        <td>
          <button type="button" id="player${i}">Delete</button>
        </td>
        <td>${players[i].name}</td>
        <td>${players[i].score}</td>
        <td>
            <input type="number" id="score${i}" required>
        </td>
    </tr>`;
    }
    document.getElementById("scoreboardBody").innerHTML = newTable;
  }




  