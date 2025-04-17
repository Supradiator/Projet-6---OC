
//importation des fonctions 
import { afficherProjets, afficherBoutons, afficherInterfaceDeconnectee, afficherInterfaceConnectee, afficherGalleryEdition, closeModaleX, closeModaleOverlay, choisirPhoto, CategoryOptions, gererValidationFormulaire } from "./fonction.js"
import { fetchProjets, fetchCategory } from "./api.js"

//recup des donnes de l'api et affichage des projets

let projets = await fetchProjets()
afficherProjets(projets)

// recup des categories et affichage des boutons

let categories = await fetchCategory()
afficherBoutons(projets, categories)

// verifier la validité du token, si ok : afficher la page en mode edition, sinon : afficher page normale
console.log("preload")

const token = localStorage.getItem("token")
console.log("token", token)
if (token) {
    afficherInterfaceConnectee()
} else {
    afficherInterfaceDeconnectee()
}

// PARTIE MODALE ---------------------------------------------------------------------------------------------------------------------------------------------------------

// affichage modale et galerie de la modale

const boutonModifier = document.querySelector(".btnModifier")
const modale = document.querySelector(".box")

boutonModifier.addEventListener("click", () => {
    modale.style.display = "block"
    afficherGalleryEdition()
})

// fermer la modale avec la croix et l'overlay

closeModaleX(modale)
closeModaleOverlay(modale)

// affichage modale du formulaire

const boutonAddPics = document.querySelector(".btnAddPics")
const modaleAddPics = document.querySelector(".boxAddPics")

boutonAddPics.addEventListener("click", () => {
    modaleAddPics.style.display = "block"
})

// fermer la modale du formulaire avec la croix et l'overlay

closeModaleX(modaleAddPics)
closeModaleOverlay(modaleAddPics)

// selectionner une photo pour l'ajouter

choisirPhoto()

// afficher les categories dasn le selecteur

CategoryOptions()

// verifier que le formulaire est bien rempli, puis envoie vers l'api

gererValidationFormulaire(projets)