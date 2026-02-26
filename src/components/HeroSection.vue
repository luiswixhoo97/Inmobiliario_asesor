<template>
  <section
    id="inicio"
    ref="heroRef"
    class="noise-overlay relative flex min-h-screen items-center overflow-hidden"
  >
    <GoldParticles />

    <div class="absolute inset-0 z-[1]">
      <div class="relative h-full w-full">
        <div
          v-for="(slide, i) in heroSlides"
          :key="i"
          ref="slidesRef"
          class="hero-slide absolute inset-0 transition-opacity duration-1000"
          :class="{ 'opacity-100': activeSlide === i, 'opacity-0': activeSlide !== i }"
        >
          <img
            :src="slide.image"
            :alt="slide.title"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-black-deep/95 via-black-deep/70 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-t from-black-deep/60 via-transparent to-black-deep/30" />
      </div>
    </div>

    <div class="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-20 lg:px-12">
      <div class="max-w-2xl">
        <p
          ref="subtitleTopRef"
          class="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold opacity-0"
        >
          Asesor Inmobiliario Premium
        </p>

        <h1 ref="titleRef" class="font-display text-4xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl xl:text-7xl">
          <span
            v-for="(word, i) in titleWords"
            :key="i"
            class="split-word inline-block mr-[0.3em]"
            :class="{ 'gold-gradient-text': [3, 4].includes(i) }"
          >{{ word }}</span>
        </h1>

        <svg ref="heroLineRef" class="my-6" width="200" height="4">
          <line
            ref="heroSvgLine"
            x1="0" y1="2" x2="200" y2="2"
            stroke="url(#heroGold)"
            stroke-width="2"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#B8942E" />
              <stop offset="50%" stop-color="#F5D77A" />
              <stop offset="100%" stop-color="#B8942E" />
            </linearGradient>
          </defs>
        </svg>

        <p ref="descRef" class="mb-8 max-w-lg text-lg leading-relaxed text-gray-muted opacity-0 md:text-xl">
          Transformo tu visión en inversiones inmobiliarias estratégicas con resultados excepcionales.
        </p>

        <div ref="ctaRef" class="flex flex-wrap gap-4 opacity-0">
          <GoldButton href="#contacto">
            Agenda una Asesoría
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </GoldButton>
          <a
            href="#propiedades"
            class="inline-flex items-center gap-2 rounded-sm border border-gold/30 px-8 py-4 font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/5"
          >
            Ver Propiedades
          </a>
        </div>
      </div>
    </div>

    <div ref="scrollIndicator" class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 opacity-0">
      <div class="flex flex-col items-center gap-2">
        <span class="text-xs uppercase tracking-[0.2em] text-gray-muted">Scroll</span>
        <div class="h-12 w-[1px] overflow-hidden">
          <div class="scroll-line-anim h-full w-full bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GoldParticles from './ui/GoldParticles.vue'
import GoldButton from './ui/GoldButton.vue'
import { animateSplitText } from '../composables/useSplitText.js'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const titleRef = ref(null)
const subtitleTopRef = ref(null)
const heroSvgLine = ref(null)
const descRef = ref(null)
const ctaRef = ref(null)
const scrollIndicator = ref(null)
const activeSlide = ref(0)

const titleWords = 'Invierte con Estrategia, Vive con Exclusividad'.split(' ')

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80', title: 'Penthouse de lujo' },
  { image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80', title: 'Residencia premium' },
  { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80', title: 'Villa exclusiva' },
]

let slideInterval = null
let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 3.2 })

    tl.to(subtitleTopRef.value, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })

    tl.add(() => {
      animateSplitText(titleRef.value, { delay: 0 })
    }, '-=0.3')

    const line = heroSvgLine.value
    if (line) {
      gsap.set(line, { strokeDasharray: 200, strokeDashoffset: 200 })
      tl.to(line, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=0.5')
    }

    tl.to(descRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.6')

    tl.to(ctaRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4')

    tl.to(scrollIndicator.value, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.3')

    gsap.to('.scroll-line-anim', {
      y: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    })

    gsap.to('.hero-slide img', {
      scale: 1.1,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })
  }, heroRef.value)

  slideInterval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % heroSlides.length
  }, 5000)
})

onUnmounted(() => {
  ctx?.revert()
  clearInterval(slideInterval)
})
</script>
