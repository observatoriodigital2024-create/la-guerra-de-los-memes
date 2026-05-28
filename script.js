import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const pasos = Array.from(document.querySelectorAll(".paso"));
const relato = document.querySelector(".relato");
const barraProgreso = document.querySelector("#barra-progreso");
const rotuloEtapa = document.querySelector("#rotulo-etapa");
const rotuloTitulo = document.querySelector("#rotulo-titulo");
const chartContainer = document.querySelector("#observableChart");

const escenas = [
  {id: "tiktok-justicia", etiqueta: "1", titulo: "La justicia entra a TikTok"},
  {id: "acordeon", etiqueta: "2", titulo: "El auge del acordeón"},
  {id: "dominancia", etiqueta: "3", titulo: "Quién dominó la conversación"},
  {id: "red-narrativas", etiqueta: "4", titulo: "Red de usuarios y narrativas"},
  {id: "palabras-clave", etiqueta: "5", titulo: "La conversación cambia de palabras clave"},
  {id: "emociones", etiqueta: "6", titulo: "La disputa emocional"}
];

const datos = {
  tiktok: [
    {periodo: "Antes", publicaciones: 65},
    {periodo: "Durante", publicaciones: 12},
    {periodo: "Después", publicaciones: 115}
  ],
  acordeon: [
    {mes: "Ene", menciones: 0},
    {mes: "Feb", menciones: 0},
    {mes: "Mar", menciones: 5},
    {mes: "Abr", menciones: 15},
    {mes: "May", menciones: 60},
    {mes: "Jun", menciones: 100}
  ],
  usuarios: [
    {usuario: "@lexconsulto", publicaciones: 59},
    {usuario: "@latinus_us", publicaciones: 16},
    {usuario: "@politicomx", publicaciones: 15},
    {usuario: "@aztecanoticias", publicaciones: 11}
  ],
  red: {
    nodes: [
      {id: "@lexconsulto", grupo: "usuario", size: 59},
      {id: "@politicomx", grupo: "usuario", size: 15},
      {id: "@latinus_us", grupo: "usuario", size: 16},
      {id: "@aztecanoticias", grupo: "usuario", size: 11},
      {id: "#acordeon", grupo: "hashtag", size: 40},
      {id: "#reformajudicial", grupo: "hashtag", size: 30},
      {id: "#scjn", grupo: "hashtag", size: 22},
      {id: "#eleccionjudicial", grupo: "hashtag", size: 25}
    ],
    links: [
      {source: "@lexconsulto", target: "#acordeon"},
      {source: "@lexconsulto", target: "#reformajudicial"},
      {source: "@lexconsulto", target: "#scjn"},
      {source: "@politicomx", target: "#eleccionjudicial"},
      {source: "@politicomx", target: "#reformajudicial"},
      {source: "@latinus_us", target: "#acordeon"},
      {source: "@aztecanoticias", target: "#scjn"}
    ]
  },
  emociones: [
    {periodo: "Antes", emotion: "Alegría", value: 42},
    {periodo: "Antes", emotion: "Enojo", value: 8},
    {periodo: "Durante", emotion: "Alegría", value: 35},
    {periodo: "Durante", emotion: "Enojo", value: 10},
    {periodo: "Después", emotion: "Alegría", value: 18},
    {periodo: "Después", emotion: "Enojo", value: 17}
  ]
};

function limpiarGrafico() {
  if (!chartContainer) return;
  chartContainer.innerHTML = "";
}

function graficoTikTok() {
  limpiarGrafico();

  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {domain: ["Antes", "Durante", "Después"], label: "Período", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Publicaciones", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barY(datos.tiktok, {
        x: "periodo",
        y: "publicaciones",
        fill: "#1b75bb"
      }),
      Plot.ruleY([0])
    ]
  });
  chartContainer.append(chart);
}

function graficoAcordeon() {
  limpiarGrafico();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {domain: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"], label: "Mes", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Menciones", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.areaY(datos.acordeon, {
        x: "mes",
        y: "menciones",
        fill: "url(#gradient)",
        stroke: "#652d90",
        strokeWidth: 2
      }),
      Plot.dot(datos.acordeon, {
        x: "mes",
        y: "menciones",
        fill: "#652d90",
        r: 4
      })
    ]
  });
  
  // Agregar gradiente al SVG
  const svg = chart.querySelector("svg");
  if (svg) {
    const defs = svg.querySelector("defs") || svg.insertBefore(
      document.createElementNS("http://www.w3.org/2000/svg", "defs"),
      svg.firstChild
    );
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#652d90");
    stop1.setAttribute("stop-opacity", "0.4");
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#652d90");
    stop2.setAttribute("stop-opacity", "0.02");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
  }
  
  chartContainer.append(chart);
}

