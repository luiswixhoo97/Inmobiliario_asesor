<template>
  <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 z-0" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []

const PARTICLE_COUNT = 40
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

onMounted(() => {
  if (isMobile) return

  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth
    canvas.height = canvas.parentElement.offsetHeight
  }

  resize()
  window.addEventListener('resize', resize)

  const goldColors = [
    'rgba(212, 175, 55, ',
    'rgba(198, 165, 90, ',
    'rgba(245, 215, 122, ',
    'rgba(184, 148, 46, ',
  ]

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.x += p.speedX
      p.y += p.speedY
      p.pulse += p.pulseSpeed

      const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse))

      if (p.x < -10) p.x = canvas.width + 10
      if (p.x > canvas.width + 10) p.x = -10
      if (p.y < -10) p.y = canvas.height + 10
      if (p.y > canvas.height + 10) p.y = -10

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color + currentOpacity + ')'
      ctx.fill()
    }

    animationId = requestAnimationFrame(animate)
  }

  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})
</script>
