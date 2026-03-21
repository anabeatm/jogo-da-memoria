import * as Theme from "./theme.js";
import * as Game from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("teste");
  Theme.iniciarTema();

  const btnAlterarTema = document.getElementById("btnAlterarTema");

  btnAlterarTema.onclick = Theme.alterarTema;
});

Game.iniciar();
