const API_URL = "http://127.0.0.1:3000/alunos";

const form = document.getElementById("form-aluno");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista-alunos");
const btnListar = document.getElementById("btn-listar");

async function listarAlunos() {
  try {
    const resposta = await fetch(API_URL);
    const alunos = await resposta.json();

    lista.innerHTML = "";
    alunos.forEach((aluno) => {
      const item = document.createElement("li");
      item.textContent = `${aluno.id} - ${aluno.nome} | ${aluno.curso} | Matrícula: ${aluno.matricula} `;

      const btnExcluir = document.createElement("button");
      btnExcluir.type = "button";
      btnExcluir.textContent = "Excluir";
      btnExcluir.addEventListener("click", () => excluirAluno(aluno.id));

      item.appendChild(btnExcluir);
      lista.appendChild(item);
    });
  } catch (erro) {
    mensagem.textContent = "Erro ao conectar com o servidor.";
  }
}

async function excluirAluno(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    const dados = await resposta.json();

    if (!resposta.ok) {
      mensagem.textContent = dados.mensagem || "Erro ao excluir.";
      return;
    }

    mensagem.textContent = dados.mensagem;
    listarAlunos();
  } catch (erro) {
    mensagem.textContent = "Erro ao conectar com o servidor.";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const curso = document.getElementById("curso").value.trim();
  const matricula = document.getElementById("matricula").value.trim();

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, curso, matricula })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mensagem.textContent = dados.mensagem || "Erro ao cadastrar.";
      return;
    }

    mensagem.textContent = `Aluno ${dados.nome} cadastrado com sucesso!`;
    form.reset();
    listarAlunos();
  } catch (erro) {
    mensagem.textContent = "Erro ao conectar com o servidor.";
  }
});

btnListar.addEventListener("click", listarAlunos);