function graficoDominancia() {
  limpiarGrafico();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 180,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {grid: true, label: "Publicaciones", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {label: null, tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barX(datos.usuarios, {
        y: "usuario",
        x: "publicaciones",
        fill: "#1b75bb",
        sort: {y: "x", reverse: true}
      }),
      Plot.text(datos.usuarios, {
        y: "usuario",
        x: "publicaciones",
        text: d => `${d.publicaciones}`,
        dx: 8,
        fill: "#cbd5e1"
      })
    ]
  });
  chartContainer.append(chart);
}

function graficoRed() {
  limpiarGrafico();
  
  const width = 650;
  const height = 420;
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background", "none");
  
  const nodes = datos.red.nodes.map(d => ({...d}));
  const links = datos.red.links.map(d => ({...d}));
  
  const color = d => d.grupo === "hashtag" ? "#ec4899" : "#1b75bb";
  const radius = d => Math.max(10, Math.sqrt(d.size) * 2.8);
  
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.source.grupo === "usuario" && d.target.grupo === "hashtag" ? 120 : 90))
    .force("charge", d3.forceManyBody().strength(-260))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX(d => d.grupo === "hashtag" ? width * 0.72 : width * 0.28).strength(0.08))
    .force("y", d3.forceY(height / 2).strength(0.04))
    .force("collide", d3.forceCollide(d => radius(d) + 8));
  
  const link = svg.append("g")
    .attr("stroke", "rgba(255,255,255,0.22)")
    .attr("stroke-width", 1.2)
    .attr("opacity", 0.8)
    .selectAll("line")
    .data(links)
    .join("line");
  
  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "network-node")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
  node.append("circle")
    .attr("r", d => radius(d))
    .attr("fill", d => color(d))
    .attr("stroke", "rgba(255,255,255,0.24)")
    .attr("stroke-width", 2);
  
  node.append("text")
    .attr("class", "network-label")
    .attr("text-anchor", "middle")
    .attr("dy", d => d.grupo === "hashtag" ? 4 : 4)
    .attr("font-size", "10px")
    .attr("fill", "#fff")
    .attr("pointer-events", "none")
    .text(d => d.id.replace("@", "").replace("#", ""));
  
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    node.attr("transform", d => `translate(${Math.max(32, Math.min(width - 32, d.x))},${Math.max(32, Math.min(height - 32, d.y))})`);
  });
  
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  chartContainer.append(svg.node());
}

function graficoEmociones() {
  limpiarGrafico();

  // calcular picos por emoción
  const emociones = datos.emociones;
  const picoAlegriaVal = d3.max(emociones.filter(d => d.emotion === "Alegría"), d => d.value);
  const picoEnojoVal = d3.max(emociones.filter(d => d.emotion === "Enojo"), d => d.value);
  const picoAlegria = emociones.find(d => d.emotion === "Alegría" && d.value === picoAlegriaVal) || null;
  const picoEnojo = emociones.find(d => d.emotion === "Enojo" && d.value === picoEnojoVal) || null;

  // Crear leyenda simple
  const legend = document.createElement('div');
  legend.className = 'chart-legend';
  legend.innerHTML = `
    <span class="legend-item"><i style="background:#1b75bb"></i>Alegría</span>
    <span class="legend-item"><i style="background:#ec4899"></i>Enojo</span>
  `;
  chartContainer.appendChild(legend);

  const chart = Plot.plot({
    width: 760,
    height: 520,
    marginLeft: 170,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "13px"
    },
    x: {domain: ["Antes", "Durante", "Después"], label: "Período", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Menciones", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.areaY(datos.emociones.filter(d => d.emotion === "Alegría"), {
        x: "periodo",
        y: "value",
        fill: "#1b75bb",
        fillOpacity: 0.12
      }),
      Plot.areaY(datos.emociones.filter(d => d.emotion === "Enojo"), {
        x: "periodo",
        y: "value",
        fill: "#ec4899",
        fillOpacity: 0.12
      }),
      Plot.lineY(datos.emociones.filter(d => d.emotion === "Alegría"), {
        x: "periodo",
        y: "value",
        stroke: "#1b75bb",
        strokeWidth: 3,
        title: "Alegría"
      }),
      Plot.lineY(datos.emociones.filter(d => d.emotion === "Enojo"), {
        x: "periodo",
        y: "value",
        stroke: "#ec4899",
        strokeWidth: 3,
        title: "Enojo"
      }),
      Plot.dot(datos.emociones.filter(d => d.emotion === "Alegría"), {
        x: "periodo",
        y: "value",
        fill: "#1b75bb",
        r: 5
      }),
      Plot.dot(datos.emociones.filter(d => d.emotion === "Enojo"), {
        x: "periodo",
        y: "value",
        fill: "#ec4899",
        r: 5
      })
      ,
      // picos anotados
      ...(picoAlegria ? [Plot.dot([picoAlegria], { x: "periodo", y: "value", fill: "#1b75bb", r: 8, stroke: "#ffffff", strokeWidth: 1.5 }), Plot.text([picoAlegria], { x: "periodo", y: "value", text: d => d.value, dy: -14, fill: "#1b75bb", fontSize: 12 })] : []),
      ...(picoEnojo ? [Plot.dot([picoEnojo], { x: "periodo", y: "value", fill: "#ec4899", r: 8, stroke: "#ffffff", strokeWidth: 1.5 }), Plot.text([picoEnojo], { x: "periodo", y: "value", text: d => d.value, dy: -14, fill: "#ec4899", fontSize: 12 })] : [])
    ]
  });

  chartContainer.append(chart);
}

