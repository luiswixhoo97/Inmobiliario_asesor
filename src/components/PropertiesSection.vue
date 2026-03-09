<template>
  <section id="propiedades" ref="sectionRef" class="noise-overlay relative flex min-h-screen flex-col justify-center py-24 md:py-32 bg-off-white">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <!-- Header + View toggle -->
      <div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-16">
        <div>
          <p class="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-blue-light">
            Portafolio Exclusivo
          </p>
          <h2 class="font-display text-3xl font-semibold leading-tight text-gray-card md:text-4xl lg:text-5xl">
            <span class="blue-gradient-text">Propiedades</span> Disponibles
          </h2>
          <div class="mt-4 flex items-center gap-3">
            <div class="h-[1px] w-16 bg-gradient-to-r from-blue/60 to-transparent" />
            <div class="h-1.5 w-1.5 rotate-45 border border-blue/60" />
          </div>
        </div>

        <!-- View toggle -->
        <div class="hidden md:flex items-center gap-2 rounded border border-gray-border/40 bg-gray-card/50 p-1">
          <button
            @click="viewMode = 'carousel'"
            class="flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-all duration-300"
            :class="viewMode === 'carousel' ? 'bg-blue/10 text-blue-light border border-blue/30' : 'text-gray-muted hover:text-gray-card border border-transparent'"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
            </svg>
            Carrusel
          </button>
          <button
            @click="viewMode = 'grid'"
            class="flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-all duration-300"
            :class="viewMode === 'grid' ? 'bg-blue/10 text-blue-light border border-blue/30' : 'text-gray-muted hover:text-gray-card border border-transparent'"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125" />
            </svg>
            Grilla
          </button>
        </div>
      </div>
    </div>

    <!-- CAROUSEL VIEW -->
    <div v-show="viewMode === 'carousel'" class="relative">
      <!-- Desktop carousel -->
      <div class="hidden md:block">
        <div
          ref="carouselTrack"
          class="flex gap-8 overflow-x-auto px-6 pb-6 scrollbar-hide lg:px-[calc((100vw-80rem)/2+3rem)]"
          style="scroll-snap-type: x mandatory; scroll-behavior: smooth;"
        >
          <div
            v-for="property in properties"
            :key="'d-' + property.id"
            class="w-[380px] shrink-0 lg:w-[400px]"
            style="scroll-snap-align: start;"
          >
            <PropertyCard :property="property" />
          </div>
          <div class="w-6 shrink-0" />
        </div>

        <!-- Navigation arrows -->
        <button
          @click="scrollCarousel(-1)"
          class="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-blue/30 bg-off-white/90 text-blue-light backdrop-blur-sm transition-all duration-300 hover:border-blue hover:bg-blue/10"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          @click="scrollCarousel(1)"
          class="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-blue/30 bg-off-white/90 text-blue-light backdrop-blur-sm transition-all duration-300 hover:border-blue hover:bg-blue/10"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <!-- Mobile carousel -->
      <div class="overflow-x-auto px-6 md:hidden scrollbar-hide">
        <div class="flex gap-6 pb-4" style="scroll-snap-type: x mandatory;">
          <div
            v-for="property in properties"
            :key="'m-' + property.id"
            class="w-[85vw] shrink-0"
            style="scroll-snap-align: start;"
          >
            <PropertyCard :property="property" />
          </div>
        </div>
      </div>
    </div>

    <!-- GRID VIEW -->
    <div v-show="viewMode === 'grid'" class="mx-auto max-w-7xl px-6 lg:px-12">
      <div ref="gridRef" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(property, i) in properties"
          :key="'g-' + property.id"
          class="transition-all duration-700"
          :class="{ 'translate-y-8 opacity-0': !gridRevealed, 'translate-y-0 opacity-100': gridRevealed }"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <PropertyCard :property="property" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import VanillaTilt from 'vanilla-tilt'
import { properties } from '../data/properties.js'
import PropertyCard from './PropertyCard.vue'

const sectionRef = ref(null)
const carouselTrack = ref(null)
const gridRef = ref(null)
const viewMode = ref('carousel')
const gridRevealed = ref(false)

let gridObserver = null

function scrollCarousel(direction) {
  const track = carouselTrack.value
  if (!track) return
  const cardWidth = 408
  track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
}

function initTilt() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouchDevice) return

  nextTick(() => {
    const cards = sectionRef.value?.querySelectorAll('.tilt-card')
    cards?.forEach(card => {
      if (!card.vanillaTilt) {
        VanillaTilt.init(card, {
          max: 5,
          speed: 400,
          glare: true,
          'max-glare': 0.12,
          scale: 1.02,
        })
      }
    })
  })
}

function destroyTilt() {
  const cards = sectionRef.value?.querySelectorAll('.tilt-card')
  cards?.forEach(card => card.vanillaTilt?.destroy())
}

watch(viewMode, async (mode) => {
  destroyTilt()
  await nextTick()
  initTilt()

  if (mode === 'grid' && !gridRevealed.value) {
    await nextTick()
    gridRevealed.value = true
  }
})

onMounted(async () => {
  await nextTick()
  initTilt()

  gridObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && viewMode.value === 'grid') {
          gridRevealed.value = true
        }
      })
    },
    { threshold: 0.1 }
  )

  if (gridRef.value) {
    gridObserver.observe(gridRef.value)
  }
})

onUnmounted(() => {
  destroyTilt()
  gridObserver?.disconnect()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
