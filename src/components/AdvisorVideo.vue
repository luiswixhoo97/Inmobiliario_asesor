<template>
  <section ref="sectionRef" class="noise-overlay relative py-24 md:py-32">
    <div class="mx-auto max-w-5xl px-6 lg:px-12">
      <div class="text-center">
        <p class="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">Conóceme</p>
        <TextSplitReveal
          text="Una Conversación Personal"
          tag="h2"
          class-name="font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl mb-12 justify-center"
          word-class="text-white"
        />
      </div>

      <div ref="videoWrapper" class="relative mx-auto max-w-3xl">
        <!-- Gold frame SVG -->
        <svg
          ref="frameRef"
          class="pointer-events-none absolute -inset-4 z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)]"
          preserveAspectRatio="none"
        >
          <rect
            ref="frameRect"
            x="1" y="1"
            width="calc(100% - 2px)" height="calc(100% - 2px)"
            rx="4"
            fill="none"
            stroke="url(#videoFrameGold)"
            stroke-width="1.5"
          />
          <defs>
            <linearGradient id="videoFrameGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#B8942E" />
              <stop offset="50%" stop-color="#F5D77A" />
              <stop offset="100%" stop-color="#B8942E" />
            </linearGradient>
          </defs>
        </svg>

        <div class="relative aspect-video overflow-hidden rounded-sm bg-black-alt">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80"
            alt="Video del asesor"
            class="h-full w-full object-cover opacity-60"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <button
              class="group flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60 bg-black-deep/50 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:scale-110 gold-border-glow"
            >
              <svg class="ml-1 h-8 w-8 text-gold transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <div class="play-pulse absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="h-20 w-20 rounded-full border border-gold/30 animate-ping" style="animation-duration: 2s;" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextSplitReveal from './ui/TextSplitReveal.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const videoWrapper = ref(null)
const frameRect = ref(null)
let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    const rect = frameRect.value
    if (!rect) return

    const perimeter = rect.getTotalLength ? rect.getTotalLength() : 2000
    gsap.set(rect, { strokeDasharray: perimeter, strokeDashoffset: perimeter })

    gsap.to(rect, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: videoWrapper.value,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from(videoWrapper.value, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: videoWrapper.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
