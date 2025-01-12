const canvas = document.getElementById('asciiCanvas');
const ctx = canvas.getContext('2d');

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 문자 데이터와 설정
const charset = "ABCDEFGHIキムJKLMNOPQRネットSTUVWXYZケンユウ1234567건890!@#$%^&*()_+アカサタ우ナマハヲワト";
const fontSize = 10;
const particles = [];

// 입자 개수
const particleCount = 500;

// 파티클 초기화
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width, // 초기 X 위치
    y: Math.random() * canvas.height, // 초기 Y 위치
    z: Math.random() * canvas.width, // 초기 Z 위치 (깊이)
    size: Math.random() * 1.5 + 0.5, // 크기
    speed: Math.random() * 2 + 1, // 더 빠른 속도
    char: charset[Math.floor(Math.random() * charset.length)], // 랜덤 문자
  });
}

function draw() {
  // 잔상 효과를 위한 배경 덮기 (투명도 설정)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // 더 긴 잔상을 위한 낮은 투명도
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 각 파티클 업데이트 및 그리기
  particles.forEach(particle => {
    // Z축 이동으로 깊이 효과
    particle.z -= particle.speed;
    if (particle.z <= 0) {
      particle.z = canvas.width; // Z축을 리셋
      particle.x = Math.random() * canvas.width; // X 재설정
      particle.y = Math.random() * canvas.height; // Y 재설정
    }

    // 3D 투영
    const perspective = canvas.width / (canvas.width + particle.z);
    const x = (particle.x - canvas.width / 2) * perspective + canvas.width / 2;
    const y = (particle.y - canvas.height / 2) * perspective + canvas.height / 2;
    const size = particle.size * perspective;
    const alpha = perspective; // Z축에 따라 투명도 조절

    // 문자 스타일 설정
    ctx.fillStyle = `rgba(0, 255, 204, ${alpha})`;
    ctx.font = `${size * fontSize}px 'Courier New'`;
    ctx.fillText(particle.char, x, y);
  });
}

// 최적화된 애니메이션 루프
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// 창 크기 변경 시 캔버스 크기 조정
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();