const funcionesGraficos = [
  graficoTikTok,
  graficoAcordeon,
  graficoDominancia,
  graficoRed,
  graficoHeatmapPalabras,
  graficoEmociones
];

function graficoHeatmapPalabras() {
  limpiarGrafico();
  const heatmapDatos = [
    {palabra: "#eleccionesjudiciales", mes: "oct24", total: 5},
    {palabra: "#eleccionesjudiciales", mes: "nov24", total: 4},
    {palabra: "#eleccionesjudiciales", mes: "dic24", total: 4},
    {palabra: "#eleccionesjudiciales", mes: "ene25", total: 5},
    {palabra: "#eleccionesjudiciales", mes: "feb25", total: 8},
    {palabra: "#eleccionesjudiciales", mes: "mar25", total: 28},
    {palabra: "#eleccionesjudiciales", mes: "abr25", total: 42},
    {palabra: "#eleccionesjudiciales", mes: "may25", total: 58},
    {palabra: "#eleccionesjudiciales", mes: "jun25", total: 65},
    {palabra: "#eleccionesjudiciales", mes: "jul25", total: 24},
    {palabra: "#eleccionesjudiciales", mes: "ago25", total: 9},
    {palabra: "#eleccionesjudiciales", mes: "sep25", total: 8},
    {palabra: "#eleccionesjudiciales", mes: "oct25", total: 7},

    {palabra: "#eleccionjudicial", mes: "oct24", total: 6},
    {palabra: "#eleccionjudicial", mes: "nov24", total: 5},
    {palabra: "#eleccionjudicial", mes: "dic24", total: 4},
    {palabra: "#eleccionjudicial", mes: "ene25", total: 6},
    {palabra: "#eleccionjudicial", mes: "feb25", total: 10},
    {palabra: "#eleccionjudicial", mes: "mar25", total: 30},
    {palabra: "#eleccionjudicial", mes: "abr25", total: 44},
    {palabra: "#eleccionjudicial", mes: "may25", total: 55},
    {palabra: "#eleccionjudicial", mes: "jun25", total: 68},
    {palabra: "#eleccionjudicial", mes: "jul25", total: 25},
    {palabra: "#eleccionjudicial", mes: "ago25", total: 9},
    {palabra: "#eleccionjudicial", mes: "sep25", total: 10},
    {palabra: "#eleccionjudicial", mes: "oct25", total: 8},

    {palabra: "#acordeon elecciones", mes: "oct24", total: 0},
    {palabra: "#acordeon elecciones", mes: "nov24", total: 0},
    {palabra: "#acordeon elecciones", mes: "dic24", total: 0},
    {palabra: "#acordeon elecciones", mes: "ene25", total: 0},
    {palabra: "#acordeon elecciones", mes: "feb25", total: 0},
    {palabra: "#acordeon elecciones", mes: "mar25", total: 0},
    {palabra: "#acordeon elecciones", mes: "abr25", total: 0},
    {palabra: "#acordeon elecciones", mes: "may25", total: 68},
    {palabra: "#acordeon elecciones", mes: "jun25", total: 62},
    {palabra: "#acordeon elecciones", mes: "jul25", total: 42},
    {palabra: "#acordeon elecciones", mes: "ago25", total: 18},
    {palabra: "#acordeon elecciones", mes: "sep25", total: 5},
    {palabra: "#acordeon elecciones", mes: "oct25", total: 4},

    {palabra: "scjn", mes: "oct24", total: 4},
    {palabra: "scjn", mes: "nov24", total: 7},
    {palabra: "scjn", mes: "dic24", total: 3},
    {palabra: "scjn", mes: "ene25", total: 7},
    {palabra: "scjn", mes: "feb25", total: 7},
    {palabra: "scjn", mes: "mar25", total: 6},
    {palabra: "scjn", mes: "abr25", total: 18},
    {palabra: "scjn", mes: "may25", total: 18},
    {palabra: "scjn", mes: "jun25", total: 35},
    {palabra: "scjn", mes: "jul25", total: 45},
    {palabra: "scjn", mes: "ago25", total: 42},
    {palabra: "scjn", mes: "sep25", total: 60},
    {palabra: "scjn", mes: "oct25", total: 55},

    {palabra: "supremacortejusticia", mes: "oct24", total: 6},
    {palabra: "supremacortejusticia", mes: "nov24", total: 5},
    {palabra: "supremacortejusticia", mes: "dic24", total: 3},
    {palabra: "supremacortejusticia", mes: "ene25", total: 4},
    {palabra: "supremacortejusticia", mes: "feb25", total: 7},
    {palabra: "supremacortejusticia", mes: "mar25", total: 7},
    {palabra: "supremacortejusticia", mes: "abr25", total: 4},
    {palabra: "supremacortejusticia", mes: "may25", total: 6},
    {palabra: "supremacortejusticia", mes: "jun25", total: 38},
    {palabra: "supremacortejusticia", mes: "jul25", total: 22},
    {palabra: "supremacortejusticia", mes: "ago25", total: 34},
    {palabra: "supremacortejusticia", mes: "sep25", total: 50},
    {palabra: "supremacortejusticia", mes: "oct25", total: 48},

    {palabra: "reformajudicial", mes: "oct24", total: 20},
    {palabra: "reformajudicial", mes: "nov24", total: 10},
    {palabra: "reformajudicial", mes: "dic24", total: 2},
    {palabra: "reformajudicial", mes: "ene25", total: 3},
    {palabra: "reformajudicial", mes: "feb25", total: 7},
    {palabra: "reformajudicial", mes: "mar25", total: 3},
    {palabra: "reformajudicial", mes: "abr25", total: 12},
    {palabra: "reformajudicial", mes: "may25", total: 8},
    {palabra: "reformajudicial", mes: "jun25", total: 7},
    {palabra: "reformajudicial", mes: "jul25", total: 20},
    {palabra: "reformajudicial", mes: "ago25", total: 10},
    {palabra: "reformajudicial", mes: "sep25", total: 12},
    {palabra: "reformajudicial", mes: "oct25", total: 32},

    {palabra: "magistrada", mes: "oct24", total: 8},
    {palabra: "magistrada", mes: "nov24", total: 8},
    {palabra: "magistrada", mes: "dic24", total: 5},
    {palabra: "magistrada", mes: "ene25", total: 6},
    {palabra: "magistrada", mes: "feb25", total: 5},
    {palabra: "magistrada", mes: "mar25", total: 22},
    {palabra: "magistrada", mes: "abr25", total: 58},
    {palabra: "magistrada", mes: "may25", total: 42},
    {palabra: "magistrada", mes: "jun25", total: 20},
    {palabra: "magistrada", mes: "jul25", total: 8},
    {palabra: "magistrada", mes: "ago25", total: 8},
    {palabra: "magistrada", mes: "sep25", total: 38},
    {palabra: "magistrada", mes: "oct25", total: 22},

    {palabra: "jueza", mes: "oct24", total: 28},
    {palabra: "jueza", mes: "nov24", total: 12},
    {palabra: "jueza", mes: "dic24", total: 8},
    {palabra: "jueza", mes: "ene25", total: 6},
    {palabra: "jueza", mes: "feb25", total: 7},
    {palabra: "jueza", mes: "mar25", total: 5},
    {palabra: "jueza", mes: "abr25", total: 34},
    {palabra: "jueza", mes: "may25", total: 12},
    {palabra: "jueza", mes: "jun25", total: 8},
    {palabra: "jueza", mes: "jul25", total: 36},
    {palabra: "jueza", mes: "ago25", total: 20},
    {palabra: "jueza", mes: "sep25", total: 30},
    {palabra: "jueza", mes: "oct25", total: 38}
  ];

  const monthsOrder = ["ene25","feb25","mar25","abr25","may25","jun25"];

  const chart = Plot.plot({
    width: 760,
    height: 520,
    marginLeft: 170,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "13px"
    },
    x: {label: "Mes", domain: monthsOrder, tickRotate: 0, tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {label: "Palabra", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    color: {range: ["#fce7f8", "#f472b6", "#db2777"], label: "Total"},
    marks: [
      Plot.cell(heatmapDatos, { x: "mes", y: "palabra", fill: "total", inset: 1 }),
      // labels inside cells
      Plot.text(heatmapDatos, {
        x: "mes",
        y: "palabra",
        text: d => d.total,
        fill: d => d.total > (d3.max(heatmapDatos, h => h.total) * 0.5) ? "#ffffff" : "#e5e7eb",
        fontSize: 10,
        dy: "0.35em"
      }),
      Plot.ruleX([0])
    ]
  });

  chartContainer.append(chart);
}

function activarEscena(index) {
  pasos.forEach((paso, i) => paso.classList.toggle("activo", i === index));
  
  const escena = escenas[index] || escenas[0];
  rotuloEtapa.textContent = escena.etiqueta;
  rotuloTitulo.textContent = escena.titulo;
  barraProgreso.style.width = `${((index + 1) / pasos.length) * 100}%`;
  
  const funcion = funcionesGraficos[index] || funcionesGraficos[0];
  funcion();
}

function actualizarProgreso() {
  if (!relato) return;
  
  const inicio = relato.offsetTop;
  const final = relato.offsetTop + relato.offsetHeight - window.innerHeight;
  if (final <= inicio) return;
  
  const avance = (window.scrollY - inicio) / (final - inicio);
  const porcentaje = Math.min(100, Math.max(0, avance * 100));
  barraProgreso.style.width = `${porcentaje}%`;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = pasos.indexOf(entry.target);
        if (index >= 0) {
          activarEscena(index);
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.55
  }
);

pasos.forEach((paso) => observer.observe(paso));
window.addEventListener("scroll", actualizarProgreso, { passive: true });
window.addEventListener("resize", actualizarProgreso);

activarEscena(0);
actualizarProgreso();

/* ============================================================
   SEGUNDA SECCIÓN: PROPUESTAS Y NARRATIVAS
   ============================================================ */

const pasos2 = Array.from(document.querySelectorAll(".paso-secundario"));
const relato2 = document.querySelector(".relato-secundario");
const barraProgreso2 = document.querySelector("#barra-progreso-2");
const rotuloEtapa2 = document.querySelector("#rotulo-etapa-2");
const rotuloTitulo2 = document.querySelector("#rotulo-titulo-2");
const chartContainer2 = document.querySelector("#observableChart2");

const escenas2 = [
  {id: "vinculantes", etiqueta: "1", titulo: "Propuestas vs. narrativas de campaña"},
  {id: "temas-juridicos", etiqueta: "2", titulo: "Los temas jurídicos más sólidos"},
  {id: "tecnico-politico", etiqueta: "3", titulo: "Entre lo técnico y lo político"},
  {id: "diferencias-genero", etiqueta: "4", titulo: "Diferencias discursivas por género"},
  {id: "palabras-dominantes", etiqueta: "5", titulo: "Las palabras que dominaron el discurso"},
  {id: "intencionalidad-discursiva", etiqueta: "6", titulo: "Propuestas y discursos"}
];

const datos2 = {
  relacionadas: [
    {tipo: "Narrativas de campaña", porcentaje: 60},
    {tipo: "Propuestas reales", porcentaje: 40}
  ],
  temas: [
    {tema: "Derechos constitucionales e igualdad", lda: 21.43, nmf: 4.76},
    {tema: "Mecanismos legales y juicios", lda: 21.43, nmf: 9.52},
    {tema: "Sistema judicial y Federación", lda: 9.52, nmf: 21.43},
    {tema: "Opiniones y percepciones generales", lda: 4.76, nmf: 21.43}
  ],
  nivel: [
    {nivel: "Técnico-normativo", porcentaje: 42.86},
    {nivel: "Sistémico-político", porcentaje: 42.86}
  ],
  genero: {
    nodes: [
      {id: "Discurso judicial", grupo: "centro", size: 50},
      {id: "Justicia social", grupo: "mujeres", size: 30},
      {id: "Equidad", grupo: "mujeres", size: 28},
      {id: "Perspectiva de género", grupo: "mujeres", size: 32},
      {id: "Derechos humanos", grupo: "mujeres", size: 26},
      {id: "Acceso a la justicia", grupo: "mujeres", size: 24},
      {id: "Capacitación", grupo: "mujeres", size: 22},
      {id: "Combate a la corrupción", grupo: "hombres", size: 32},
      {id: "Modernización", grupo: "hombres", size: 28},
      {id: "Transparencia", grupo: "hombres", size: 26},
      {id: "Reforma judicial", grupo: "hombres", size: 30},
      {id: "Eficiencia", grupo: "hombres", size: 24},
      {id: "Estructura", grupo: "hombres", size: 22}
    ],
    links: [
      {source: "Discurso judicial", target: "Justicia social"},
      {source: "Discurso judicial", target: "Equidad"},
      {source: "Discurso judicial", target: "Perspectiva de género"},
      {source: "Discurso judicial", target: "Derechos humanos"},
      {source: "Discurso judicial", target: "Acceso a la justicia"},
      {source: "Discurso judicial", target: "Capacitación"},
      {source: "Discurso judicial", target: "Combate a la corrupción"},
      {source: "Discurso judicial", target: "Modernización"},
      {source: "Discurso judicial", target: "Transparencia"},
      {source: "Discurso judicial", target: "Reforma judicial"},
      {source: "Discurso judicial", target: "Eficiencia"},
      {source: "Discurso judicial", target: "Estructura"}
    ]
  },
  palabras: [
    {palabra: "Justicia", frecuencia: 100},
    {palabra: "Corte", frecuencia: 85},
    {palabra: "Derecho", frecuencia: 78},
    {palabra: "Reforma judicial", frecuencia: 70},
    {palabra: "Poder Judicial", frecuencia: 65},
    {palabra: "Amparo", frecuencia: 42},
    {palabra: "Mujeres", frecuencia: 34},
    {palabra: "Acceso a la justicia", frecuencia: 32},
    {palabra: "Indígenas", frecuencia: 22},
    {palabra: "Discapacidad", frecuencia: 20}
  ]
};

function limpiarGrafico2() {
  if (!chartContainer2) return;
  chartContainer2.innerHTML = "";
}

function graficoVinculantes() {
  limpiarGrafico2();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 70,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {label: "Tipo de propuesta", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {grid: true, label: "Porcentaje (%)", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barY(datos2.relacionadas, {
        x: "tipo",
        y: "porcentaje",
        fill: d => d.tipo === "Relacionadas" ? "#1b75bb" : "#ec4899"
      }),
      Plot.text(datos2.relacionadas, {
        x: "tipo",
        y: "porcentaje",
        text: d => `${d.porcentaje}%`,
        dy: -12,
        fill: "#cbd5e1"
      }),
      Plot.ruleY([0])
    ]
  });
  chartContainer2.append(chart);
}

