<template>
  <svg
    ref="svgRef"
    :width="width"
    :height="height"
    class="overflow-visible"
    :class="className"
  >
    <line
      ref="lineRef"
      x1="0"
      :y1="height / 2"
      :x2="width"
      :y2="height / 2"
      stroke="url(#blueGradient)"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />
    <defs>
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1D3A6D" />
        <stop offset="30%" stop-color="#1D71B8" />
        <stop offset="50%" stop-color="#36A9E1" />
        <stop offset="70%" stop-color="#1D71B8" />
        <stop offset="100%" stop-color="#1D3A6D" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  width: { type: Number, default: 120 },
  height: { type: Number, default: 4 },
  strokeWidth: { type: Number, default: 2 },
  loop: { type: Boolean, default: false },
  autoplay: { type: Boolean, default: false },
  className: { type: String, default: '' },
})

const svgRef = ref(null)
const lineRef = ref(null)
let tween = null

onMounted(() => {
  const line = lineRef.value
  if (!line) return

  const length = props.width
  gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })

  if (props.autoplay) {
    tween = gsap.to(line, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      delay: 0.3,
    })
  } else if (props.loop) {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(line, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' })
    tl.to(line, { strokeDashoffset: -length, duration: 1.5, ease: 'power2.inOut', delay: 0.5 })
    tween = tl
  } else {
    tween = gsap.to(line, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: svgRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }
})

onUnmounted(() => {
  tween?.kill()
})
</script>
