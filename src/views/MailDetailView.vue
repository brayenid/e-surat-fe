<script setup>
import { useRoute } from 'vue-router'
import axiosJWT from '../api/axios'
import { onMounted, ref } from 'vue'
import deSnake from '../components/helpers/deSnake'
import router from '../router'
import Swal from 'sweetalert2'

const route = useRoute()
const path = route.params.id.split('-')[0]
const dataDetail = ref()

const titleValue = path === 'suratmasuk' ? 'Rincian Surat Masuk' : 'Rincian Surat Keluar'

const getDataDetail = async () => {
  try {
    dataDetail.value = (await axiosJWT.get(`/${path}/${route.params.id}`)).data.data
  } catch (error) {
    router.push({
      name: 'NotFound'
    })
  }
}

const editButton = async (id) => {
  const pathSplited = id.split('-')[0]
  await router.push(`/${pathSplited}/edit/${id}`)
}

const deleteMail = async (id) => {
  // const isDelete = confirm('Yakin ingin menghapus?')
  const { isConfirmed } = await Swal.fire({
    title: 'Yakin ingin menghapus surat?',
    text: 'Surat yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Hapus!',
    cancelButtonText: 'Batal'
  })
  if (isConfirmed) {
    const mailType = id.split('-')[0]
    try {
      await axiosJWT.delete(`/${mailType}/${id}`)
      router.push(`/${path}`)
      Swal.fire({
        icon: 'success',
        text: 'Surat Telah Dihapus!'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Surat Gagal Dihapus!'
      })
    }
  }
}

const goPrev = () => {
  router.back()
}

onMounted(async () => {
  await getDataDetail()
})
</script>

<template>
  <div class="viewTitleContainer">
    <h1>{{ titleValue }}</h1>
  </div>
  <div class="detailContainer">
    <table class="table table-auto w-full text-sm">
      <tr v-for="(data, index) in dataDetail" :key="data.id">
        <td>{{ deSnake(index) }}</td>
        <td>:</td>
        <td>{{ data }}</td>
      </tr>
    </table>
    <div v-show="dataDetail" class="w-full p-4 flex gap-2 justify-center items-center">
      <button @click="editButton(route.params.id)">Edit</button>
      <button @click="deleteMail(route.params.id)" class="bg-red-600 hover:bg-red-700">Hapus</button>
      <button @click="goPrev()" class="bg-orange-600 hover:bg-orange-700">Kembali</button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.detailContainer {
  @apply max-w-md w-full rounded-sm m-auto p-6 shadow-sm my-4 bg-white;
}
td {
  @apply border-b border-l-0 border-r-0 border-solid border-gray-200 p-2;
}
</style>
