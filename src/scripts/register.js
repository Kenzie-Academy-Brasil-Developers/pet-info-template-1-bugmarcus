import { baseUrl } from "./requests.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".form__container");
  const registerSubmitButton = document.getElementById("register__submit");
  const redirectButton = document.getElementById("redirect__button");

  // Adicionar event listener para o botão de cadastro
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usernameInput = registerForm.querySelector('[name="username"]');
    const emailInput = registerForm.querySelector('[name="email"]');
    const passwordInput = registerForm.querySelector('[name="password"]');
    const avatarInput = registerForm.querySelector('[name="avatar"]');

    const userData = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      avatar: avatarInput.value,
    };

    try {
      const response = await fetch(`${baseUrl}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("Novo usuário criado:", user);
      } else {
        console.error("Erro ao criar usuário");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  });

  // Adicionar event listener para o botão de redirecionamento
  redirectButton.addEventListener("click", () => {
    window.location.href = "../../index.html"; // Redireciona para o index.html na raiz
  });
});
