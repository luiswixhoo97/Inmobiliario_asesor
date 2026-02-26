<template>
  <section id="asesor" ref="sectionRef" class="noise-overlay relative py-24 md:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <div class="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div ref="photoSide" class="photo-side">
          <ImageReveal
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80"
            alt="Carlos Martínez - Asesor Inmobiliario"
            class-name="aspect-[3/4] rounded-sm"
          />
        </div>

        <div ref="textSide" class="text-side">
          <p class="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Tu Asesor de Confianza
          </p>
          <TextSplitReveal
            text="Carlos Martínez"
            tag="h2"
            class-name="font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl mb-2"
          />
          <GoldLine :width="100" :height="4" :stroke-width="2" class="mb-6" />

          <div class="space-y-4 text-base leading-relaxed text-gray-muted">
            <p>
              Con más de <span class="font-semibold text-gold">12 años de experiencia</span> en el mercado inmobiliario de lujo, me especializo en identificar oportunidades de inversión que generan valor real y a largo plazo.
            </p>
            <p>
              Mi filosofía es simple: cada cliente merece una estrategia única. No vendo propiedades, <span class="font-semibold text-white">construyo patrimonios</span>. Cada operación es el resultado de un análisis profundo, negociación experta y un compromiso absoluto con tus objetivos.
            </p>
            <p>
              Especializado en propiedades residenciales premium, desarrollo inmobiliario y asesoría para inversionistas que buscan maximizar su retorno con inteligencia y visión estratégica.
            </p>
          </div>

          <div class="mt-8 flex flex-wrap gap-6">
            <div v-for="stat in miniStats" :key="stat.label" class="text-center">
              <p class="font-display text-2xl font-semibold text-gold">{{ stat.value }}</p>
              <p class="text-xs uppercase tracking-wider text-gray-muted">{{ stat.label }}</p>
            </div>
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
import ImageReveal from './ui/ImageReveal.vue'
import TextSplitReveal from './ui/TextSplitReveal.vue'
import GoldLine from './ui/GoldLine.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const photoSide = ref(null)
const textSide = ref(null)
let ctx = null

const miniStats = [
  { value: '150+', label: 'Operaciones' },
  { value: '95%', label: 'Tasa de Cierre' },
  { value: '12', label: 'Años' },
]

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(photoSide.value, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from(textSide.value, {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
