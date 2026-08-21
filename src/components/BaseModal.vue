<template>
  <Transition name="modal">
    <div
      v-show="modelValue"
      class="modal-overlay"
      :class="overlayClass"
      @click.self="close"
    >
      <div class="modal-box" :class="boxClass">
        <button v-if="closable" class="modal-close" aria-label="Cerrar" @click="close">
          <i class="fas fa-times"></i>
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    /** Clase extra para la caja, p. ej. modal-container o modal-certificado */
    boxClass?: string
    overlayClass?: string
    /** El botón de cerrar se oculta cuando el contenido trae el suyo */
    closable?: boolean
  }>(),
  { closable: true },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const close = () => emit('update:modelValue', false)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

// El bloqueo del scroll se centraliza acá: antes cada modal lo hacía por su
// cuenta y cerrar uno podía devolver el scroll con otro todavía abierto.
watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    if (open) window.addEventListener('keydown', onKeydown)
    else window.removeEventListener('keydown', onKeydown)
  },
)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped src="../assets/modal.css"></style>
