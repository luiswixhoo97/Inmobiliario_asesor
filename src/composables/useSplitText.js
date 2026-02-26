import gsap from 'gsap'

export function animateSplitText(container, options = {}) {
  const words = container.querySelectorAll('.split-word')
  if (!words.length) return null

  gsap.set(words, { opacity: 0, y: 40 })

  return gsap.to(words, {
    opacity: 1,
    y: 0,
    duration: options.duration || 0.8,
    ease: options.ease || 'power3.out',
    stagger: options.stagger || 0.06,
    delay: options.delay || 0,
    scrollTrigger: options.scrollTrigger || undefined,
  })
}

export function animateSplitChars(container, options = {}) {
  const chars = container.querySelectorAll('.split-char')
  if (!chars.length) return null

  gsap.set(chars, { opacity: 0, y: 30 })

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: options.duration || 0.5,
    ease: options.ease || 'power3.out',
    stagger: options.stagger || 0.03,
    delay: options.delay || 0,
    scrollTrigger: options.scrollTrigger || undefined,
  })
}
