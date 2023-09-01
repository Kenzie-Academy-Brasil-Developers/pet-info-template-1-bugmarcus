import { renderAllPosts } from "./render.js";
import { getCurrentUserInfo } from "./requests.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");

  userAction.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
  });

  const createPostButton = document.getElementById("user__newpost");
  createPostButton.addEventListener("click", openCreatePostModal);

  // Obter as informações do usuário e atualizar a imagem
  const userInfo = await getCurrentUserInfo();
  if (userInfo && userInfo.avatar) {
    userAction.src = userInfo.avatar;
  }

  renderAllPosts();
});

function openCreatePostModal() {
  const modal = document.getElementById("create-post-modal");
  const titleInput = modal.querySelector("#post-title");
  const contentInput = modal.querySelector("#post-content");
  const closeButton = modal.querySelector(".modal__close");
  const cancelButton = modal.querySelector(".modal__cancel");
  const publishButton = modal.querySelector(".modal__publish");

  // Defina os valores padrão para os campos
  titleInput.value = ""; // Título em branco
  contentInput.value = ""; // Conteúdo em branco

  modal.style.display = "block";

  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  cancelButton.addEventListener("click", () => {
    // Limpar os campos e fechar o modal
    titleInput.value = "";
    contentInput.value = "";
    closeModal(modal);
  });

  publishButton.addEventListener("click", async () => {
    // Obtenha os valores dos campos de título e conteúdo
    const title = titleInput.value;
    const content = contentInput.value;

    // Montar o objeto no formato JSON
    const postData = {
      title,
      content,
    };

    try {
      const token = localStorage.getItem("@petinfo:token"); // Obtenha o token
      const response = await fetch("http://localhost:3333/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Postagem criada com sucesso, faça algo, se necessário
        closeModal(modal);
      } else {
        // Exiba uma mensagem de erro, se necessário
        console.error("Erro ao criar a postagem");
      }
    } catch (error) {
      console.error("Erro ao criar a postagem:", error);
    }
  });
}

function closeModal(modal) {
  modal.style.display = "none";
}
