const bntIniciar = document.getElementById("startGame");
const inputNome = document.getElementById("nome");

bntIniciar.onclick = () => {
  const nome = inputNome.value.trim();
  if (nome === "") {
    alert("Por favor, preencha seu nome!");
  } else {
    localStorage.setItem("nome", nome);
    window.location.href = "game.html";
  }
};
