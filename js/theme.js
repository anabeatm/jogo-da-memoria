export function iniciarTema() {
  const tema = localStorage.getItem("tema") || "light";

  document.documentElement.setAttribute("data-theme", tema);
}

export function alterarTema() {
  let tema =
    (localStorage.getItem("tema") || "light") == "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", tema);
  localStorage.setItem("tema", tema);
}
