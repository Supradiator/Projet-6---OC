// login utilisateur et stockage token en local

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        console.log("Envoi des identifiants :", email, password);

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
            console.log("Données reçues :", data);

            // Nettoyer l'état précédent
            emailInput.classList.remove("input-error");
            passwordInput.classList.remove("input-error");
            emailInput.placeholder = "Email";
            passwordInput.placeholder = "Mot de passe";

            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                // Affichage d'un message d'erreur dans les placeholders
                emailInput.value = "";
                passwordInput.value = "";

                emailInput.placeholder = "Email ou mot de passe incorrect";
                passwordInput.placeholder = "Email ou mot de passe incorrect";

                emailInput.classList.add("input-error");
                passwordInput.classList.add("input-error");
            }
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
    });
});

