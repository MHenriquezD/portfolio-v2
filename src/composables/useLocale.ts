import { ref, computed } from 'vue'
import { ui, type UiKey } from '@/i18n/ui'

export type Locale = 'es' | 'en'

/** Texto que puede estar traducido o ser una cadena suelta todavía sin traducir. */
export type Translatable = string | Partial<Record<Locale, string>>
export type TranslatableList = string[] | Partial<Record<Locale, string[]>>

const STORAGE_KEY = 'locale'

const detectar = (): Locale => {
  const guardado = localStorage.getItem(STORAGE_KEY)
  if (guardado === 'es' || guardado === 'en') return guardado
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es'
}

// Estado compartido por todos los componentes que usen el composable.
const locale = ref<Locale>(detectar())

export const useLocale = () => {
  const setLocale = (valor: Locale) => {
    locale.value = valor
    localStorage.setItem(STORAGE_KEY, valor)
    document.documentElement.lang = valor
  }

  const toggleLocale = () => setLocale(locale.value === 'es' ? 'en' : 'es')

  /** Texto de interfaz por clave. */
  const t = (key: UiKey): string => ui[locale.value][key] ?? ui.es[key] ?? key

  /**
   * Texto que viene de los JSON de contenido. Acepta strings sueltos para que
   * un campo sin traducir siga funcionando en vez de romper.
   */
  const tr = (valor: Translatable | undefined): string => {
    if (valor == null) return ''
    if (typeof valor === 'string') return valor
    return valor[locale.value] ?? valor.es ?? valor.en ?? ''
  }

  const trList = (valor: TranslatableList | undefined): string[] => {
    if (valor == null) return []
    if (Array.isArray(valor)) return valor
    return valor[locale.value] ?? valor.es ?? valor.en ?? []
  }

  return {
    locale: computed(() => locale.value),
    isEnglish: computed(() => locale.value === 'en'),
    setLocale,
    toggleLocale,
    t,
    tr,
    trList,
  }
}
