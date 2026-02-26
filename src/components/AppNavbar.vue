<template>
  <nav
    ref="navRef"
    class="fixed inset-x-0 top-0 z-[100] transition-all duration-500"
    :class="scrolled ? 'bg-black-deep/95 backdrop-blur-md border-b border-gray-border/20 py-3' : 'bg-transparent py-5'"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
      <a href="#inicio" class="flex items-center gap-2" @click.prevent="scrollToSection('#inicio')">
        <span class="font-display text-2xl font-bold gold-gradient-text">CM</span>
        <div class="hidden sm:block">
          <div class="h-8 w-[1px] bg-gold/30" />
        </div>
        <span class="hidden text-sm font-light tracking-wider text-gray-muted sm:block">Carlos Martínez</span>
      </a>

      <div class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium tracking-wide text-gray-muted transition-colors duration-300 hover:text-gold"
          @click.prevent="scrollToSection(link.href)"
        >
          {{ link.label }}
        </a>
        <GoldButton small href="#contacto" @click.prevent="scrollToSection('#contacto')">
          Contactar
        </GoldButton>
      </div>

      <button
        class="flex flex-col gap-1.5 md:hidden"
        aria-label="Menú"
        @click="mobileOpen = !mobileOpen"
      >
        <span
          class="block h-[2px] w-6 bg-gray-light transition-all duration-300"
          :class="{ 'rotate-45 translate-y-[5px]': mobileOpen }"
        />
        <span
          class="block h-[2px] w-6 bg-gray-light transition-all duration-300"
          :class="{ 'opacity-0': mobileOpen }"
        />
        <span
          class="block h-[2px] w-6 bg-gray-light transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-[5px]': mobileOpen }"
        />
      </button>
    </div>

    <transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="border-t border-gray-border/20 bg-black-deep/98 backdrop-blur-md md:hidden"
      >
        <div class="mx-auto max-w-7xl px-6 py-6">
          <div class="flex flex-col gap-4">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              class="text-lg font-medium text-gray-muted transition-colors duration-300 hover:text-gold"
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
import { ref, onMounted, onUnmounted } from 'vue'
import GoldButton from './ui/GoldButton.vue'
import { useLenis } from '../composables/useLenis.js'

const { scrollTo } = useLenis()

const scrolled = ref(false)
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
}

function onScroll() {
  scrolled.value = window.scrollY > 60
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
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
