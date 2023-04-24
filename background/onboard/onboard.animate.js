export function initParticleAnimation() {
  let canvas, ctx, mouse, particles;
  let gravityStrength = 10,
    spawnTimer = 0,
    spawnInterval = 10,
    type = 0;
  let time = 0;

  function newParticle() {
    type = type ? 0 : 1;
    particles.push({
      x: mouse.x,
      y: mouse.y,
      xv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
      yv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
      c: type
        ? `rgb(255,${(200 * Math.random()) | 0},${(80 * Math.random()) | 0})`
        : "rgb(255,255,255)",
      s: type ? 5 + 10 * Math.random() : 1,
      a: 1,
    });
  }

  function startLoop(newTime) {
    time = newTime;
    requestAnimationFrame(loop);
  }

  function loop(newTime) {
    draw();
    calculate(newTime);
    requestAnimationFrame(loop);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  function calculate(newTime) {
    const dt = newTime - time;
    time = newTime;

    if (!mouse.out) {
      spawnTimer += dt < 100 ? dt : 100;
      while (spawnTimer > 0) {
        newParticle();
        spawnTimer -= spawnInterval;
      }
    }

    const particleOverflow = particles.length - 700;
    if (particleOverflow > 0) {
      particles.splice(0, particleOverflow);
    }

    particles.forEach((p) => {
      if (!mouse.out) {
        const x = mouse.x - p.x;
        const y = mouse.y - p.y;
        let a = x * x + y * y;
        a = a > 100 ? gravityStrength / a : gravityStrength / 100;
        p.xv = (p.xv + a * x) * 0.99;
        p.yv = (p.yv + a * y) * 0.99;
      }
      p.x += p.xv;
      p.y += p.yv;
      p.a *= 0.99;
    });
  }

  function init() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    onresize = resize;
    resize();

    mouse = { x: canvas.width / 2, y: canvas.height / 2, out: false };

    canvas.onmouseout = function () {
      mouse.out = true;
    };

    canvas.onmousemove = function (e) {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        out: false,
      };
    };

    particles = [];

    requestAnimationFrame(startLoop);
  }

  window.onload = function () {
    setTimeout(init, 0);
  };
}
