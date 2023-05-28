<script setup>
import { RouterLink } from 'vue-router'

import formSubmiter from '../components/helpers/formSubmiter'

const register = (e) => {
  formSubmiter(e, {
    endpoint: '/users',
    target: { name: 'Login' }
  })
}
</script>

<template>
  <div class="flex justify-center items-center w-full h-screen">
    <div class="bg-white w-full max-w-[400px] mt-2 shadow-md rounded-sm overflow-hidden">
      <h1 class="bg-blue-500 p-4 text-white">Registration Form</h1>
      <div class="p-4">
        <form @submit.prevent="register" id="register">
          <input type="text" name="username" placeholder="Username" required />
          <input type="text" name="fullname" placeholder="Fullname" required />
          <input type="text" name="role" placeholder="Role" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" class="p-2 rounded-md bg-blue-500 text-white">Register</button>
        </form>
        <div class="text-center p-2">
          <RouterLink to="/login" class="text-gray-500 hover:underline underline-offset-2">Login</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
