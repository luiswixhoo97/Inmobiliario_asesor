<template>
  <section class="relative flex min-h-screen w-full overflow-hidden">
    <!-- Fondo: imagen única -->
    <div class="absolute inset-0">
      <img
        :src="bgImage"
        alt=""
        class="h-full w-full object-cover"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-black/35 md:bg-black/25" aria-hidden="true" />
    </div>

    <!-- Contenido centrado: botón VENDER + headline -->
    <div class="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 md:px-12 lg:px-20">
      <div class="flex w-full max-w-2xl flex-col items-center justify-center gap-10 text-center">
        <a
          href="#contacto"
          class="rounded-sm border-2 border-white px-10 py-4 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-gray-card md:px-12 md:py-5 md:text-base"
        >
          VENDER
        </a>
        <div class="flex flex-col gap-3 md:gap-4">
          <h2 class="font-sans text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            VENDER TU CASA
          </h2>
          <h2 class="font-sans text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            NUNCA FUE TAN FÁCIL
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import bgImage from '../assets/images/ValleReal_SC_3061-7.jpg'
</script>
