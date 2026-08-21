<template>
  <div ref="wrapRef" class="avatar-hero" :style="estilo">
    <div class="avatar-halo"></div>
    <img :src="src" :alt="alt" class="avatar-img" width="320" height="320" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

withDefaults(defineProps<{ src: string; alt?: string }>(), {
  alt: 'Avatar ilustrado de Manuel Henriquez',
})

const wrapRef = ref<HTMLElement | null>(null)
const estilo = ref({ '--giro-x': '0deg', '--giro-y': '0deg' })

// Sin seguimiento si no hay puntero real o si se pidió menos movimiento.
const activo =
  window.matchMedia('(hover: hover)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

let raf = 0

const alMover = (e: MouseEvent) => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const el = wrapRef.value
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    // Acotado a [-1, 1] para que la inclinación no se dispare en pantallas anchas.
    const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)))
    const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)))
    estilo.value = { '--giro-y': `${dx * 7}deg`, '--giro-x': `${-dy * 7}deg` }
  })
}

onMounted(() => {
  if (activo) window.addEventListener('mousemove', alMover, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', alMover)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<style scoped>
.avatar-hero {
  position: relative;
  width: 100%;
  max-width: 190px;
  aspect-ratio: 1;
  margin: 0 auto 1.5rem;
  perspective: 600px;
}

.avatar-img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  /* La imagen ya viene recortada en círculo; el radio es por si se reemplaza. */
  border-radius: 50%;
  transform: rotateX(var(--giro-x, 0deg)) rotateY(var(--giro-y, 0deg));
  transition: transform 0.25s ease-out;
  animation: avatar-flotar 6s ease-in-out infinite;
}

/* Halo que respira detrás, con el azul de la marca. */
.avatar-halo {
  position: absolute;
  inset: -12%;
  border-radius: 50%;
  /* Sin filter: blur. El degradado radial ya es suave, y un blur animado
     obliga a recalcular el desenfoque en cada frame. Solo se anima opacity,
     que el compositor resuelve sin repintar. */
  background: radial-gradient(circle, rgba(100, 181, 246, 0.3) 0%, transparent 70%);
  animation: avatar-halo 6s ease-in-out infinite;
  will-change: opacity;
}

@keyframes avatar-flotar {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -8px; }
}

@keyframes avatar-halo {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.95; }
}

@media (prefers-reduced-motion: reduce) {
  .avatar-img,
  .avatar-halo {
    animation: none;
  }
  .avatar-img {
    transition: none;
  }
}

@media (max-width: 950px) {
  .avatar-hero {
    max-width: 150px;
  }
}
</style>
