<template>
  <section id="testimonios" ref="sectionRef" class="noise-overlay relative py-24 md:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <SectionTitle
        title="Lo que dicen mis clientes"
        subtitle="Testimonios"
        :gold-words="[5]"
      />

      <div ref="testimonialContent" class="relative">
        <svg class="absolute -top-4 left-0 h-16 w-16 text-gold/10 md:-top-8 md:h-24 md:w-24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>

        <div class="grid items-center gap-12 md:grid-cols-2">
          <div class="relative z-10">
            <transition name="fade" mode="out-in">
              <div :key="activeTestimonial">
                <p class="mb-8 font-display text-xl leading-relaxed text-white/90 italic md:text-2xl lg:text-3xl">
                  "{{ testimonials[activeTestimonial].text }}"
                </p>
                <div>
                  <p class="text-lg font-semibold text-gold">{{ testimonials[activeTestimonial].name }}</p>
                  <p class="text-sm text-gray-muted">{{ testimonials[activeTestimonial].role }}</p>
                </div>
              </div>
            </transition>

            <div class="mt-8 flex gap-3">
              <button
                v-for="(_, i) in testimonials"
                :key="i"
                class="h-2 rounded-full transition-all duration-300"
                :class="activeTestimonial === i ? 'w-8 bg-gold' : 'w-2 bg-gray-border hover:bg-gray-muted'"
                @click="activeTestimonial = i"
              />
            </div>
          </div>

          <div class="relative">
            <transition name="scale-fade" mode="out-in">
              <div :key="activeTestimonial" class="overflow-hidden rounded-sm">
                <ImageReveal
                  :src="testimonials[activeTestimonial].image"
                  :alt="testimonials[activeTestimonial].name"
                  class-name="aspect-[4/5]"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../data/testimonials.js'
import SectionTitle from './ui/SectionTitle.vue'
import ImageReveal from './ui/ImageReveal.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const testimonialContent = ref(null)
const activeTestimonial = ref(0)

let interval = null
let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(testimonialContent.value, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
  }, sectionRef.value)

  interval = setInterval(() => {
    activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
  }, 6000)
})

onUnmounted(() => {
  ctx?.revert()
  clearInterval(interval)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.scale-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