function graficoTemasJuridicos() {
  limpiarGrafico2();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 260,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "12px"
    },
    x: {grid: true, label: "Peso (%)", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {label: null, tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barX(datos2.temas, {
        y: "tema",
        x: "lda",
        fill: "#1b75bb",
        sort: {y: "x", reverse: true},
        title: "LDA"
      }),
      Plot.barX(datos2.temas, {
        y: "tema",
        x: d => -d.nmf,
        fill: "#652d90",
        title: "NMF"
      }),
      Plot.ruleX([0])
    ]
  });
  chartContainer2.append(chart);
}

function graficoTecnicoPolitico() {
  limpiarGrafico2();
  const chart = Plot.plot({
    width: 650,
    height: 420,
    marginLeft: 150,
    style: {
      background: "none",
      color: "#e5e7eb",
      fontSize: "14px"
    },
    x: {grid: true, label: "Porcentaje (%)", tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    y: {label: null, tickColor: "#cbd5e1", labelColor: "#cbd5e1"},
    marks: [
      Plot.barX(datos2.nivel, {
        y: "nivel",
        x: "porcentaje",
        fill: "#1b75bb"
      }),
      Plot.text(datos2.nivel, {
        y: "nivel",
        x: "porcentaje",
        text: d => `${d.porcentaje}%`,
        dx: 8,
        fill: "#cbd5e1"
      })
    ]
  });
  chartContainer2.append(chart);
}

function graficoGenero() {
  limpiarGrafico2();
  
  const width = 650;
  const height = 420;
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background", "none");
  
  const nodes = datos2.genero.nodes.map(d => ({...d}));
  const links = datos2.genero.links.map(d => ({...d}));
  
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.source.grupo === "centro" || d.target.grupo === "centro" ? 90 : 130))
    .force("charge", d3.forceManyBody().strength(-260))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX(d => {
      if (d.grupo === "mujeres") return width * 0.28;
      if (d.grupo === "hombres") return width * 0.72;
      return width * 0.5;
    }).strength(0.08))
    .force("y", d3.forceY(height / 2).strength(0.04))
    .force("collide", d3.forceCollide(d => d.grupo === "centro" ? 24 : Math.sqrt(d.size) * 3 + 8));
  
  const link = svg.append("g")
    .attr("opacity", 0.22)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "network-link")
    .attr("stroke-width", 1.8);
  
  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "network-node")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
  node.append("circle")
    .attr("r", d => {
      if (d.grupo === "centro") return 18;
      return Math.sqrt(d.size) * 3.5;
    })
    .attr("fill", d => {
      if (d.grupo === "centro") return "#fbbf24";
      if (d.grupo === "mujeres") return "#ec4899";
      return "#1b75bb";
    })
    .attr("stroke", "rgba(255,255,255,0.18)")
    .attr("stroke-width", 2);
  
  node.append("text")
    .attr("class", "network-label")
    .attr("font-size", d => d.grupo === "centro" ? "12px" : "11px")
    .attr("font-weight", d => d.grupo === "centro" ? "700" : "500")
    .attr("dy", d => d.grupo === "centro" ? 4 : 4)
    .text(d => d.id)
    .style("pointer-events", "none");
  
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    node.attr("transform", d => `translate(${Math.max(40, Math.min(width - 40, d.x))},${Math.max(40, Math.min(height - 40, d.y))})`);
  });
  
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  chartContainer2.append(svg.node());
}

