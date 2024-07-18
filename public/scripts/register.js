document.addEventListener("DOMContentLoaded", function() {
    const registerButton = document.getElementById("register-button");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    registerButton.addEventListener("click", async function() {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (username && email && password) {
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Registro exitoso", data);
                    
                    // Mostrar mensaje de éxito
                    successMessage.textContent = "Registro exitoso. Redirigiendo...";
                    errorMessage.textContent = "";

                    // Redirigir después de un breve retraso
                    setTimeout(() => {
                        window.location.href = "/index.html";
                    }, 2000);
                } else {
                    console.error("Error en el registro:", data.error);
                    successMessage.textContent = "";
                    errorMessage.textContent = data.error;
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                successMessage.textContent = "";
                errorMessage.textContent = "Error en la solicitud. Intenta de nuevo más tarde.";
            }
        } else {
            // Mostrar un mensaje de error si faltan campos
            successMessage.textContent = "";
            errorMessage.textContent = "Por favor, completa todos los campos.";
        }
    });
});
