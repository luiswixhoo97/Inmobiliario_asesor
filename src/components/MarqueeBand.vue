<template>
  <div class="marquee-wrapper overflow-hidden border-y border-gold/10 bg-black-alt py-5 md:py-6">
    <div class="marquee-track flex whitespace-nowrap">
      <span
        v-for="n in 3"
        :key="n"
        class="marquee-content flex shrink-0 items-center"
      >
        <span
          v-for="(word, i) in words"
          :key="`${n}-${i}`"
          class="mx-6 font-display text-2xl font-semibold uppercase tracking-[0.15em] text-gold/80 md:mx-10 md:text-3xl lg:text-4xl"
        >
          {{ word }}
        </span>
        <span class="mx-6 text-gold/40 md:mx-10">✦</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const words = ['Lujo', 'Inversión', 'Exclusividad', 'Resultados', 'Estrategia', 'Confianza']

let tween = null

onMounted(() => {
  const contents = document.querySelectorAll('.marquee-content')
  if (!contents.length) return

  const contentWidth = contents[0].offsetWidth

  tween = gsap.to('.marquee-track', {
    x: -contentWidth,
    duration: 25,
    ease: 'none',
    repeat: -1,
  })
})

onUnmounted(() => {
  tween?.kill()
})
</script>
