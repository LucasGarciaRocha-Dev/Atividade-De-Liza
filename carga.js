import http from "k6/http";
import { check, sleep } from "k6";

// 10 usuários acessando durante 30 segundos
export const options = {
  vus: 10,
  duration: "30s"
};

export default function () {
  const resposta = http.get("http://127.0.0.1:3000/alunos");

  check(resposta, {
    "retornou status 200": r => r.status === 200
  });

  sleep(1);
}