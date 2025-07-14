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
