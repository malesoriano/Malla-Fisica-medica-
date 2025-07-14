document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");
  materias.forEach((materia) => {
    materia.addEventListener("click", () => {
      // Cambiar estado a "aprobada"
      materia.dataset.estado = "aprobada";
      materia.classList.remove("cursando", "pendiente");
      materia.classList.add("aprobada");

      // Revisar qué materias se pueden desbloquear
      desbloquearMaterias();
      mostrarInfo(materia);
    });
  });

  desbloquearMaterias(); // Llamar al cargar por si hay materias ya aprobadas
});

function desbloquearMaterias() {
  const materias = document.querySelectorAll(".materia");
  materias.forEach((materia) => {
    const correlativas = materia.dataset.correlativas;
    if (!correlativas) return;

    const codigos = correlativas.split(",").map(c => c.trim());
    const aprobadas = codigos.every(codigo => {
      const correlativa = document.querySelector(`.materia[data-codigo="${codigo}"]`);
      return correlativa && correlativa.dataset.estado === "aprobada";
    });

    if (aprobadas && materia.dataset.estado === "pendiente") {
      materia.classList.add("desbloqueada");
    }
  });
}

function mostrarInfo(element) {
  const nombre = element.dataset.nombre;
  const codigo = element.dataset.codigo;
  const estado = element.dataset.estado;
  const correlativas = element.dataset.correlativas || "Ninguna";

  const infoBox = document.getElementById("infoBox");
  infoBox.innerHTML = `
    <h3>${nombre} (${codigo})</h3>
    <p><strong>Estado:</strong> ${estado}</p>
    <p><strong>Correlativas:</strong> ${correlativas}</p>
  `;
  infoBox.style.display = "block";
}
