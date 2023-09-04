if (!localStorage.getItem("@petinfo:token")) {
  // Redirecione para ../index.html
  window.location.pathname = "../index.html";
}
import { renderAllPosts, handleDate } from "./render.js";
import { getCurrentUserInfo, getPostDetailsById } from "./requests.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userAction = document.querySelector(".user__image");
  const userUniqueName = document.querySelector(".user__uniquename");
  const menu = document.querySelector(".user__logout");
  const logoutButton = document.querySelector(".logout__button");

  // Adicione um evento de clique ao botão de logout
  logoutButton.addEventListener("click", () => {
    // Remova a autenticação do localStorage
    localStorage.removeItem("@petinfo:token");
    window.location.href = "../../index.html";
  });

  userAction.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
  });

  const createPostButton = document.getElementById("user__newpost");
  createPostButton.addEventListener("click", openCreatePostModal);

  // Obter as informações do usuário e atualizar a imagem
  const userInfo = await getCurrentUserInfo();
  if (userInfo && userInfo.avatar) {
    userAction.src = userInfo.avatar;
    userUniqueName.textContent = `@${userInfo.username}`;
  }

  renderAllPosts();

  // Adicione um evento de clique a cada botão de "Acessar Publicação" após renderizar os posts
  const postsSection = document.querySelector(".posts");
  postsSection.addEventListener("click", async (event) => {
    const button = event.target.closest(".post__open");
    if (button) {
      const postId = button.dataset.id;
      const postDetails = await getPostDetailsById(postId);
      openPostModal(postDetails);
    }
  });
});

export function openPostModal(postDetails) {
  // Obtenha os elementos do modal
  const modal = document.getElementById("post-modal");
  const modalTitle = modal.querySelector("#modal-title");
  const modalAuthor = modal.querySelector("#modal-author");
  const modalDate = modal.querySelector("#modal-date");
  const modalContent = modal.querySelector("#modal-content");
  const modalAuthorAvatar = modal.querySelector("#modal-author-avatar"); // Novo elemento para o avatar
  const closeModalButton = modal.querySelector(".modal__close");

  // Preencha os elementos com os detalhes do post
  modalTitle.textContent = postDetails.title;
  modalDate.textContent = handleDate(postDetails.created_at); // Data de criação
  modalContent.textContent = postDetails.content;
  // Verifique se user e avatar existem
  if (postDetails.user && postDetails.user.avatar) {
    // Defina o src da tag de imagem para exibir o avatar
    modalAuthorAvatar.src = postDetails.user.avatar;
    modalAuthorAvatar.alt = postDetails.user.username || "Avatar do autor"; // Adicionar um texto alt
    modalAuthorAvatar.style.display = "block"; // Exiba a imagem do avatar
    modalAuthor.textContent = postDetails.user.username;
  }

  // Exiba o modal
  modal.style.display = "block";

  // Adicione um evento de clique para fechar o modal
  closeModalButton.addEventListener("click", () => closeModal(modal));
}

function closeModal(modal) {
  modal.style.display = "none";
}

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
    const titleInput = modal.querySelector("#post-title");
    const contentInput = modal.querySelector("#post-content");
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

        renderAllPosts();
      } else {
        // Exiba uma mensagem de erro, se necessário
        console.error("Erro ao criar a postagem");
      }
    } catch (error) {
      console.error("Erro ao criar a postagem:", error);
    }
  });
}
