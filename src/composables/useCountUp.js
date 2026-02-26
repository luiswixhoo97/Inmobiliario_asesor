import { ref, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useCountUp(targetValue, options = {}) {
  const current = ref(0)
  let tween = null

  function animate(triggerElement) {
    const obj = { val: 0 }
    tween = gsap.to(obj, {
      val: targetValue,
      duration: options.duration || 2,
      ease: options.ease || 'power2.out',
      snap: { val: 1 },
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate() {
        current.value = obj.val
      },
    })
  }

  onUnmounted(() => {
    tween?.kill()
  })

  return { current, animate }
}
