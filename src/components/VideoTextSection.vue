<template>
  <section ref="sectionRef" class="relative flex min-h-screen w-full overflow-hidden">
    <!-- Fondo: video (preload y capa GPU para mantener calidad) -->
    <div class="video-bg-wrap absolute inset-0 min-h-full min-w-full">
      <video
        ref="videoRef"
        :src="videoSrc"
        class="video-bg"
        loop
        muted
        playsinline
        preload="auto"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-black/50" aria-hidden="true" />
    </div>

    <!-- Contenido: texto superpuesto -->
    <div class="relative z-10 flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-20">
      <!-- Año y ubicación en los extremos -->
      <div class="absolute left-6 top-1/2 -translate-y-1/2 font-sans text-sm tracking-wider text-white/90 md:left-12 md:text-base">
        MMXXII
      </div>
      <div class="absolute right-6 top-1/2 -translate-y-1/2 font-sans text-sm tracking-wider text-white/90 md:right-12 md:text-base">
        MÉXICO
      </div>

      <!-- Bloque central: título, párrafo, red social -->
      <div class="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <h2 class="font-display text-4xl font-normal text-white md:text-5xl lg:text-6xl">
          Cambiemos el juego.
        </h2>
        <p class="max-w-2xl font-sans text-base leading-relaxed text-white/95 md:text-lg">
          SOMOS PARTE DE LA EVOLUCIÓN, CONOCEMOS EL<br />
          PODER DEL CAMBIO Y EL ALCANCE DE UNA IDEA.<br />
          COLUMNA ES LA INMOBILIARIA QUE EVOLUCIONA EL<br />
          RUBRO DEL REAL ESTATE EN MÉXICO.
        </p>
        <p class="font-sans text-sm tracking-wide text-white/90 md:text-base">
          @FINCA
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import videoSrc from '../assets/images/inmu2.mp4'
const sectionRef = ref(null)
const videoRef = ref(null)

let observer = null

onMounted(() => {
  const section = sectionRef.value
  const video = videoRef.value
  if (!section || !video) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    },
    { threshold: 0.25 }
  )
  observer.observe(section)
})

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.video-bg-wrap {
  min-height: 100vh;
  min-width: 100%;
}
.video-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>
