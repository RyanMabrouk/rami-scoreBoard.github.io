// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    let players = [];
  
    if (localStorage.getItem("players")) {
      players = JSON.parse(localStorage.getItem("players"));
      renderScore(players);
    }
  
    // Add event listener to Add Player button
    document.getElementById("addPlayerBtn").addEventListener("click", function () {
      let player = {
        name: "",
        score: 0
      };
      player.name = document.getElementById("playerName").value;
      player.score = parseInt(document.getElementById("playerScore").value);
      if(player.name && player.score){
        players.push(player);
        renderScore(players);
      }
      
  
      // Reset input values
      document.getElementById("playerName").value = "";
      document.getElementById("playerScore").value = "";
  

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
        location.reload();
    });
    function addNewScore(players){
        for (let i = 0; i < players.length; i++) {
            if(parseInt(document.getElementById("score"+i.toString()).value)){
            players[i].score += parseInt(document.getElementById("score"+i.toString()).value)
            }
        }
        return players;
    }
    function renderScore(players) {
      let newTable = "";
      for (let i = 0; i < players.length; i++) {
        newTable += `
        <tr>
            <td>${players[i].name}</td>
            <td>${players[i].score}</td>
            <td>
                <input type="number" id="score${i}" required>
            </td>
        </tr>`;
        }
        document.getElementById("scoreboardBody").innerHTML = newTable;
      // Save to local storage
      localStorage.clear()
      localStorage.setItem("players", JSON.stringify(players));     
    }
  });
  