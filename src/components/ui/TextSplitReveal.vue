<template>
  <component :is="tag" ref="containerRef" class="overflow-hidden" :class="className">
    <span
      v-for="(word, i) in words"
      :key="i"
      class="split-word inline-block mr-[0.3em]"
      :class="wordClass"
    >{{ word }}</span>
  </component>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { animateSplitText } from '../../composables/useSplitText.js'

const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'div' },
  className: { type: String, default: '' },
  wordClass: { type: String, default: '' },
  delay: { type: Number, default: 0 },
  useScrollTrigger: { type: Boolean, default: true },
})

const containerRef = ref(null)
const words = computed(() => props.text.split(' '))
let tween = null

onMounted(() => {
  if (!containerRef.value) return

  const opts = { delay: props.delay }
  if (props.useScrollTrigger) {
    opts.scrollTrigger = {
      trigger: containerRef.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  }
  tween = animateSplitText(containerRef.value, opts)
})

onUnmounted(() => {
  tween?.kill()
})
</script>
