const canvas = document.getElementById("armCanvas");
const ctx = canvas.getContext("2d");

const angle1Slider = document.getElementById("angle1");
const angle2Slider = document.getElementById("angle2");
const angle3Slider = document.getElementById("angle3");

const angle1Val = document.getElementById("angle1Val");
const angle2Val = document.getElementById("angle2Val");
const angle3Val = document.getElementById("angle3Val");

const resetBtn = document.getElementById("resetBtn");
const animateBtn = document.getElementById("animateBtn");

let link1Length = 120;
let link2Length = 100;
let effectorLength = 40;

function drawArm(angle1, angle2, angle3) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const baseX = canvas.width / 2;
  const baseY = canvas.height - 50;

  // Link 1
  const x1 = baseX + link1Length * Math.cos(angle1 * Math.PI / 180);
  const y1 = baseY - link1Length * Math.sin(angle1 * Math.PI / 180);

  // Link 2
  const x2 = x1 + link2Length * Math.cos((angle1 + angle2) * Math.PI / 180);
  const y2 = y1 - link2Length * Math.sin((angle1 + angle2) * Math.PI / 180);

  // End Effector
  const x3 = x2 + effectorLength * Math.cos((angle1 + angle2 + angle3) * Math.PI / 180);
  const y3 = y2 - effectorLength * Math.sin((angle1 + angle2 + angle3) * Math.PI / 180);

  ctx.lineWidth = 8;
  ctx.strokeStyle = "black";

  // Link 1
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  // Link 2
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // End Effector
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  // End Effector circle
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x3, y3, 10, 0, 2 * Math.PI);
  ctx.fill();
}

function updateArm() {
  const angle1 = parseInt(angle1Slider.value);
  const angle2 = parseInt(angle2Slider.value);
  const angle3 = parseInt(angle3Slider.value);

  angle1Val.textContent = angle1;
  angle2Val.textContent = angle2;
  angle3Val.textContent = angle3;

  drawArm(angle1, angle2, angle3);
}

angle1Slider.addEventListener("input", updateArm);
angle2Slider.addEventListener("input", updateArm);
angle3Slider.addEventListener("input", updateArm);

resetBtn.addEventListener("click", () => {
  angle1Slider.value = 75;
  angle2Slider.value = -56;
  angle3Slider.value = 0;
  updateArm();
});

animateBtn.addEventListener("click", () => {
  let step = 0;
  const interval = setInterval(() => {
    angle1Slider.value = 75 + Math.sin(step / 10) * 30;
    angle2Slider.value = -56 + Math.cos(step / 15) * 60;
    angle3Slider.value = Math.sin(step / 20) * 90;
    updateArm();
    step++;
    if (step > 200) clearInterval(interval);
  }, 50);
});

// Inicializa
updateArm();
