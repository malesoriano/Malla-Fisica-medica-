document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  // Cargar estados guardados
  const estadoGuardado = JSON.parse(localStorage.getItem("estadoMaterias")) || {};
  materias.forEach((materia) => {
    const codigo = materia.dataset.codigo;
    const estado = estadoGuardado[codigo];
    if (estado === "aprobada") {
      materia.dataset.estado = "aprobada";
      materia.classList.add("aprobada");
    }
  });

  desbloquearMaterias();

  materias.forEach((materia) => {
    materia.addEventListener("click", () => {
      if (!materia.classList.contains("desbloqueada") && !materia.classList.contains("aprobada")) return;

      const codigo = materia.dataset.codigo;
      materia.dataset.estado = "aprobada";
      materia.classList.remove("desbloqueada");
      materia.classList.add("aprobada");

      // Guardar estado
      estadoGuardado[codigo] = "aprobada";
      localStorage.setItem("estadoMaterias", JSON.stringify(estadoGuardado));

      desbloquearMaterias();
      mostrarInfo(materia);
    });
  });
});

function desbloquearMaterias() {
  const materias = document.querySelectorAll(".materia");

  materias.forEach((materia) => {
    if (materia.dataset.estado === "aprobada") return;

    const correlativas = materia.dataset.correlativas;
    if (!correlativas) {
      materia.classList.add("desbloqueada");
      return;
    }

    const codigos = correlativas.split(",").map(c => c.trim());
    const aprobadas = codigos.every(codigo => {
      const correlativa = document.querySelector(`.materia[data-codigo="${codigo}"]`);
      return correlativa && correlativa.dataset.estado === "aprobada";
    });

    if (aprobadas) {
      materia.classList.add("desbloqueada");
    }
  });
}

function mostrarInfo(element) {
  const nombre = element.dataset.nombre;
  const codigo = element.dataset.codigo;
  const estado = element.dataset.estado || "pendiente";
  const correlativas = element.dataset.correlativas || "Ninguna";

  const infoBox = document.getElementById("infoBox");
  infoBox.innerHTML = `
    <h3>${nombre} (${codigo})</h3>
    <p><strong>Estado:</strong> ${estado}</p>
    <p><strong>Correlativas:</strong> ${correlativas}</p>
  `;
  infoBox.style.display = "block";
}
