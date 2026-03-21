const bntIniciar = document.getElementById("startGame");
const inputNome = document.getElementById("nome");

bntIniciar.onclick = (evento) => {
  const nome = inputNome.value;
  if (nome === "") {
    evento.preventDefault();
    alert("Preencha todos os campos!");
  } else {
    localStorage.setItem("nome", nome);
  }
};
