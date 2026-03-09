<template>
  <div ref="wrapperRef" class="image-reveal relative overflow-hidden" :class="className">
    <div ref="overlayRef" class="absolute inset-0 z-10 origin-left blue-gradient-bg" />
    <img
      ref="imgRef"
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover"
      loading="lazy"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  className: { type: String, default: '' },
  delay: { type: Number, default: 0 },
  direction: { type: String, default: 'left' },
})

const wrapperRef = ref(null)
const overlayRef = ref(null)
const imgRef = ref(null)
let tl = null

onMounted(() => {
  if (!wrapperRef.value) return

  gsap.set(imgRef.value, { scale: 1.3 })
  gsap.set(overlayRef.value, { scaleX: 1, transformOrigin: props.direction === 'left' ? 'left' : 'right' })

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    delay: props.delay,
  })

  tl.to(overlayRef.value, {
    scaleX: 0,
    transformOrigin: props.direction === 'left' ? 'right' : 'left',
    duration: 1,
    ease: 'power3.inOut',
  })

  tl.to(imgRef.value, {
    scale: 1,
    duration: 1.4,
    ease: 'power3.out',
  }, '-=0.7')
})

onUnmounted(() => {
  tl?.kill()
})
</script>
