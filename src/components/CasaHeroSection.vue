<template>
  <section class="relative flex min-h-screen w-full overflow-hidden">
    <!-- Fondo: imagen de interior -->
    <div class="absolute inset-0">
      <img
        :src="bgImage"
        alt="Interior residencial"
        class="h-full w-full object-cover"
      />
      <!-- Overlay suave para legibilidad del texto blanco -->
      <div class="absolute inset-0 bg-black/30 md:bg-black/20" />
    </div>

    <!-- Contenido centrado -->
    <div class="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 md:px-12 lg:px-20">
      <div class="flex w-full max-w-xl flex-col items-center justify-center gap-12 text-center lg:max-w-2xl">
        <!-- Botones COMPRAR / RENTAR sin separación (un solo bloque) -->
        <div class="inline-flex overflow-hidden rounded-sm border-2 border-white">
          <a
            href="#propiedades"
            class="border-r border-white px-8 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-gray-card md:px-10 md:py-4 md:text-base"
          >
            COMPRAR
          </a>
          <a
            href="#propiedades"
            class="px-8 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-gray-card md:px-10 md:py-4 md:text-base"
          >
            RENTAR
          </a>
        </div>

        <!-- Texto principal -->
        <h1 class="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
          TU CASA, COMO LO MERECES
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import bgImage from '../assets/images/IMG_6937 4.jpg'
</script>
