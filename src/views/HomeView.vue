<script setup>
import { onMounted, ref } from 'vue'
import axiosJWT from '../api/axios'
import router from '../router'

const getData = async (path) => {
  try {
    const response = await axiosJWT.get(`/${path}/total`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const mailinsTotal = ref(0)
const mailoutsTotal = ref(0)
const mailinSources = ref([])
const mailoutSources = ref([])

const pushRouteTo = (path) => {
  router.push(`/${path}`)
}
onMounted(async () => {
  mailinsTotal.value = (await getData('suratmasuk')).data.total
  mailoutsTotal.value = (await getData('suratkeluar')).data.total

  mailinSources.value = (await getData('suratmasuk')).data.mailSource
  mailoutSources.value = (await getData('suratkeluar')).data.mailSource
})
</script>
<template>
  <div class="viewTitleContainer">
    <h1>Beranda</h1>
  </div>
  <div class="gridContainer">
    <div class="gridChild mailin cursor-pointer" @click="pushRouteTo('suratmasuk')">
      <h2>Total Surat Masuk</h2>
      <p class="total">{{ mailinsTotal }} Surat</p>
      <h3 class="text-xs">Sumber Surat :</h3>
      <ul class="mailSourceContainer">
        <li class="mailSource" v-for="data in mailinSources" :key="data.id">{{ data?.source }} - {{ data?.frequency }}</li>
      </ul>
    </div>
    <div class="gridChild mailout cursor-pointer" @click="pushRouteTo('suratkeluar')">
      <h2>Total Surat Keluar</h2>
      <p class="total">{{ mailoutsTotal }} Surat</p>
      <h3 class="text-xs">Sumber Surat :</h3>
      <ul class="mailSourceContainer">
        <li class="mailSource" v-for="data in mailoutSources" :key="data.id">{{ data?.source }} - {{ data?.frequency }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.total {
  @apply text-center text-lg p-6;
}
.mailSourceContainer {
  @apply mt-4;
}

.mailSource {
  @apply text-xs bg-gray-200 p-1 rounded-sm inline-block mr-2 mb-2;
}

.mailin {
  @apply border-b-4 border-green-200 transition-all;
}
.mailin:hover {
  @apply border-green-400;
}
.mailout {
  @apply border-b-4 border-red-200 transition-all;
}
.mailout:hover {
  @apply border-red-400;
}
</style>
