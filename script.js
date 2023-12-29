urlg = "https://mongo-api-assignment-st35.vercel.app/players";
function getScores() {
  fetch(urlg, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const sc = document.getElementById("table");
      sc.innerHTML = `<tr>
                                <td class = "bold">Name</td>
                                <td class = "bold">Score</td>
                                <td>Operation</td>
                            </tr>`;
      data.forEach((element) => {

        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const delbtn = document.createElement("button");
        const editbtn = document.createElement("button");
        td1.innerHTML = element.Name;
        td2.innerHTML = element.scores;
        tr.elementId = element._id;
        tr.appendChild(td1);
        tr.appendChild(td2);
        editbtn.className = "edit";
        delbtn.innerHTML = "Delete";
        editbtn.innerHTML = "Edit";
        td3.appendChild(delbtn);
        td3.appendChild(editbtn);
        tr.appendChild(td3);
        delbtn.addEventListener("click", () => {
          fetch(urlg + "/" + element._id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
          getScores();
        }); 
        editbtn.addEventListener("click", () => {
          const div = document.createElement("div");
          div.className = "add"
          const name = document.createElement("input");
          const score = document.createElement("input");
          const btn = document.createElement("button");
          name.value = element.Name;
          score.value = element.scores;
          btn.innerHTML = "Update";
          div.appendChild(name);
          div.appendChild(score); 
          div.appendChild(btn);
          document.getElementById("inputf").appendChild(div);
          btn.addEventListener("click", () => {
            fetch(urlg + "/" + element._id, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({ Name: name.value, scores: score.value }),
              success: function(){
                alert("Data Updated Sucessfully")
              }
      
            });
            getScores();
            div.remove();
          });
        });
        sc.appendChild(tr);
      });
    });
}

document.getElementById("post").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const score = document.getElementById("score").value;

  fetch(urlg, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ Name: name, scores: score }),
    success: function (data) {
      alert("Record Entered Sucessfully")
    },
    error: function (error) {
      alert(error)
    },
  });
  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
  getScores();
});
getScores();