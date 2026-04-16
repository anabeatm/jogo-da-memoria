import { buscarRanking } from "./api.js";

export async function carregarRanking() {
  const respostaDaApi = await buscarRanking();

  console.log("Retorno da API:", respostaDaApi);

  const lista = document.getElementById("listaRanking");
  lista.innerHTML = "";

  let rankingReal = [];

  if (Array.isArray(respostaDaApi)) {
    rankingReal = respostaDaApi;
  } else if (respostaDaApi && Array.isArray(respostaDaApi.dados)) {
    rankingReal = respostaDaApi.dados;
  } else if (respostaDaApi && Array.isArray(respostaDaApi.ranking)) {
    rankingReal = respostaDaApi.ranking;
  } else {
    lista.innerHTML = "<li>Nenhum ranking encontrado ou formato incorreto</li>";
    return;
  }
  rankingReal.forEach((jogador) => {
    const item = document.createElement("li");
    item.innerText = `${jogador.nome} - Tentativas: ${jogador.tentativas || 0}`;
    lista.appendChild(item);
  });
}
