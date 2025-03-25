
//recup des objets du "works"
const reponse = await fetch("http://localhost:5678/api/works")
const projets = await reponse.json()

//afficher les projets
async function afficherProjects() {

    let gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    for (let i = 0; i< projets.length; i++) {
        let article = document.createElement("article")
        let imgProjets = document.createElement("img")
        imgProjets.src = projets[i].imageUrl
        imgProjets.alt = projets[i].title
        let titreProjets = document.createElement("p")
        titreProjets.innerText = projets[i].title
        
        article.appendChild(imgProjets)
        article.appendChild(titreProjets)
        gallery.appendChild(article)
    }
}