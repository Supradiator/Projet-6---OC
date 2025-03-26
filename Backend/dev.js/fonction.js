
//afficher les projets
function afficherProjets(projets) {

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

export {afficherProjets}