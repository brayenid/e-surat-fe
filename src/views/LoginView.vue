<script setup>
import { RouterLink } from 'vue-router'
import formSubmiter from '../components/helpers/formSubmiter'
import TokenStorage from '../services/storage'

const login = async (e) => {
  const response = await formSubmiter(e, {
    endpoint: '/auth',
    target: { name: 'home' }
  })

  TokenStorage.addAccessToken(response.data.accessToken)
  TokenStorage.addRefreshToken(response.data.refreshToken)
}
</script>

<template>
  <div class="flex justify-center items-center w-full h-screen">
    <div class="bg-white w-full max-w-[400px] mt-2 shadow-md rounded-sm overflow-hidden">
      <h1 class="bg-blue-500 p-4 text-white">Login Form</h1>
      <div class="p-4">
        <form @submit.prevent="login" id="register">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <div class="text-center p-2">
          <RouterLink to="/register" class="text-gray-500 hover:underline underline-offset-2">Register</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
