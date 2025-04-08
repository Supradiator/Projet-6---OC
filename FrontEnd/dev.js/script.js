
//importation des fonctions 
import { afficherProjets, afficherBoutons, filtrerProjets, btnSelectionne, afficherInterfaceDeconnectee, afficherInterfaceConnectee } from "./fonction.js"
import { fetchProjets } from "./api.js"

//recup des donnes de l'api et affichage des projets

let projets = await fetchProjets()
afficherProjets(projets)
afficherBoutons(projets)

// verifier la validité du token, si ok : afficher la page en mode edition, sinon : afficher page normale
console.log("preload")

const token = localStorage.getItem("token")
console.log("token", token)
if (token) {
    afficherInterfaceConnectee()
} else {
    afficherInterfaceDeconnectee()
}
