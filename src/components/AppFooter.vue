<template>
  <footer class="border-t border-gray-border/20 bg-black-deep py-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="flex items-center gap-3">
          <span class="font-display text-xl font-semibold text-gold">CM</span>
          <div class="h-6 w-[1px] bg-gray-border/50" />
          <span class="text-sm text-gray-muted">Carlos Martínez</span>
        </div>
        <p class="text-center text-sm text-gray-muted/60">
          &copy; {{ year }} Carlos Martínez. Todos los derechos reservados.
        </p>
        <div class="flex gap-4 text-sm text-gray-muted/60">
          <a href="#" class="transition-colors hover:text-gold">Privacidad</a>
          <a href="#" class="transition-colors hover:text-gold">Términos</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
