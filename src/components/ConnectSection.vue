<template>
  <section ref="sectionRef" class="relative min-h-screen overflow-hidden bg-off-white">
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-[min(100vh,880px)] md:min-h-[1080px]">
      <!-- Columna izquierda: COMPRAR / VENDER -->
      <div ref="leftCol" class="opacity-0">
        <button
          type="button"
          class="group relative flex h-full min-h-[50vh] w-full flex-col items-center justify-center bg-off-white px-4 py-16 text-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 md:min-h-[1080px] md:px-6 md:py-32"
          @click="openForm('comprar-vender')"
        >
        <!-- Overlay que oscurece la sección al hover -->
        <span class="connect-hover-overlay absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
        <span class="connect-label relative z-10 font-sans text-2xl font-medium tracking-wide text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          COMPRAR / VENDER
        </span>
        </button>
      </div>

      <!-- Columna derecha: PROYECTOS -->
      <div ref="rightCol" class="opacity-0">
        <button
          type="button"
          class="group relative flex h-full min-h-[50vh] w-full flex-col items-center justify-center bg-off-white px-4 py-16 text-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 md:min-h-[1080px] md:px-6 md:py-32"
          @click="openForm('proyectos')"
        >
          <!-- Overlay que oscurece la sección al hover -->
          <span class="connect-hover-overlay absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
          <span class="connect-label relative z-10 font-sans text-2xl font-medium tracking-wide text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            PROYECTOS
          </span>
        </button>
      </div>
    </div>

    <!-- Línea negra inferior -->
    <div class="h-px w-full bg-black" />

    <!-- Modal con formulario de contacto -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showModal"
          class="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="closeForm"
        >
          <div
            class="relative w-full max-w-md rounded-lg bg-black-alt border border-gray-border p-6 shadow-xl"
            role="dialog"
            aria-labelledby="form-title"
            aria-modal="true"
          >
            <button
              type="button"
              class="absolute right-4 top-4 rounded p-1 text-gray-muted transition-colors hover:text-white"
              aria-label="Cerrar"
              @click="closeForm"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 id="form-title" class="mb-6 font-display text-xl font-semibold text-white">
              {{ formTitle }}
            </h2>

            <form class="space-y-4" @submit.prevent="submitForm">
              <input type="hidden" name="tipo" :value="formTipo" />
              <div>
                <label for="connect-name" class="mb-1 block text-sm font-medium text-gray-muted">Nombre</label>
                <input
                  id="connect-name"
                  v-model="form.nombre"
                  type="text"
                  required
                  class="w-full rounded border border-gray-border bg-gray-card px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label for="connect-email" class="mb-1 block text-sm font-medium text-gray-muted">Email</label>
                <input
                  id="connect-email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full rounded border border-gray-border bg-gray-card px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label for="connect-phone" class="mb-1 block text-sm font-medium text-gray-muted">Teléfono</label>
                <input
                  id="connect-phone"
                  v-model="form.telefono"
                  type="tel"
                  class="w-full rounded border border-gray-border bg-gray-card px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="+52..."
                />
              </div>
              <div>
                <label for="connect-message" class="mb-1 block text-sm font-medium text-gray-muted">Mensaje</label>
                <textarea
                  id="connect-message"
                  v-model="form.mensaje"
                  rows="3"
                  required
                  class="w-full rounded border border-gray-border bg-gray-card px-4 py-2.5 text-white placeholder-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <div class="flex gap-3 pt-2">
                <GoldButton type="submit" variant="gold" class="flex-1 rounded px-4 py-2.5">
                  Enviar
                </GoldButton>
                <button
                  type="button"
                  class="rounded border border-gray-border px-4 py-2.5 text-gray-muted transition-colors hover:text-white"
                  @click="closeForm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import GoldButton from './ui/GoldButton.vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const leftCol = ref(null)
const rightCol = ref(null)
let ctx = null

const showModal = ref(false)
const formTipo = ref('comprar-vender')

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
})

const formTitle = computed(() =>
  formTipo.value === 'proyectos'
    ? 'Conectar — Proyectos'
    : 'Conectar — Comprar / Vender'
)

function openForm(tipo) {
  formTipo.value = tipo
  form.value = { nombre: '', email: '', telefono: '', mensaje: '' }
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeForm() {
  showModal.value = false
  document.body.style.overflow = ''
}

function submitForm() {
  // Aquí puedes enviar a tu backend o servicio (Formspree, etc.)
  console.log('Formulario:', { tipo: formTipo.value, ...form.value })
  alert('Gracias por tu mensaje. Te contactaremos pronto.')
  closeForm()
}

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo(
      leftCol.value,
      { x: -280, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    )
    gsap.fromTo(
      rightCol.value,
      { x: 280, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped>
.connect-label {
  position: relative;
  display: inline-block;
}
.connect-label::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 100%;
  background-color: #0a0a0a;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.35s ease;
}
.group:hover .connect-label::after,
.group:focus-visible .connect-label::after {
  transform: scaleX(1);
  transform-origin: left;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
