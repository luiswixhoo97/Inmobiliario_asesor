<template>
  <div
    v-if="visible"
    ref="preloaderRef"
    class="fixed inset-0 z-[9999] flex items-center justify-center"
  >
    <div ref="topPanel" class="absolute inset-x-0 top-0 h-1/2 bg-black-deep" />
    <div ref="bottomPanel" class="absolute inset-x-0 bottom-0 h-1/2 bg-black-deep" />

    <div ref="contentRef" class="relative z-10 text-center">
      <h1 class="font-display text-4xl font-semibold tracking-wide md:text-5xl lg:text-6xl">
        <span
          v-for="(char, i) in nameChars"
          :key="i"
          ref="charsRef"
          class="preloader-char inline-block"
          :class="char === ' ' ? 'mr-3' : ''"
          :style="{ color: char === ' ' ? 'transparent' : '' }"
        >{{ char === ' ' ? '\u00A0' : char }}</span>
      </h1>
      <svg ref="lineRef" class="mx-auto mt-4" width="200" height="4">
        <line
          ref="svgLine"
          x1="0" y1="2" x2="200" y2="2"
          stroke="url(#preloaderGold)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient id="preloaderGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#B8942E" />
            <stop offset="50%" stop-color="#F5D77A" />
            <stop offset="100%" stop-color="#B8942E" />
          </linearGradient>
        </defs>
      </svg>
      <p ref="taglineRef" class="mt-3 text-sm tracking-[0.3em] text-gray-muted uppercase opacity-0">
        Bienes Raíces Premium
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['complete'])

const visible = ref(true)
const preloaderRef = ref(null)
const topPanel = ref(null)
const bottomPanel = ref(null)
const contentRef = ref(null)
const charsRef = ref([])
const svgLine = ref(null)
const taglineRef = ref(null)

const advisorName = 'Carlos Martínez'
const nameChars = advisorName.split('')

onMounted(async () => {
  await nextTick()

  const line = svgLine.value
  if (line) {
    gsap.set(line, { strokeDasharray: 200, strokeDashoffset: 200 })
  }

  const tl = gsap.timeline({
    onComplete: () => {
      visible.value = false
      emit('complete')
    },
  })

  tl.from('.preloader-char', {
    opacity: 0,
    y: 40,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.04,
  })

  if (line) {
    tl.to(line, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power2.inOut',
    }, '-=0.3')
  }

  tl.to(taglineRef.value, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.5')

  tl.to(contentRef.value, {
    opacity: 0,
    scale: 0.95,
    duration: 0.5,
    ease: 'power2.in',
  }, '+=0.4')

  tl.to(topPanel.value, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power3.inOut',
  }, '-=0.2')

  tl.to(bottomPanel.value, {
    yPercent: 100,
    duration: 0.8,
    ease: 'power3.inOut',
  }, '<')
})
</script>
