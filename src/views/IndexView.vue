<script setup>
import { RouterView } from 'vue-router'
import SideMenu from '../components/SideMenu.vue'
import NavHeader from '../components/NavHeader.vue'
</script>
<template>
  <div class="flex w-full m-auto h-[100vh] box-border transition-all">
    <SideMenu></SideMenu>
    <div class="w-full h-[100vh] overflow-auto">
      <NavHeader />
      <RouterView />
    </div>
  </div>
</template>
