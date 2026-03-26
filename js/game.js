import { buscarPalavras, salvarPartida } from "./api.js";

const btnReiniciar = document.getElementById("btnReiniciar");
const btnJogarNovamente = document.getElementById("jogarNovamente");
const cards = document.querySelectorAll(".card");
const tentativasHTML = document.getElementById("tentativas");

let primeira = null;
let segunda = null;
let tentativas = 0;
let bloqueado = false;

let cont = 0;

export async function iniciar() {
  const palavrasBuscadas = await buscarPalavras();

  let embaralhadas = embaralhar([...palavrasBuscadas, ...palavrasBuscadas]);
  cards.forEach((card, x) => {
    card.textContent = "?";
    card.dataset.palavra = embaralhadas[x];
    card.onclick = () => virar(card);

    card.classList.remove("selecionado"); // <-- desfaz a ação de seleção da partida anterior
  });

  btnJogarNovamente.style.display = "none";
  btnReiniciar.style.display = "flex";

  primeira = null;
  segunda = null;
  tentativas = 0;
  bloqueado = false;
  cont = 0;

  updateTentativas();
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
      salvarPartida();
      setTimeout(() => {
        alert("Parabéns! Ganhou a partida...");
      }, 800);
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

btnReiniciar.onclick = () => iniciar();
