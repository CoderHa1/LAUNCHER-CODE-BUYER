const gameCodes = {
  "CUBER": "CUBER",
  "KREKO": "KREKO",
  "GARSGOR": "GARSGOR",
  // Add more if needed
};

const showCodeBtn = document.getElementById("showCodeBtn");
const gameSelect = document.getElementById("gameSelect");
const codeReveal = document.getElementById("codeReveal");
const codeText = document.getElementById("codeText");

showCodeBtn.addEventListener("click", () => {
  const selectedCode = gameSelect.value;
  if (!selectedCode) {
    alert("Please select a game first!");
    return;
  }

  // Animate code reveal with a delay
  codeReveal.classList.remove("hidden");
  codeText.innerText = "";

  // Glitch & flicker effect triggered by class in CSS already

  // Reveal code letter by letter with glitch effect
  let index = 0;
  const codeStr = selectedCode;
  const revealInterval = setInterval(() => {
    if (index < codeStr.length) {
      codeText.innerText += codeStr[index];
      index++;
    } else {
      clearInterval(revealInterval);
      // You can add sparkles/confetti trigger here!
      launchConfetti();
    }
  }, 200);
});

// Simple confetti animation using canvas
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confettiPieces.push({
      x: randomRange(0, canvas.width),
      y: randomRange(-canvas.height, 0),
      size: randomRange(5, 10),
      speed: randomRange(1, 4),
      color: `hsl(${randomRange(180, 220)}, 100%, 70%)`,
      tilt: randomRange(-10, 10),
      tiltSpeed: randomRange(0.1, 0.5),
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.moveTo(p.x + p.tilt, p.y);
    ctx.lineTo(p.x + p.tilt + p.size / 2, p.y + p.size);
    ctx.lineTo(p.x + p.tilt - p.size / 2, p.y + p.size);
    ctx.closePath();
    ctx.fill();

    p.y += p.speed;
    p.tilt += p.tiltSpeed;

    if (p.y > canvas.height) {
      p.x = randomRange(0, canvas.width);
      p.y = randomRange(-canvas.height, 0);
      p.tilt = randomRange(-10, 10);
    }
  });
  requestAnimationFrame(drawConfetti);
}

function launchConfetti() {
  createConfetti();
  drawConfetti();
}
