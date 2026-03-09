<template>
  <nav
    ref="navRef"
    class="fixed inset-x-0 top-0 z-[100] bg-transparent py-5 transition-all duration-500"
  >
    <div class="flex w-full items-center justify-between px-6 lg:px-12">
      <a href="#inicio" class="flex items-center gap-2" @click.prevent="scrollToSection('#inicio')">
        <img
          :src="logoFinca"
          alt="Finca Inmobiliaria"
          class="h-14 w-auto object-contain md:h-16 lg:h-20"
        />
      </a>

      <button
        class="flex flex-col gap-1.5 rounded p-2 transition-colors hover:bg-white/10"
        aria-label="Menú"
        @click="mobileOpen = !mobileOpen"
      >
        <span
          class="block h-[2px] w-6 bg-gray-card transition-all duration-300 md:bg-gray-card"
          :class="{ 'rotate-45 translate-y-[5px]': mobileOpen }"
        />
        <span
          class="block h-[2px] w-6 bg-gray-card transition-all duration-300"
          :class="{ 'opacity-0': mobileOpen }"
        />
        <span
          class="block h-[2px] w-6 bg-gray-card transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-[5px]': mobileOpen }"
        />
      </button>
    </div>

    <transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="absolute left-0 right-0 top-full border-t border-gray-border/20 bg-off-white/98 backdrop-blur-md"
      >
        <div class="mx-auto max-w-7xl px-6 py-6">
          <div class="flex flex-col gap-4">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              class="text-lg font-medium text-gray-card transition-colors duration-300 hover:text-blue-light"
              @click.prevent="scrollToSection(link.href); mobileOpen = false"
            >
              {{ link.label }}
            </a>
            <div class="mt-2">
              <GoldButton href="#contacto" @click.prevent="scrollToSection('#contacto'); mobileOpen = false">
                Contactar
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import GoldButton from './ui/GoldButton.vue'
import { useLenis } from '../composables/useLenis.js'
import logoFinca from '../assets/images/LOGO-FINCA.png'

const { scrollTo } = useLenis()

const mobileOpen = ref(false)

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Asesor', href: '#asesor' },
  { label: 'Propiedades', href: '#propiedades' },
  { label: 'Testimonios', href: '#testimonios' },
]

function scrollToSection(href) {
  scrollTo(href, { offset: -80, duration: 1.5 })
  mobileOpen.value = false
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
