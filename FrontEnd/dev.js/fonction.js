import { fetchCategory, fetchProjets } from "./api.js"
import { majProjets } from "./script.js"

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

// Afficher les boutons
function afficherBoutons(projets, categories) {
    const btnFiltres = document.querySelector(".filtres")
    btnFiltres.innerHTML = ""

    const tousLesBoutons = []

    const boutonTous = document.createElement("button")
    boutonTous.textContent = "Tous"
    boutonTous.dataset.id = 0
    boutonTous.classList.add("btnSelectionne")
    boutonTous.addEventListener("click", () => {
        filtrerProjets(0, projets)
        btnSelectionne(boutonTous, tousLesBoutons)
    })
    btnFiltres.appendChild(boutonTous)
    tousLesBoutons.push(boutonTous)

    categories.forEach(categorie => {
        const bouton = document.createElement("button")
        bouton.textContent = categorie.name
        bouton.dataset.id = categorie.id

        bouton.addEventListener("click", () => {
            filtrerProjets(categorie.id, projets)
            btnSelectionne(bouton, tousLesBoutons)
        })

        btnFiltres.appendChild(bouton)
        tousLesBoutons.push(bouton)
    })
}

// Fonction de filtrage des projets
function filtrerProjets(idFiltres, projets) {
    let projetsFiltres

    if (idFiltres === 0) {
        projetsFiltres = projets
    } else {
        projetsFiltres = projets.filter(projet => projet.categoryId === idFiltres)
    }

    document.querySelector(".gallery").innerHTML = ""
    afficherProjets(projetsFiltres)
}

//changer le bouton selectionne

function btnSelectionne(boutonActif, tousLesBoutons) {
    for (let i = 0; i < tousLesBoutons.length; i++) {
        tousLesBoutons[i].classList.remove("btnSelectionne")
    }
    boutonActif.classList.add("btnSelectionne")
}


//afficher l'interface connectée ou deconnectée

function afficherInterfaceDeconnectee() {
    document.querySelector(".modifier").classList.add("hidden")
    document.querySelector(".edition").classList.add("hidden")
    document.querySelector(".filtres").classList.remove("hidden")

    const loginLink = document.getElementById("loginLink")
    loginLink.textContent = "Login"
    loginLink.href = "login.html"
}

function afficherInterfaceConnectee() {
    document.querySelector(".modifier").classList.remove("hidden")
    document.querySelector(".edition").classList.remove("hidden")
    console.log("Élément filtres :", document.querySelector(".filtres"))
    document.querySelector(".filtres").classList.add("hidden")

    const loginLink = document.getElementById("loginLink")
    loginLink.textContent = "logout"
    loginLink.href = "#"
    loginLink.addEventListener("click", (event) => {
        event.preventDefault()
        localStorage.removeItem("token")
        window.location.reload()
    })
}


// recuperer les img de la gallery pour les afficher dans la galerie du mode edition avec une poubelle

function afficherGalleryEdition(projets) {
    const galleryModale = document.querySelector(".galleryModale")
    galleryModale.innerHTML = ""

    projets.forEach((projet, index) => {
        const nouvelArticle = document.createElement("article")

        const nouvelleImage = document.createElement("img")
        nouvelleImage.src = projet.imageUrl
        nouvelleImage.alt = projet.title
        nouvelArticle.appendChild(nouvelleImage)

        const icone = document.createElement("i")
        icone.classList.add("fa-solid", "fa-trash-can", "icone-supprimer")
        icone.dataset.id = projet.id

        icone.addEventListener("click", async () => {
            await supprimerProjet(projet.id)
            await majProjets(projet.id)
        })

        nouvelArticle.appendChild(icone)
        galleryModale.appendChild(nouvelArticle)
    })
}

// fonction fetch api pour delete un projet

async function supprimerProjet(id) {
    const token = localStorage.getItem("token")
    if (!token) {
        alert("Vous n'êtes pas connecté.")
        return
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!response.ok) {
            alert("Erreur lors de la suppression du projet.")
        }

    } catch (error) {
        console.error("Erreur réseau :", error)
        alert("Erreur réseau lors de la suppression.")
    }
}