function graficoPalabras() {
  limpiarGrafico2();
  
  const width = 650;
  const height = 420;
  
  // Crear un array único por visualización
  const datosPalabras = datos2.palabras;
  
  // Calcular posiciones circulares
  const root = d3.pack()
    .size([width, height])
    .padding(8)(d3.hierarchy({children: datosPalabras}).sum(d => d.frecuencia));
  
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background", "none");
  
  const colorScale = d3.scaleOrdinal()
    .domain(datosPalabras.map(d => d.palabra))
    .range(["#1b75bb", "#652d90", "#ec4899", "#fbbf24", "#1b75bb"]);
  
  const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);
  
  leaf.append("circle")
    .attr("r", d => d.r)
    .attr("fill", d => colorScale(d.data.palabra))
    .attr("opacity", 0.88)
    .attr("stroke", "rgba(255,255,255,0.18)")
    .attr("stroke-width", 2);
  
  leaf.append("text")
    .attr("class", "network-label")
    .attr("text-anchor", "middle")
    .attr("dy", d => d.r / 5)
    .selectAll("tspan")
    .data(d => d.data.palabra.split(/\s+/))
    .join("tspan")
    .attr("x", 0)
    .attr("dy", (word, i) => i === 0 ? 0 : "1.1em")
    .attr("font-size", d => "10px")
    .text(d => d)
    .attr("fill", "#fff");
  
  chartContainer2.append(svg.node());
}

