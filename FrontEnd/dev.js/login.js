// login utilisateur et stockage token en local

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact")

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        console.log("Envoi des identifiants :", email, password)

        fetch("http://localhost:5678/api/users/login", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log("Données reçues :", data)
            if (data.token) {
                localStorage.setItem("token", data.token)
                window.location.href = "index.html"
            } else {
                console.error("Erreur : Aucun token reçu")
            }
        })
        .catch(error => console.error("Erreur :", error))
    })
})

