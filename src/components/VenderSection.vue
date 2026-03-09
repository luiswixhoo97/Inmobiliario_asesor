<template>
  <section class="relative flex min-h-screen w-full overflow-hidden">
    <!-- Fondo: imagen -->
    <div class="absolute inset-0">
      <img
        :src="bgImage"
        alt="Vender tu casa"
        class="h-full w-full object-cover"
      />
      <!-- Overlay para legibilidad del texto blanco -->
      <div class="absolute inset-0 bg-black/30 md:bg-black/20" />
    </div>

    <!-- Contenido centrado -->
    <div class="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 md:px-12 lg:px-20">
      <div class="flex w-full max-w-xl flex-col items-center justify-center gap-12 text-center lg:max-w-2xl">
        <!-- Botón VENDER -->
        <a
          href="#contacto"
          class="rounded-sm border-2 border-white px-10 py-4 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-gray-card md:px-12 md:py-5 md:text-base"
        >
          VENDER
        </a>

        <!-- Texto principal en dos líneas -->
        <h2 class="font-sans text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
          <span class="block">VENDER TU CASA</span>
          <span class="block">NUNCA FUE TAN FÁCIL</span>
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import bgImage from '../assets/images/ValleReal_SC_3061-7.jpg'
</script>
