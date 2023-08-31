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
        const successToast = document.getElementById("success-toast");
        successToast.classList.remove("hidden");

        // Espere por um tempo (por exemplo, 3 segundos) antes de redirecionar
        setTimeout(() => {
          window.location.href = "../../index.html";
        }, 3000); // Redireciona após 3 segundos
        localStorage.setItem("@petinfo:token", data.token);
        localStorage.setItem("@petinfo:authenticated", "true");
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
