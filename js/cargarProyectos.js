fetch('proyectos.xml')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const proyectos = xml.getElementsByTagName("proyecto");
    const contenedor = document.getElementById("contenedor-proyectos");

    for (let proyecto of proyectos) {
      const titulo = proyecto.getElementsByTagName("titulo")[0].textContent;
      const tecnologiasText = proyecto.getElementsByTagName("tecnologias")[0].textContent;
      const descripcion = proyecto.getElementsByTagName("descripcion")[0].textContent;
      const link = proyecto.getElementsByTagName("link")[0].textContent;
      const estado = proyecto.getElementsByTagName("estado")[0]?.textContent || "";

      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta";
      tarjeta.setAttribute("tabindex", "0");
      tarjeta.setAttribute("aria-label", `Proyecto ${titulo}`);

      const h2 = document.createElement("h2");
      h2.textContent = titulo;
      h2.setAttribute("tabindex", "0");
      tarjeta.appendChild(h2);

      const tecnologiasCont = document.createElement("div");
      tecnologiasCont.classList.add("tecnologias");
      tecnologiasCont.setAttribute("tabindex", "0");
      tecnologiasCont.setAttribute("aria-label", `Tecnologías usadas en ${titulo}`);
      const tecnologias = tecnologiasText.split(",").map(t => t.trim());
      tecnologias.forEach(tech => {
        const icono = document.createElement("img");
        icono.alt = tech;
        icono.title = tech;
        icono.src = obtenerIconoTecnologia(tech);
        icono.width = 24;
        icono.height = 24;
        icono.style.marginRight = "0.4rem";
        tecnologiasCont.appendChild(icono);
      });
      tarjeta.appendChild(tecnologiasCont);

      const descripcionP = document.createElement("p");
      descripcionP.textContent = descripcion;
      descripcionP.setAttribute("tabindex", "0");
      tarjeta.appendChild(descripcionP);

      const estadoSpan = document.createElement("span");
      estadoSpan.classList.add("estado", estadoClase(estado));
      estadoSpan.textContent = estado;
      estadoSpan.setAttribute("tabindex", "0");
      estadoSpan.setAttribute("aria-label", `Estado del proyecto: ${estado}`);
      tarjeta.appendChild(estadoSpan);

      const enlace = document.createElement("a");
      enlace.href = link;
      enlace.target = "_blank";
      enlace.rel = "noopener";
      enlace.setAttribute("aria-label", `Ver ${titulo} en GitHub`);
      enlace.setAttribute("tabindex", "0");
      enlace.textContent = "Ver en GitHub";
      tarjeta.appendChild(enlace);

      contenedor.appendChild(tarjeta);
    }
  })
  .catch(error => console.error("Error al cargar el XML:", error));

function obtenerIconoTecnologia(nombre) {
  const tecnologias = {
    "Java": "img/java.png",
    "CSS": "img/css.png",
    "SQL": "img/mysql.png",
    "HTML": "img/html.png",
    "JavaScript": "img/javaScript.png",
    "Oracle SQL": "img/sql.png",
    "MongoDB": "img/mongo.png",
  };
  return tecnologias[nombre] || "iconos/default.svg";
}

function estadoClase(estado) {
  switch (estado.toLowerCase()) {
    case "finalizado": return "completado";
    case "en proceso": return "en-proceso";
    case "prototipo": return "prototipo";
    default: return "";
  }
}
