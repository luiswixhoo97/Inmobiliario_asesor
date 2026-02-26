import { onMounted, onUnmounted, shallowRef } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function useLenis() {
  const lenis = shallowRef(null)

  onMounted(() => {
    if (lenisInstance) {
      lenis.value = lenisInstance
      return
    }

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.value = lenisInstance

    lenisInstance.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  })

  onUnmounted(() => {
    // Keep lenis alive for the app lifecycle
  })

  function scrollTo(target, options = {}) {
    lenisInstance?.scrollTo(target, { offset: 0, duration: 1.2, ...options })
  }

  function stop() {
    lenisInstance?.stop()
  }

  function start() {
    lenisInstance?.start()
  }

  return { lenis, scrollTo, stop, start }
}
