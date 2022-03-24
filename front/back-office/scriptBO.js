let titre = document.querySelector('.titre')
let article = document.querySelector('.article')


//////// POST /////////

document.querySelector(".sub").addEventListener("click", () =>{

let uid = false
if(localStorage.getItem("UserID")){
    uid = localStorage.getItem("UserID")
}

    const newArticle = {"titre": titre.value, "article": article.value, "uid":uid}

    fetch("http://localhost:3000/blog/articles",
    {   method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(newArticle)
    })
    .then(function(res){ 
        return res.json() })
    .then(function(res){localStorage.setItem("UserID", res.uid)} )
    .catch(function(res){ console.log(res) })

  titre.value=""
  article.value=""
})



