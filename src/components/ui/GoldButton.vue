<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href && href.startsWith('http') ? '_blank' : undefined"
    :rel="href && href.startsWith('http') ? 'noopener noreferrer' : undefined"
    class="gold-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm px-8 py-4 font-medium tracking-wide text-black-deep transition-all duration-300"
    :class="[small ? 'px-5 py-2.5 text-sm' : 'px-8 py-4 text-base']"
  >
    <span class="gold-gradient-bg absolute inset-0 transition-opacity duration-300 group-hover:opacity-90" />
    <span class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 gold-glow" />
    <span class="relative z-10 flex items-center gap-2 font-semibold">
      <slot />
    </span>
  </component>
</template>

<script setup>
defineProps({
  href: { type: String, default: null },
  small: { type: Boolean, default: false },
})
</script>
