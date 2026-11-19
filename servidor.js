const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const alunos = [];
let proximoId = 1;

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
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
      mensagem: "Preencha todos os campos.",
    });
  }

  const aluno = {
    id: proximoId++,
    nome,
    curso,
    matricula,
  };

  alunos.push(aluno);

  res.status(201).json(aluno);
});

// Excluir aluno
app.delete("/alunos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = alunos.findIndex((aluno) => aluno.id === id);

  if (index === -1) {
    return res.status(404).json({
      mensagem: "Aluno não encontrado.",
    });
  }

  alunos.splice(index, 1);
  res.json({ mensagem: "Aluno excluído com sucesso." });
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Servidor rodando em http://127.0.0.1:3000");
});
