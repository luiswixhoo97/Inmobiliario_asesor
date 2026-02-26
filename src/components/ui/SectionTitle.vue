<template>
  <div ref="containerRef" class="mb-12 md:mb-16">
    <p v-if="subtitle" class="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
      {{ subtitle }}
    </p>
    <h2 ref="titleRef" class="font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
      <span
        v-for="(word, i) in words"
        :key="i"
        class="split-word inline-block mr-[0.3em]"
        :class="{ 'gold-gradient-text': goldWords.includes(i) }"
      >{{ word }}</span>
    </h2>
    <GoldLine
      :width="lineWidth"
      :height="4"
      :stroke-width="2"
      class="mt-4"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import GoldLine from './GoldLine.vue'
import { animateSplitText } from '../../composables/useSplitText.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  goldWords: { type: Array, default: () => [] },
  lineWidth: { type: Number, default: 120 },
})

const containerRef = ref(null)
const titleRef = ref(null)
const words = computed(() => props.title.split(' '))

onMounted(() => {
  if (titleRef.value) {
    animateSplitText(titleRef.value, {
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }
})
</script>
