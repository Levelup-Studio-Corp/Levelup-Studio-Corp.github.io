/* particle-bg.js
   LevelUp Studio 공용 파티클 배경
   사용법: 모든 페이지의 </body> 직전에 아래 한 줄만 추가
   <script src="particle-bg.js"></script>
*/
(function () {
  // 1. 스타일 주입 (canvas, gradient)
  const style = document.createElement("style");
  style.textContent = `
    canvas#bg{position:fixed;top:0;left:0;z-index:-2;}
    div.gradient{position:fixed;width:100%;height:100%;background:radial-gradient(circle at 50% 20%,rgba(0,140,255,0.25),transparent 60%);z-index:-1;}
  `;
  document.head.appendChild(style);

  // 2. DOM 요소 주입 (canvas, gradient)
  const canvas = document.createElement("canvas");
  canvas.id = "bg";
  const gradient = document.createElement("div");
  gradient.className = "gradient";
  document.body.prepend(gradient);
  document.body.prepend(canvas);

  // 3. 파티클 로직
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.fillStyle = "rgba(0,160,255,.6)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 150; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();
