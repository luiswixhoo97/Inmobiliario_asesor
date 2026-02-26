<template>
  <div
    class="tilt-card group overflow-hidden rounded border border-gray-border/30 bg-gray-card/80 backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(198,165,90,0.06)]"
  >
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="property.image"
        :alt="property.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black-deep/80 via-transparent to-transparent" />
      <span
        v-if="property.featured"
        class="absolute left-4 top-4 rounded-sm bg-gold/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black-deep"
      >Destacada</span>
      <p class="absolute bottom-4 left-4 font-display text-2xl font-bold text-gold">
        {{ property.price }}
      </p>
    </div>
    <div class="p-6">
      <h3 class="mb-1 font-display text-lg font-semibold text-white">{{ property.title }}</h3>
      <p class="mb-4 flex items-center gap-1.5 text-sm text-gray-muted">
        <svg class="h-4 w-4 shrink-0 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {{ property.location }}
      </p>
      <div class="mb-5 flex flex-wrap gap-4 text-sm text-gray-muted">
        <span class="flex items-center gap-1.5">
          <svg class="h-4 w-4 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
          {{ property.bedrooms }} Rec.
        </span>
        <span class="flex items-center gap-1.5">
          <svg class="h-4 w-4 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {{ property.bathrooms }} Baños
        </span>
        <span class="flex items-center gap-1.5">
          <svg class="h-4 w-4 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/></svg>
          {{ property.area }}
        </span>
      </div>
      <a
        href="#contacto"
        class="gold-btn group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm px-5 py-2.5 text-sm font-medium tracking-wide text-black-deep transition-all duration-300"
      >
        <span class="gold-gradient-bg absolute inset-0 transition-opacity duration-300 group-hover/btn:opacity-90" />
        <span class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 gold-glow" />
        <span class="relative z-10 flex items-center gap-2 font-semibold">
          Ver Detalles
          <svg class="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  property: { type: Object, required: true },
})
</script>
