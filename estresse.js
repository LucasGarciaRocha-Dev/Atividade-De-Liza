import http from "k6/http";
import { check, sleep } from "k6";

// Aumenta a quantidade de usuários e depois reduz
export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 50 },
    { duration: "10s", target: 100 },
    { duration: "15s", target: 100 },
    { duration: "10s", target: 0 }
  ]
};

export default function () {
  const resposta = http.get("http://127.0.0.1:3000/alunos");

  check(resposta, {
    "servidor respondeu": r => r.status === 200
  });

  sleep(0.1);
}