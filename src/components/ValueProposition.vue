<template>
  <section id="servicios" ref="sectionRef" class="value-prop-section relative flex min-h-screen items-center overflow-hidden bg-off-white py-24 md:py-36">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:gap-16 lg:gap-20">
      <!-- Texto izquierda -->
      <p class="value-prop-text value-prop-text--left whitespace-nowrap font-sans text-3xl font-medium tracking-wide text-gray-card uppercase md:text-4xl lg:text-5xl xl:text-6xl md:flex-1 md:text-right">
        <span class="value-prop-line">MÁS ALLÁ QUE</span>
      </p>

      <!-- Video central -->
      <div class="relative w-full max-w-2xl shrink-0 overflow-hidden rounded-sm md:max-w-xl lg:max-w-2xl">
        <video
          ref="videoRef"
          :src="fondoVideo"
          class="aspect-4/3 w-full object-cover"
          loop
          muted
          playsinline
          aria-label="Fondo inmobiliario"
        ></video>
      </div>

      <!-- Texto derecha -->
      <p class="value-prop-text value-prop-text--right whitespace-nowrap font-sans text-3xl font-medium tracking-wide text-gray-card uppercase md:text-4xl lg:text-5xl xl:text-6xl md:flex-1 md:text-left">
        <span class="value-prop-line">UN REAL ESTATE</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.value-prop-text {
  opacity: 0;
  transform: translateX(0) scale(0.92);
  transition:
    opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
    transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.value-prop-text--left {
  transform: translateX(-80px) scale(0.96);
  transition-delay: 0s;
}
.value-prop-text--right {
  transform: translateX(80px) scale(0.96);
  transition-delay: 0.15s;
}
.value-prop-section.value-prop-visible .value-prop-text--left {
  opacity: 1;
  transform: translateX(0) scale(1);
  transition-delay: 0.1s;
}
.value-prop-section.value-prop-visible .value-prop-text--right {
  opacity: 1;
  transform: translateX(0) scale(1);
  transition-delay: 0.25s;
}

.value-prop-line {
  position: relative;
  display: inline-block;
}
.value-prop-line::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, transparent, var(--color-blue, #1D71B8), transparent);
  background-size: 200% 100%;
  animation: value-prop-underline 2s ease-in-out infinite;
}
@keyframes value-prop-underline {
  0%, 100% { background-position: 100% 0; }
  50% { background-position: 0% 0; }
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import fondoVideo from '../assets/images/fondo_in.mp4'

const sectionRef = ref(null)
const videoRef = ref(null)
let observer = null

onMounted(() => {
  const video = videoRef.value
  const section = sectionRef.value
  if (!video || !section) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
          section.classList.add('value-prop-visible')
        } else {
          video.pause()
        }
      })
    },
    { threshold: 0.25, rootMargin: '0px' }
  )
  observer.observe(section)
})

onUnmounted(() => {
  observer?.disconnect()
  videoRef.value?.pause()
})
</script>
