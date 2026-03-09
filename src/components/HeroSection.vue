<template>
  <section
    id="inicio"
    ref="heroRef"
    class="relative flex min-h-screen items-center overflow-hidden bg-off-white"
  >
    <div class="absolute inset-0 z-[1]">
      <div class="relative h-full w-full">
        <div
          v-for="(slide, i) in heroSlides"
          :key="i"
          class="hero-slide absolute inset-0 transition-opacity duration-1000"
          :class="{ 'opacity-100': activeSlide === i, 'opacity-0': activeSlide !== i }"
        >
          <img
            :src="slide.image"
            :alt="slide.title"
            class="h-full w-full object-cover"
          />
        </div>
        <!-- Sombra suave del carrusel (reducida) -->
        <div class="absolute inset-0 bg-gradient-to-r from-black-deep/45 via-black-deep/25 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-t from-black-deep/35 via-transparent to-black-deep/15" />
      </div>
    </div>

    <div class="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-20">
      <img
        :src="logoFinca"
        alt="Finca Inmobiliaria"
        class="h-24 w-auto object-contain md:h-32 lg:h-40"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import heroImg1 from '../assets/hero/IMG_6171.jpg'
import heroImg2 from '../assets/hero/2025-11-29-13-21-20-182.jpg'
import heroImg3 from '../assets/hero/IMG_9996.jpg'
import heroImg4 from '../assets/hero/ValleReal_SC_3061-101.jpg'
import heroImg5 from '../assets/hero/DJI_0050.JPG'
import heroImg6 from '../assets/hero/DJI_0610 (1).jpg'
import logoFinca from '../assets/images/LOGO-FINCA.png'

const heroRef = ref(null)
const activeSlide = ref(0)

const heroSlides = [
  { image: heroImg1, title: 'Propiedad exclusiva' },
  { image: heroImg2, title: 'Inversión inmobiliaria' },
  { image: heroImg3, title: 'Residencia premium' },
  { image: heroImg4, title: 'Valle Real' },
  { image: heroImg5, title: 'Vista aérea' },
  { image: heroImg6, title: 'Desarrollo inmobiliario' },
]

let slideInterval = null

onMounted(() => {
  slideInterval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % heroSlides.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(slideInterval)
})
</script>
