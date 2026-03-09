<template>
  <footer class="border-t border-gray-border/20 bg-off-white py-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="flex items-center gap-3">
          <img
            :src="logoFinca"
            alt="Finca Inmobiliaria"
            class="h-8 w-auto object-contain"
          />
          </div>
        <p class="text-center text-sm text-gray-muted/60">
          &copy; {{ year }} Finca Inmobiliaria. Todos los derechos reservados.
        </p>
        <div class="flex gap-4 text-sm text-gray-muted/60">
          <a href="#" class="transition-colors hover:text-blue-light">Privacidad</a>
          <a href="#" class="transition-colors hover:text-blue-light">Términos</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logoFinca from '../assets/images/LOGO-FINCA.png'

const year = new Date().getFullYear()
</script>