function graficoRedIntencionalidad() {
  limpiarGrafico2();

  const width = 650;
  const height = 420;
  const nodes = [
    {id: "Derechos humanos", group: "propuesta", frecuencia: 99},
    {id: "Perspectiva de género", group: "propuesta", frecuencia: 43},
    {id: "Acceso a la justicia", group: "propuesta", frecuencia: 18},
    {id: "Transparencia", group: "propuesta", frecuencia: 13},
    {id: "Capacitación", group: "propuesta", frecuencia: 12},
    {id: "Base humanista", group: "contexto"},
    {id: "Igualdad institucional", group: "contexto"},
    {id: "Víctimas y grupos vulnerables", group: "contexto"},
    {id: "Rendición de cuentas", group: "contexto"},
    {id: "Operadores judiciales", group: "contexto"},
    {id: "Sensibilidad social", group: "intencion"},
    {id: "Criterios de igualdad", group: "intencion"},
    {id: "Justicia inclusiva", group: "intencion"},
    {id: "Honestidad pública", group: "intencion"},
    {id: "Reforma interna", group: "intencion"}
  ];

  const links = [
    {source: "Derechos humanos", target: "Base humanista"},
    {source: "Base humanista", target: "Sensibilidad social"},
    {source: "Perspectiva de género", target: "Igualdad institucional"},
    {source: "Igualdad institucional", target: "Criterios de igualdad"},
    {source: "Acceso a la justicia", target: "Víctimas y grupos vulnerables"},
    {source: "Víctimas y grupos vulnerables", target: "Justicia inclusiva"},
    {source: "Transparencia", target: "Rendición de cuentas"},
    {source: "Rendición de cuentas", target: "Honestidad pública"},
    {source: "Capacitación", target: "Operadores judiciales"},
    {source: "Operadores judiciales", target: "Reforma interna"}
  ];

  const colorScale = d3.scaleOrdinal()
    .domain(["propuesta", "contexto", "intencion"])
    .range(["#1b75bb", "#652d90", "#fbbf24"]);

  const radius = d => d.group === "propuesta" ? Math.sqrt(d.frecuencia || 12) * 4 + 8 : 22;

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background", "none");

  const link = svg.append("g")
    .attr("stroke", "rgba(255,255,255,0.18)")
    .attr("stroke-width", 1.5)
    .selectAll("line")
    .data(links)
    .join("line");

  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  node.append("circle")
    .attr("r", d => radius(d))
    .attr("fill", d => colorScale(d.group))
    .attr("stroke", "rgba(255,255,255,0.22)")
    .attr("stroke-width", 2);

  node.append("text")
    .attr("class", "network-label")
    .attr("text-anchor", "middle")
    .attr("dy", d => d.group === "propuesta" ? 4 : 4)
    .attr("font-size", d => d.group === "propuesta" ? "11px" : "10px")
    .attr("font-weight", d => d.group === "propuesta" ? 700 : 500)
    .attr("fill", "#fff")
    .style("pointer-events", "none")
    .text(d => d.id);

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.source.group === "contexto" && d.target.group === "intencion" ? 140 : 120))
    .force("charge", d3.forceManyBody().strength(-240))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX(d => {
      if (d.group === "propuesta") return width * 0.18;
      if (d.group === "contexto") return width * 0.52;
      return width * 0.84;
    }).strength(0.12))
    .force("y", d3.forceY(height / 2).strength(0.08))
    .force("collide", d3.forceCollide(d => radius(d) + 6));

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node.attr("transform", d => `translate(${Math.max(40, Math.min(width - 40, d.x))},${Math.max(40, Math.min(height - 40, d.y))})`);
  });

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  chartContainer2.append(svg.node());
}

