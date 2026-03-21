import * as Theme from "./theme.js";
import * as Game from "./game.js";
// import { nomeJogador } from "./login.js";

let texto = document.getElementById("nomeJogador");
const nome = localStorage.getItem("nome");
texto.innerText = ` ${ nome }`;

document.addEventListener("DOMContentLoaded", () => {
  console.log("teste");
  Theme.iniciarTema();

  const btnAlterarTema = document.getElementById("btnAlterarTema");

  btnAlterarTema.onclick = Theme.alterarTema;
});

Game.iniciar();
