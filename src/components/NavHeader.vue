<script setup>
import UserIcon from './icons/UserIcon.vue'
import HamburgerButton from './HamburgerButton.vue'
import Auth from '../services/auth'
import router from '../router'
import TokenStorage from '../services/storage'

const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  await Auth.deleteRefreshToken(refreshToken)

  TokenStorage.removeAccessToken()
  TokenStorage.removeRefreshToken()
  router.push({ name: 'Login' })
}
</script>
<template>
  <div class="bg-blue-500 flex justify-between p-3 text-white">
    <div>
      <HamburgerButton />
    </div>
    <ul>
      <li>
        <button @click="logout"><UserIcon /></button>
      </li>
    </ul>
  </div>
</template>
