import { buscarPalavras, salvarPartida } from "./api.js";
import { carregarRanking } from "./ranking.js";

const board = document.querySelector(".board");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnJogarNovamente = document.getElementById("jogarNovamente");
const cards = document.querySelectorAll(".card");
const tentativasHTML = document.getElementById("tentativas");
const displayTimer = document.getElementById("display");

let primeira = null;
let segunda = null;
let tentativas = 0;
let bloqueado = false;
let tempoGasto = 0;
let timerInterval = null;

let cont = 0;

export async function iniciar() {
  resetarTimer();
  board.innerHTML = "";
  btnJogarNovamente.style.display = "none";
  btnReiniciar.style.display = "flex";

  primeira = null;
  segunda = null;
  tentativas = 0;
  cont = 0;
  bloqueado = false;
  updateTentativas();

  const palavrasBuscadas = await buscarPalavras();
  let embaralhadas = embaralhar([...palavrasBuscadas, ...palavrasBuscadas]);

  embaralhadas.forEach((palavra) => {
    const card = document.createElement("button");
    card.classList.add("card");
    card.textContent = "?";
    card.dataset.palavra = palavra;
    card.onclick = () => virar(card);
    board.appendChild(card);
  });

  iniciarTimer();
  carregarRanking();
}

function virar(card) {
  if (bloqueado) return;
  card.textContent = card.dataset.palavra;
  card.classList.add("selecionado");
  if (!primeira) {
    primeira = card;
    return;
  }
  segunda = card;
  verificar();
}

function verificar() {
  if (primeira.textContent == segunda.textContent) {
    primeira = null;
    segunda = null;
    cont++;
    if (cont === 6) {
      clearInterval(timerInterval);
      const nomeJogador = localStorage.getItem("nome") || "Desconhecido";
      const dadosPartida = {
        nome: nomeJogador,
        tentativas: tentativas,
        tempo: tempoGasto,
      };
      salvarPartida(dadosPartida);
      setTimeout(() => {
        alert("Parabéns! Ganhou a partida...");
      }, 500);
      jogarNovamente();
    }
  } else {
    bloqueado = true;
    setTimeout(() => {
      primeira.textContent = "?";
      segunda.textContent = "?";
      primeira.classList.remove("selecionado");
      segunda.classList.remove("selecionado");
      primeira = null;
      segunda = null;
      bloqueado = false;
      console.log("1");
    }, 600);
    console.log("2");
    tentativas++;
    updateTentativas();
  }
}

function embaralhar(array) {
  for (let x = array.length - 1; x > 0; x--) {
    let y = Math.floor(Math.random() * (1 + x));
    [array[x], array[y]] = [array[y], array[x]];
  }
  return array;
}

function updateTentativas() {
  tentativasHTML.innerText = tentativas;
}

function jogarNovamente() {
  btnJogarNovamente.style.display = "flex";
  btnReiniciar.style.display = "none";

  btnJogarNovamente.onclick = () => iniciar();
}

function iniciarTimer() {
  tempoGasto = 0;
  timerInterval = setInterval(() => {
    tempoGasto++;
    const min = Math.floor(tempoGasto / 60)
      .toString()
      .padStart(2, "0");
    const sec = (tempoGasto % 60).toString().padStart(2, "0");
    displayTimer.textContent = `${min}:${sec}`;
  }, 1000);
}

function resetarTimer() {
  clearInterval(timerInterval);
  tempoGasto = 0;
  displayTimer.textContent = "00:00";
}

btnReiniciar.onclick = () => iniciar();
