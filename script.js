let angle = 0; // ângulo inicial
let animationId;

document.getElementById('drawPolygon').addEventListener('click', function () {
  const sides = parseInt(document.getElementById('sides').value);
  const radius = parseInt(document.getElementById('radiusInput').value);
  const rotationPoint = document
    .getElementById('rotationPoint')
    .value.split(',')
    .map(Number);

  if (
    sides < 3 ||
    rotationPoint.length !== 2 ||
    isNaN(rotationPoint[0]) ||
    isNaN(rotationPoint[1])
  ) {
    alert(
      'Por favor, insira um número válido de lados (>= 3) e um ponto de rotação válido.',
    );
    return;
  }

  // Inicia a animação
  startAnimation(sides, radius, rotationPoint);
});

function startAnimation(sides, radius, rotationPoint) {
  angle = 0; // Reseta o ângulo
  if (animationId) {
    cancelAnimationFrame(animationId); // Cancela a animação anterior
  }

  function draw() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha os eixos X e Y
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();

    // Calcula os vértices do polígono
    const vertices = [];
    const angleIncrement = (2 * Math.PI) / sides;

    for (let i = 0; i < sides; i++) {
      const vertexAngle = angleIncrement * i + angle; // Adiciona o ângulo de rotação
      const x = rotationPoint[0] + radius * Math.cos(vertexAngle);
      const y = rotationPoint[1] + radius * Math.sin(vertexAngle);
      vertices.push({ x, y });
    }

    // Desenha o polígono
    ctx.beginPath();
    ctx.moveTo(
      vertices[0].x + canvas.width / 2,
      -vertices[0].y + canvas.height / 2,
    );
    vertices.forEach((vertex) => {
      ctx.lineTo(vertex.x + canvas.width / 2, -vertex.y + canvas.height / 2);
    });
    ctx.closePath();
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Atualiza o ângulo para a próxima frame
    angle += 0.01; // Velocidade de rotação
    animationId = requestAnimationFrame(draw);
  }

  draw(); // Inicia a animação
}
