let data =[]

async function blog (url){
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);
    display(data)
                
  }
  blog (`http://localhost:3000/blog`)

  function display(data){
        
    
for(art of data)

  document.querySelector("main").innerHTML += 
  `<div class="vignette" data-id="${art._id}" data-uid="${art.uid}">
    <p class="id">untel</p>
    <div class="titre" contenteditable="true"><h2>${art.titre}</h2></div>
    <div class="article" contenteditable="true">${art.article}</div>
    <p class="date">date</p>
    <button class="sup">suprimer</button>
    <button class="edit">editer</button>
  </div>` 

}

document.querySelector('main').addEventListener('click', (e)=>{

if(e.target.className === "sup"){
  fetch(`http://localhost:3000/blog/${e.target.parentNode.dataset.id}`,{
      method:'DELETE'
  }).then(response=>{
      return response.json()
  })
  } else if (e.target.className === "edit"){

    let uid = false
    if(localStorage.getItem("UserID")){
        uid = localStorage.getItem("UserID")
    }

  const newArticle = {"titre": e.target.parentNode.childNodes[3].textContent, 
                      "article": e.target.parentNode.childNodes[5].textContent,
                      "uid":uid
                    }

  fetch(`http://localhost:3000/blog/${e.target.parentNode.dataset.id}`,
    {   method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(newArticle)
    })
    .then(function(res){ 
        return res.json() })
    .then(function(res){localStorage.setItem("UserID", res.uid)})
    .catch(function(res){ console.log(res) })
}
})
