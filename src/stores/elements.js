import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useElement = defineStore('elements', () => {
  const sideMenuElement = ref(null)
  const hamburgerElement = ref(null)
  const modalDetailElement = ref(null)
  const searchBoxElement = ref(null)
  return {
    sideMenuElement,
    hamburgerElement,
    modalDetailElement,
    searchBoxElement
  }
})