const funcionesGraficos2 = [
  graficoVinculantes,
  graficoTemasJuridicos,
  graficoTecnicoPolitico,
  graficoGenero,
  graficoPalabras,
  graficoRedIntencionalidad
];

function activarEscena2(index) {
  pasos2.forEach((paso, i) => paso.classList.toggle("activo", i === index));
  
  const escena = escenas2[index] || escenas2[0];
  rotuloEtapa2.textContent = escena.etiqueta;
  rotuloTitulo2.textContent = escena.titulo;
  barraProgreso2.style.width = `${((index + 1) / pasos2.length) * 100}%`;
  
  const funcion = funcionesGraficos2[index] || funcionesGraficos2[0];
  funcion();
}

function actualizarProgreso2() {
  if (!relato2) return;
  
  const inicio = relato2.offsetTop;
  const final = relato2.offsetTop + relato2.offsetHeight - window.innerHeight;
  if (final <= inicio) return;
  
  const avance = (window.scrollY - inicio) / (final - inicio);
  const porcentaje = Math.min(100, Math.max(0, avance * 100));
  barraProgreso2.style.width = `${porcentaje}%`;
}

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = pasos2.indexOf(entry.target);
        if (index >= 0) {
          activarEscena2(index);
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.55
  }
);

pasos2.forEach((paso) => observer2.observe(paso));
window.addEventListener("scroll", actualizarProgreso2, { passive: true });

activarEscena2(0);
