urlg = "http://localhost:3006/products";
function getprice() {
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
                                <td class = "bold">Title</td>
                                <td class = "bold">price</td>
                                <td>Operation</td>
                            </tr>`;
      data.forEach((element) => {

        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const delbtn = document.createElement("button");
        const editbtn = document.createElement("button");
        td1.innerHTML = element.title;
        td2.innerHTML = element.price;
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
          getprice();
        }); 
        editbtn.addEventListener("click", () => {
          const div = document.createElement("div");
          div.className = "add"
          const title = document.createElement("input");
          const price = document.createElement("input");
          const btn = document.createElement("button");
          title.value = element.title;
          price.value = element.price;
          btn.innerHTML = "Update";
          div.appendChild(title);
          div.appendChild(price); 
          div.appendChild(btn);
          document.getElementById("inputf").appendChild(div);
          btn.addEventListener("click", () => {
            fetch(urlg + "/" + element._id, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({ title: title.value, price: price.value }),
              success: function(){
                alert("Data Updated Sucessfully")
              }
      
            });
            getprice();
            div.remove();
          });
        });
        sc.appendChild(tr);
      });
    });
}

document.getElementById("post").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;

  fetch(urlg, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ title: title, price: price }),
    success: function (data) {
      alert("Record Entered Sucessfully")
    },
    error: function (error) {
      alert(error)
    },
  });
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  getprice();
});
getprice();