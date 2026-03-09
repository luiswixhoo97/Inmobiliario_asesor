<template>
  <section id="asesor" ref="sectionRef" class="advisor-pres-section relative flex min-h-screen overflow-hidden bg-off-white md:flex-row">
    <!-- Carrusel: en móvil fondo completo, en desktop mitad izquierda -->
    <div class="advisor-pres-carousel absolute inset-0 overflow-hidden md:relative md:inset-auto md:h-auto md:w-1/2">
      <div
        v-for="(slide, i) in carouselSlides"
        :key="i"
        class="absolute inset-0 transition-opacity duration-700"
        :class="{ 'opacity-100 z-10': currentSlide === i, 'opacity-0 z-0': currentSlide !== i }"
      >
        <img
          :src="slide.src"
          :alt="slide.alt"
          class="h-full w-full object-cover"
        />
      </div>
      <!-- Overlay oscuro solo en móvil para legibilidad del texto -->
      <div class="absolute inset-0 z-20 bg-black/50 md:hidden" aria-hidden="true" />
    </div>

    <!-- Texto: en móvil superpuesto sobre la imagen, en desktop mitad derecha -->
    <div class="advisor-pres-text-wrap relative z-30 flex min-h-screen flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-8 sm:py-14 md:min-h-0 md:px-12 md:py-24 lg:px-16">
      <div ref="textSideRef" class="advisor-pres-text space-y-8 sm:space-y-10 md:space-y-16">
        <p class="advisor-pres-line advisor-pres-line--1">
          LA MEJOR <em class="advisor-pres-em">PLUSVALÍA</em>
        </p>
        <p class="advisor-pres-line advisor-pres-line--2">
          <em class="advisor-pres-em">ASESORAMIENTO</em> PROFESIONAL
        </p>
        <p class="advisor-pres-line advisor-pres-line--3">
          OPINIÓN <em class="advisor-pres-em">DE VALOR</em>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.advisor-pres-text {
  font-family: var(--font-display);
  letter-spacing: 0.02em;
}
/* En móvil el texto va sobre la imagen: blanco para contraste */
@media (max-width: 767px) {
  .advisor-pres-text-wrap .advisor-pres-line { color: #fff; }
  .advisor-pres-text-wrap .advisor-pres-em { color: var(--color-blue-light, #36A9E1); }
}
.advisor-pres-line {
  font-size: clamp(1.125rem, 5vw, 1.5rem);
  font-weight: 700;
  color: var(--color-gray-card);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.3;
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  word-break: break-word;
}
@media (min-width: 640px) {
  .advisor-pres-line { font-size: clamp(1.35rem, 4vw, 1.75rem); letter-spacing: 0.06em; }
}
@media (min-width: 768px) {
  .advisor-pres-line { font-size: clamp(1.75rem, 3vw, 2.75rem); letter-spacing: 0.08em; transform: translateX(60px); }
}
@media (min-width: 1024px) {
  .advisor-pres-line { font-size: clamp(2rem, 2.5vw, 3rem); letter-spacing: 0.1em; }
}
.advisor-pres-line--1 { transition-delay: 0.1s; }
.advisor-pres-line--2 { transition-delay: 0.28s; }
.advisor-pres-line--3 { transition-delay: 0.46s; }
.advisor-pres-section.advisor-pres-visible .advisor-pres-line {
  opacity: 1;
  transform: translateX(0);
}

.advisor-pres-em {
  position: relative;
  font-style: italic;
  font-weight: 700;
  color: var(--color-blue, #1D71B8);
}
.advisor-pres-em::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, transparent, var(--color-blue, #1D71B8), transparent);
  background-size: 200% 100%;
  animation: advisor-underline 2.2s ease-in-out infinite;
}
@keyframes advisor-underline {
  0%, 100% { background-position: 100% 0; }
  50% { background-position: 0% 0; }
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import heroImg1 from '../assets/hero/IMG_6171.jpg'
import heroImg2 from '../assets/hero/2025-11-29-13-21-20-182.jpg'
import heroImg3 from '../assets/hero/IMG_9996.jpg'
import heroImg4 from '../assets/hero/ValleReal_SC_3061-101.jpg'
import heroImg5 from '../assets/hero/DJI_0050.JPG'
import heroImg6 from '../assets/hero/DJI_0610 (1).jpg'

const sectionRef = ref(null)
const textSideRef = ref(null)
const currentSlide = ref(0)
let observer = null
let carouselInterval = null

const carouselSlides = [
  { src: heroImg1, alt: 'Propiedad' },
  { src: heroImg2, alt: 'Inmobiliaria' },
  { src: heroImg3, alt: 'Desarrollo' },
  { src: heroImg4, alt: 'Valle Real' },
  { src: heroImg5, alt: 'Vista aérea' },
  { src: heroImg6, alt: 'Proyecto' },
]

function goNext() {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

onMounted(() => {
  const section = sectionRef.value
  if (!section) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add('advisor-pres-visible')
          carouselInterval = setInterval(goNext, 4500)
        } else {
          if (carouselInterval) {
            clearInterval(carouselInterval)
            carouselInterval = null
          }
        }
      })
    },
    { threshold: 0.2 }
  )
  observer.observe(section)
})

onUnmounted(() => {
  observer?.disconnect()
  if (carouselInterval) clearInterval(carouselInterval)
})
</script>
