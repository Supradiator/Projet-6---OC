
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

//filtres

function filtrerProjets(idFiltres, projets) {
    let projetsFiltres

    if (idFiltres === 0) {
        projetsFiltres = projets
    } else {
        projetsFiltres = projets.filter(projets => projets.categoryId === idFiltres)
    }
    document.querySelector(".gallery").innerHTML = ""
    afficherProjets(projetsFiltres)
}

//changer le bouton selectionne

function btnSelectionne(idFiltres, boutonsFiltres) {
    for (let i = 0; i < boutonsFiltres.length; i++) {
        boutonsFiltres[i].classList.remove("btnSelectionne")
    }
    boutonsFiltres[idFiltres].classList.add("btnSelectionne")
}

export {afficherProjets, filtrerProjets, btnSelectionne}