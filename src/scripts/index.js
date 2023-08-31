import { baseUrl } from "./requests.js";

document.addEventListener("DOMContentLoaded", () => {
  const authenticated = localStorage.getItem("@petinfo:authenticated");

  if (authenticated === "true") {
    window.location.href = "./src/pages/feed.html"; // Redireciona para a página de feed
  }

  const registerButton = document.getElementById("register__button");
  const loginForm = document.querySelector(".form__container");
  const loginSubmitButton = document.getElementById("login__submit");

  registerButton.addEventListener("click", () => {
    window.location.href = "./src/pages/register.html"; // Redireciona para a página de Registro
  });

  loginSubmitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const emailInput = loginForm.querySelector('[name="email"]');
    const passwordInput = loginForm.querySelector('[name="password"]');

    const userData = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("@petinfo:token", data.token);
        window.location.href = "./src/pages/feed.html"; // Redireciona para a página de Feed
      } else {
        // Autenticação falhou
        const errorData = await response.json();
        if (errorData.message === "email ou senha inválidos") {
          // Exibir mensagem de erro no campo de senha
          passwordInput.nextElementSibling.classList.remove("hidden");
        }
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
    }
  });
});
