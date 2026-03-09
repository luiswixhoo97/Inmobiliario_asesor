<template>
  <div
    v-if="visible"
    ref="preloaderRef"
    class="fixed inset-0 z-[9999] flex items-center justify-center"
  >
    <div ref="topPanel" class="absolute inset-x-0 top-0 h-1/2 bg-off-white" />
    <div ref="bottomPanel" class="absolute inset-x-0 bottom-0 h-1/2 bg-off-white" />

    <div ref="contentRef" class="relative z-10 flex flex-col items-center justify-center">
      <div ref="logoRef" class="opacity-0">
        <img
          :src="logoFinca"
          alt="Finca Inmobiliaria"
          class="h-28 w-auto object-contain md:h-36 lg:h-44"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import logoFinca from '../assets/images/LOGO-FINCA.png'

const emit = defineEmits(['complete'])

const visible = ref(true)
const preloaderRef = ref(null)
const topPanel = ref(null)
const bottomPanel = ref(null)
const contentRef = ref(null)
const logoRef = ref(null)

onMounted(async () => {
  await nextTick()

  const tl = gsap.timeline({
    onComplete: () => {
      visible.value = false
      emit('complete')
    },
  })

  tl.fromTo(logoRef.value, {
    opacity: 0,
    scale: 0.7,
    y: 30,
  }, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  })

  tl.to(logoRef.value, {
    scale: 1.02,
    duration: 0.3,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: 1,
  }, '+=0.2')

  tl.to(contentRef.value, {
    opacity: 0,
    scale: 0.95,
    duration: 0.5,
    ease: 'power2.in',
  }, '+=0.6')

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
