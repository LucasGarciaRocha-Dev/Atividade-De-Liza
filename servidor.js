const express = require("express");

const app = express();

app.use(express.json());

const alunos = [];

// Página inicial
app.get("/", (req, res) => {
  res.send("API de cadastro de alunos");
});

// Listar alunos
app.get("/alunos", (req, res) => {
  res.json(alunos);
});

// Cadastrar aluno
app.post("/alunos", (req, res) => {
  const { nome, curso, matricula } = req.body;

  if (!nome || !curso || !matricula) {
    return res.status(400).json({
      mensagem: "Preencha todos os campos."
    });
  }

  const aluno = {
    id: alunos.length + 1,
    nome,
    curso,
    matricula
  };

  alunos.push(aluno);

  res.status(201).json(aluno);
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Servidor rodando em http://127.0.0.1:3000");
});
