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
    loginLink.textContent = "Logout"
    loginLink.href = "#"
    loginLink.addEventListener("click", (event) => {
        event.preventDefault()
        localStorage.removeItem("token")
        window.location.reload()
    })
}

// recuperer les img de la gallery pour les afficher dans la galerie du mode edition

function afficherGalleryEdition() {
    const galleryPrincipale = document.querySelector(".gallery");
    const galleryModale = document.querySelector(".galleryModale");

    const articles = galleryPrincipale.querySelectorAll("article");

    galleryModale.innerHTML = "";

    articles.forEach(article => {
        const img = article.querySelector("img");
        if (img) {
            // Crée un nouvel article
            const nouvelArticle = document.createElement("article");

            // Crée et ajoute l'image
            const nouvelleImage = document.createElement("img");
            nouvelleImage.src = img.src;
            nouvelleImage.alt = img.alt;
            nouvelArticle.appendChild(nouvelleImage);

            // Crée et ajoute une icône Font Awesome
            const icone = document.createElement("i");
            icone.classList.add("fa-solid", "fa-trash", "icone-supprimer"); // classes FA + perso
            nouvelArticle.appendChild(icone);

            // Ajoute l'article à la galerie modale
            galleryModale.appendChild(nouvelArticle);
        }
    });
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

export {afficherProjets, afficherBoutons, filtrerProjets, btnSelectionne, afficherInterfaceDeconnectee, afficherInterfaceConnectee, afficherGalleryEdition, closeModaleX, closeModaleOverlay}