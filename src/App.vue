<template>
  <AppPreloader @complete="onPreloaderComplete" />

  <div :class="{ 'opacity-0': !loaded, 'opacity-100': loaded }" class="transition-opacity duration-500">
    <AppNavbar />
    <main>
      <HeroSection />
      <ValueProposition />
      <MarqueeBand />
      <AdvisorPresentation />
      <TrustMetrics />
      <MarqueeBand />
      <TestimonialsSection />
      <PropertiesSection />
     <!-- <AdvisorVideo /> -->
      <ContactSection />
    </main>
    <AppFooter />
    <FloatingContactButton />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLenis } from './composables/useLenis.js'
import AppPreloader from './components/AppPreloader.vue'
import AppNavbar from './components/AppNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import ValueProposition from './components/ValueProposition.vue'
import MarqueeBand from './components/MarqueeBand.vue'
import AdvisorPresentation from './components/AdvisorPresentation.vue'
import TrustMetrics from './components/TrustMetrics.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import PropertiesSection from './components/PropertiesSection.vue'
import AdvisorVideo from './components/AdvisorVideo.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import FloatingContactButton from './components/FloatingContactButton.vue'

useLenis()

const loaded = ref(false)

function onPreloaderComplete() {
  loaded.value = true
}
</script>
