let addToy = false;

const fetchAllToys = () => {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(jsonObjects => jsonObjects.forEach(jsonObject =>renderToy(jsonObject)));
};

const renderToy = (obj) => {
  const divToyCollection = document.querySelector("div#toy-collection")
  const divCard = document.createElement("div");
  divCard.className = "card"

  const h2 = document.createElement("h2")
  h2.innerText = obj.name;
  

  const image = document.createElement("img")
  image.className ="toy-avatar";
  image.src = obj.image;

  const p = document.createElement("p")
  p.innerText = `${obj.likes} likes`

  const likeButton = document.createElement("button")
  likeButton.textContent = "Like <3"
  likeButton.className = "like-btn";
  
  likeButton.addEventListener("click",(e) =>{
    incrementLikes(obj,e)
  })

  divCard.append(h2,image,p,likeButton)
  divToyCollection.append(divCard);
}


const toyForm = document.querySelector(".add-toy-form")
toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({
      name: toyForm.elements.name.value,
      image: toyForm.elements.image.value,
      likes: 0,
    })
  })
  .then(response => response.json())
  .then(data => {
    renderToy(data)
    toyForm.elements.name.value = "";
    toyForm.elements.image.value = "";
  })
  .catch(error => console.log(error.message))
})

const incrementLikes = (toy,e) =>{
    e.preventDefault();
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes + 1
      })
   })
    .then(response => response.json())
    .then(jsonObject => 
      e.target.previousElementSibling.innerText = `${jsonObject.likes} likes`)
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchAllToys();
});

