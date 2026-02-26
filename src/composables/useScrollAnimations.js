import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  let ctx = null

  onUnmounted(() => {
    ctx?.revert()
  })

  function createContext(element, callback) {
    ctx = gsap.context(callback, element)
    return ctx
  }

  function fadeInUp(targets, options = {}) {
    return gsap.from(targets, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: targets,
        start: 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
      ...options,
    })
  }

  function fadeInLeft(targets, options = {}) {
    return gsap.from(targets, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: targets,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
      ...options,
    })
  }

  function fadeInRight(targets, options = {}) {
    return gsap.from(targets, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: targets,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
      ...options,
    })
  }

  function staggerReveal(targets, container, options = {}) {
    return gsap.from(targets, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
      ...options,
    })
  }

  function drawLine(target, options = {}) {
    const length = target.getTotalLength?.() || 300
    gsap.set(target, { strokeDasharray: length, strokeDashoffset: length })
    return gsap.to(target, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
      ...options,
    })
  }

  return { createContext, fadeInUp, fadeInLeft, fadeInRight, staggerReveal, drawLine, gsap, ScrollTrigger }
}
