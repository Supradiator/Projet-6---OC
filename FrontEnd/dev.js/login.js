// login utilisateur et stockage token en local

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Formulaire soumis !"); // <-- Vérifie si ce message apparaît

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log("Données envoyées :", { email, password });

        fetch("http://localhost:5678/api/users/login", { 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json()) 
        .then(data => {
            console.log("Réponse du serveur :", data);
            if (data.token) {
                localStorage.setItem("authToken", data.token);
                window.location.href = "/FrontEnd/index.html";
            } else {
                alert("Identifiants incorrects !");
            }
        })
        .catch(error => console.error("Erreur :", error));
    });
});