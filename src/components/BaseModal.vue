<template>
  <Transition name="modal">
    <div v-if="modelValue" class="modal-overlay" @click.self="close">
      <slot :close="close" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'

/**
 * Contenedor de modales: aporta el comportamiento, no la apariencia.
 * La caja la pone quien lo usa vía slot, así conserva sus propias clases
 * y estilos (los scoped de la vista padre alcanzan al contenido del slot,
 * pero no llegarían a un elemento propio de este componente).
 */
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const close = () => emit('update:modelValue', false)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

// Centraliza el bloqueo del scroll, que antes cada modal repetía por su cuenta.
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
