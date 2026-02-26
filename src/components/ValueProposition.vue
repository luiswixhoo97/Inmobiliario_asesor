<template>
  <section id="servicios" ref="sectionRef" class="noise-overlay relative py-24 md:py-32 overflow-hidden">
    <!-- Decorative radial glow -->
    <div class="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] opacity-[0.07]" style="background: radial-gradient(ellipse at center, #D4AF37 0%, transparent 70%)" />

    <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
      <!-- Section header -->
      <div ref="headerRef" class="mb-16 text-center md:mb-20">
        <p class="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">
          Propuesta de Valor
        </p>
        <h2 class="font-display text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
          Lo que me <span class="gold-gradient-text">diferencia</span>
        </h2>
        <div class="mx-auto mt-6 flex items-center justify-center gap-3">
          <div ref="lineLeft" class="h-[1px] bg-gradient-to-r from-transparent to-gold/60" style="width: 60px" />
          <div class="h-2 w-2 rotate-45 border border-gold/80 bg-gold/20" />
          <div ref="lineRight" class="h-[1px] bg-gradient-to-l from-transparent to-gold/60" style="width: 60px" />
        </div>
      </div>

      <!-- Cards grid -->
      <div ref="gridRef" class="grid gap-6 sm:grid-cols-2 lg:gap-8">
        <div
          v-for="(pillar, i) in pillars"
          :key="i"
          :ref="el => { if (el) cardEls[i] = el }"
          class="group relative overflow-hidden rounded border border-gray-border/40 bg-gradient-to-br from-gray-card/80 to-black-deep/60 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(198,165,90,0.08)]"
          :class="{ 'translate-y-8 opacity-0': !revealed[i], 'translate-y-0 opacity-100': revealed[i] }"
          :style="{ transitionDelay: `${i * 150}ms`, transitionProperty: 'transform, opacity, border-color, box-shadow' }"
        >
          <!-- Top gold line that expands on hover -->
          <div class="absolute inset-x-0 top-0 h-[1px]">
            <div class="h-full w-0 bg-gradient-to-r from-gold-dark via-gold-highlight to-gold-dark transition-all duration-700 ease-out group-hover:w-full" />
          </div>

          <div class="flex gap-6 p-7 md:p-8">
            <!-- Icon column -->
            <div class="flex shrink-0 items-start">
              <div class="flex h-14 w-14 items-center justify-center rounded-lg border border-gold/20 bg-gold/[0.03] text-gold transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/[0.08] group-hover:shadow-[0_0_20px_rgba(198,165,90,0.1)]">
                <span
                  v-if="pillar.image"
                  class="inline-block h-7 w-7 bg-current"
                  :style="{ maskImage: `url(${pillar.image})`, WebkitMaskImage: `url(${pillar.image})`, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }"
                />
                <div v-else v-html="pillar.icon" />
              </div>
            </div>

            <!-- Text content -->
            <div class="min-w-0 flex-1">
              <h3 class="mb-2 font-display text-lg font-semibold text-white md:text-xl">
                {{ pillar.title }}
              </h3>
              <p class="text-sm leading-relaxed text-gray-muted/90">
                {{ pillar.description }}
              </p>
            </div>

            <!-- Arrow indicator -->
            <div class="hidden items-start pt-1 sm:flex">
              <svg class="h-5 w-5 text-gold/0 transition-all duration-500 group-hover:text-gold/50 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
              </svg>
            </div>
          </div>

          <!-- Corner accent -->
          <div class="pointer-events-none absolute -bottom-px -right-px h-8 w-8 border-b border-r border-gold/0 transition-all duration-500 group-hover:border-gold/20" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import handshakeIcon from '../assets/images/hand-shake.png'

const sectionRef = ref(null)
const headerRef = ref(null)
const gridRef = ref(null)
const cardEls = reactive([null, null, null, null])
const revealed = reactive([false, false, false, false])

let observer = null

const pillars = [
  {
    title: 'Estrategia Personalizada',
    description: 'Cada cliente tiene necesidades únicas. Diseño un plan a medida para lograr tus objetivos inmobiliarios.',
    icon: '<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  },
  {
    title: 'Análisis de Mercado',
    description: 'Datos precisos y tendencias actualizadas para tomar decisiones informadas y rentables.',
    icon: '<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18"/><path stroke-linecap="round" stroke-linejoin="round" d="M18 17V9"/><path stroke-linecap="round" stroke-linejoin="round" d="M13 17V5"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 17v-3"/></svg>',
  },
  {
    title: 'Negociación Experta',
    description: 'Maximizo el valor de cada operación con técnicas avanzadas de negociación y cierre.',
    image: handshakeIcon,
  },
  {
    title: 'Acompañamiento Integral',
    description: 'Te guío en cada paso del proceso, desde la búsqueda hasta la escrituración final.',
    icon: '<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/></svg>',
  },
]

onMounted(async () => {
  await nextTick()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < 4; i++) {
            revealed[i] = true
          }
          observer.disconnect()
        }
      })
    },
    { threshold: 0.15 }
  )

  if (gridRef.value) {
    observer.observe(gridRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
