export const baseUrl = "http://localhost:3333";

// Função para fazer login
export async function loginUser(email, password) {
  const loginData = {
    email,
    password,
  };

  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      // Armazene o token no localStorage
      localStorage.setItem("@petinfo:token", token);

      // Redirecione para a página de feed
      window.location.href = "./src/pages/feed.html";
    } else {
      // Exiba uma mensagem de erro de acordo com o guia do Figma
      // ...
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
}

// Função para fazer requisições autenticadas
export async function authenticatedRequest(url, method, data) {
  const token = localStorage.getItem("@petinfo:token");

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Erro na requisição autenticada:", error);
    throw error;
  }
}

// Informações de usuário logado
export async function getCurrentUserInfo() {
  try {
    const user = await authenticatedRequest(`${baseUrl}/users/profile`, "GET");
    return user;
  } catch (error) {
    console.error("Erro ao obter informações do usuário:", error);
  }
}

// Listagem de posts
export async function getAllPosts() {
  try {
    const posts = await authenticatedRequest(`${baseUrl}/posts`, "GET");
    return posts;
  } catch (error) {
    console.error("Erro ao obter posts:", error);
  }
}

// Post unico
export async function getSinglePost() {
  try {
    const posts = await authenticatedRequest(`${baseUrl}/posts`, "GET");
    return posts;
  } catch (error) {
    console.error("Erro ao obter posts:", error);
  }
}

export async function getPostDetailsById(postId) {
  try {
    const post = await authenticatedRequest(
      `${baseUrl}/posts/${postId}`,
      "GET"
    );
    return post;
  } catch (error) {
    console.error("Erro ao obter detalhes do post:", error);
  }
}
