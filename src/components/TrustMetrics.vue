<template>
  <section ref="sectionRef" class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden border-y border-gray-border/30 bg-off-white py-20 md:py-28">
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 50% 50%, rgba(29,113,184,0.2) 0%, transparent 50%)" />
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <div ref="metricsGrid" class="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        <div
          v-for="(metric, i) in metricsData"
          :key="metric.id"
          ref="metricItems"
          class="metric-item text-center"
        >
          <p class="font-display text-4xl font-bold leading-none text-blue-light md:text-5xl lg:text-6xl">
            {{ Math.round(counters[i].current.value) }}{{ metric.suffix }}
          </p>
          <div class="mx-auto mt-3 h-[1px] w-12 bg-gradient-to-r from-transparent via-blue/50 to-transparent" />
          <p class="mt-3 text-sm font-medium uppercase tracking-wider text-gray-muted">{{ metric.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { metrics as metricsData } from '../data/metrics.js'
import { useCountUp } from '../composables/useCountUp.js'

const sectionRef = ref(null)
const metricsGrid = ref(null)
const metricItems = ref([])

const counters = metricsData.map(m => useCountUp(m.value))

onMounted(() => {
  counters.forEach((counter) => {
    counter.animate(metricsGrid.value)
  })
})
</script>
