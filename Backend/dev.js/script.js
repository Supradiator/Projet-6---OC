
//importation des fonctions 
import { afficherProjets, filtrerProjets, btnSelectionne } from "./fonction.js"
import { fetchProjets } from "./api.js"

//recup des donnes de l'api et affichage des projets

let projets = await fetchProjets()
afficherProjets(projets)

// recup du clic user pour filtrer les projets et gerer les boutons

const boutonsFiltres = document.querySelectorAll(".filtres button")
boutonsFiltres.forEach(boutons => {
    boutons.addEventListener("click", (event) => {
        let idFiltres = Number(event.target.id)
    
    btnSelectionne(idFiltres, boutonsFiltres)
    filtrerProjets(idFiltres, projets) 
    })
})