// fonction pour fermer la modale depuis la croix et depuis l'overlay

function closeModaleX(modale) {
    let btnClose = document.querySelector(".close")
    btnClose.addEventListener("click", () => {
        modale.style.display = "none"
    })
}

function closeModaleOverlay(modale) {
    const modaleContent = document.querySelector(".modale")
    modale.addEventListener("click", (event) => {
        if (event.target === modale) {
            modale.style.display = "none"
        }
    })
}

function choisirPhoto() {
    const fileInput = document.getElementById("fileChoosePics")
    const customButton = document.getElementById("btnChoosePics")
    const addPicsDiv = document.querySelector(".addPics")
  
    customButton.addEventListener("click", (event) => {
      event.preventDefault()
      fileInput.click()
    })
  
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0]
  
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
  
          reader.onload = (event) => {

            addPicsDiv.innerHTML = ""
  
            const img = document.createElement("img")
            img.src = event.target.result
            img.alt = "Aperçu de l’image"
            img.style.objectFit = "cover"
 
            addPicsDiv.appendChild(img)
          }
  
          reader.readAsDataURL(file)
        }
      }
    })
  }

//   afficher les categories dans la modale pour ajouter une photo

    function CategoryOptions(categories) {
    const select = document.getElementById('selectCategory')

    const defaultOption = document.createElement('option')
    defaultOption.value = ""
    defaultOption.textContent = ""
    select.appendChild(defaultOption)

    categories.forEach(category => {
        const option = document.createElement('option')
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    })
}

// recuperer les inputs et envoyer le formulaire a l'api

function gererValidationFormulaire(projets) {
    const inputImage = document.getElementById("fileChoosePics")
    const inputTitre = document.getElementById("titre")
    const selectCategorie = document.getElementById("selectCategory")
    const btnSubmit = document.getElementById("btnSubmit")
    const form = document.querySelector(".formAddPics")
    const modaleAddPics = document.querySelector(".boxAddPics")

    function verifierChamps() {
        if (inputImage.files.length > 0 && inputTitre.value.trim() !== "" && selectCategorie.value !== "") {
            btnSubmit.disabled = false
            btnSubmit.classList.add("active")
        } else {
            btnSubmit.disabled = true
            btnSubmit.classList.remove("active")
        }
    }

    inputImage.addEventListener("change", verifierChamps)
    inputTitre.addEventListener("input", verifierChamps)
    selectCategorie.addEventListener("change", verifierChamps)

    btnSubmit.addEventListener("click", async (event) => {
        event.preventDefault()

        const image = inputImage.files[0]
        const titre = inputTitre.value.trim()
        const categoryId = parseInt(selectCategorie.value)
        const token = localStorage.getItem("token")

        const formData = new FormData()
        formData.append("image", image)
        formData.append("title", titre)
        formData.append("category", categoryId)

        try {
            const reponse = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })

            if (reponse.ok) {
                const nouveauProjet = await reponse.json()

                projets.push(nouveauProjet)
                afficherProjets(projets)
                afficherGalleryEdition(projets)

                // Reset du formulaire + aperçu + bouton
                form.reset()
                document.querySelector(".addPics").innerHTML = `
                    <i class="fa-regular fa-image"></i>
                    <button id="btnChoosePics">+ Ajouter photo</button>
                    <p>jpg, png : 4mo max</p>
                    <input type="file" id="fileChoosePics" accept="image/*" style="display: none" />
                `
                choisirPhoto()
                verifierChamps()

                // Fermer la modale
                modaleAddPics.style.display = "none"

            } else {
                alert("Erreur lors de l'ajout du projet. Veuillez vérifier les champs ou le token.")
            }
        } catch (error) {
            console.error("Erreur réseau :", error)
            alert("Une erreur réseau est survenue.")
        }
    })
}

export {afficherProjets, afficherBoutons, filtrerProjets, btnSelectionne, afficherInterfaceDeconnectee, afficherInterfaceConnectee, afficherGalleryEdition, closeModaleX, closeModaleOverlay, choisirPhoto, CategoryOptions, gererValidationFormulaire}