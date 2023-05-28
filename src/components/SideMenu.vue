<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import HomeIcon from './icons/HomeIcon.vue'
import MailinIcon from './icons/MailinIcon.vue'
import MailoutIcon from './icons/MailoutIcon.vue'
import { useElement } from '../stores/elements'
import MenuHelper from './helpers/menu'

const sideMenu = ref()
const useElementStore = useElement()

const closeMenu = (e) => {
  const isMenuClicked = e.target.closest('.sideMenu') !== null
  const isHamburgerButtonClicked = e.target.closest('.hamburgerButton') !== null
  const isSmallScreen = window.innerWidth <= 768

  if (!isMenuClicked && isSmallScreen && !isHamburgerButtonClicked) {
    MenuHelper.closeMenu(useElementStore)
  }
}

onMounted(() => {
  useElementStore.$patch({ sideMenuElement: sideMenu.value })
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})
</script>
<template>
  <nav ref="sideMenu" class="sideMenu">
    <h2 class="text-center font-bold text-gray-800 py-5 uppercase pb-8">E-Surat</h2>
    <ul ref="menuList" class="flex flex-col gap-5 text-gray-600">
      <li>
        <RouterLink to="/"><HomeIcon class="icon" /> Beranda</RouterLink>
      </li>
      <li>
        <RouterLink to="/suratmasuk"><MailinIcon class="icon" /> Surat Masuk</RouterLink>
      </li>
      <li>
        <RouterLink to="/suratkeluar"><MailoutIcon class="icon" /> Surat Keluar</RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped lang="postcss">
a {
  @apply flex w-full gap-6 items-center p-2 px-4 border-l-4 border-solid border-l-transparent;
}
.activeNav {
  @apply font-semibold border-l-4 border-solid border-l-blue-500 text-blue-500;
}
nav {
  @apply bg-white shadow-md rounded-sm text-sm transition-all min-w-[250px] -translate-x-full fixed md:block md:translate-x-0 md:static h-full;
}
.hideMenu {
  @apply -translate-x-full fixed z-50;
}
.showMenu {
  @apply translate-x-0 fixed z-50;
}
</style>
