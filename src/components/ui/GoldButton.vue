<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href && href.startsWith('http') ? '_blank' : undefined"
    :rel="href && href.startsWith('http') ? 'noopener noreferrer' : undefined"
    class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm px-8 py-4 font-medium tracking-wide text-white transition-all duration-300"
    :class="[
      small ? 'px-5 py-2.5 text-sm' : 'px-8 py-4 text-base',
      variant === 'blue' ? 'blue-btn text-white' : 'gold-btn text-black-deep'
    ]"
  >
    <span
      class="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
      :class="variant === 'blue' ? 'blue-gradient-bg' : 'gold-gradient-bg'"
    />
    <span
      class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :class="variant === 'blue' ? 'blue-glow' : 'gold-glow'"
    />
    <span class="relative z-10 flex items-center gap-2 font-semibold">
      <slot />
    </span>
  </component>
</template>

<script setup>
defineProps({
  href: { type: String, default: null },
  small: { type: Boolean, default: false },
  variant: { type: String, default: 'blue' }, // 'blue' página, 'gold' base ConnectSection
})
</script>
