const escenas = [
  {
    etapa: "01",
    titulo: "El botón rojo",
    imagen: "assets/img/slopaganda/red-button-lego.jpg",
    alt: "Escena tipo LEGO generada con IA sobre Trump, Netanyahu y un botón rojo"
  },
  {
    etapa: "02",
    titulo: "Trump como minifigura",
    imagen: "assets/img/slopaganda/trump-lego.jpg",
    alt: "Figura tipo LEGO de Donald Trump frente a una bandera de Estados Unidos"
  },
  {
    etapa: "03",
    titulo: "La guerra como maqueta",
    imagen: "assets/img/slopaganda/battle-lego.jpg",
    alt: "Escena de guerra tipo LEGO generada con inteligencia artificial"
  },
  {
    etapa: "04",
    titulo: "Propaganda nacionalista",
    imagen: "assets/img/slopaganda/iran-flag-lego.jpg",
    alt: "Imagen tipo LEGO con elementos visuales vinculados a Irán y Estados Unidos"
  },
  {
    etapa: "05",
    titulo: "Slopaganda como espectáculo",
    imagen: "assets/img/slopaganda/iran-soldier-lego.jpg",
    alt: "Composición visual sobre slopaganda del conflicto Irán Estados Unidos"
  }
];

const imagenRelato = document.getElementById("imagen-relato");
const rotuloEtapa = document.getElementById("rotulo-etapa");
const rotuloTitulo = document.getElementById("rotulo-titulo");
const pasos = document.querySelectorAll(".paso");
const barraProgreso = document.getElementById("barra-progreso");
const relato = document.querySelector(".relato");

let escenaActual = 0;

function cambiarEscena(indice) {
  const escena = escenas[indice];

  if (!escena || indice === escenaActual) return;

  escenaActual = indice;
  imagenRelato.classList.add("cambiando");

  setTimeout(() => {
    imagenRelato.src = escena.imagen;
    imagenRelato.alt = escena.alt;
    rotuloEtapa.textContent = escena.etapa;
    rotuloTitulo.textContent = escena.titulo;
    imagenRelato.classList.remove("cambiando");
  }, 240);
}

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      const indice = Number(entrada.target.dataset.escena);
      cambiarEscena(indice);
    }
  });
}, {
  threshold: 0.55
});

pasos.forEach((paso) => {
  observador.observe(paso);
});

function actualizarProgreso() {
  if (!relato || !barraProgreso) return;

  const rect = relato.getBoundingClientRect();
  const altoVentana = window.innerHeight;
  const altoRelato = relato.offsetHeight - altoVentana;

  const avance = Math.min(
    Math.max((-rect.top / altoRelato) * 100, 0),
    100
  );

  barraProgreso.style.width = `${avance}%`;
}

window.addEventListener("scroll", actualizarProgreso);
window.addEventListener("resize", actualizarProgreso);
actualizarProgreso();