<script setup>
import HamburgerIcon from './icons/HamburgerIcon.vue'
import { useElement } from '../stores/elements'
import MenuHelper from './helpers/menu'

const useElementStore = useElement()

const menuToggle = () => {
  MenuHelper.toggleMenu(useElementStore)
}
</script>
<template>
  <button @click="menuToggle" class="hamburgerButton">
    <HamburgerIcon />
  </button>
</template>
