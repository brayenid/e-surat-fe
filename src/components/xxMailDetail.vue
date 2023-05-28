<script setup>
import { onMounted, ref } from 'vue'
import { useElement } from '../stores/elements'
import deSnake from './helpers/deSnake'
import axiosJWT from '../api/axios'
import Swal from 'sweetalert2'
import CloseButton from './icons/CloseIcon.vue'
import router from '../router'

const useElementStore = useElement()
const dataProps = defineProps({
  mail: Object,
  fetcher: Function
})

const modalDetailElement = ref()

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
      toggleModal()
      await dataProps.fetcher()
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

const toggleModal = () => {
  if (!modalDetailElement.value.classList.contains('hide')) {
    modalDetailElement.value.classList.add('hide')
  } else {
    modalDetailElement.value.classList.remove('hide')
  }
}

const clickOutsideModal = (e) => {
  if (!e.target.closest('.modal')) {
    toggleModal()
  }
}

const editButton = async (id) => {
  const pathSplited = id.split('-')[0]
  await router.push(`/${pathSplited}/edit/${id}`)
}

onMounted(() => {
  useElementStore.$patch({ modalDetailElement: modalDetailElement.value })
  toggleModal()
})
</script>
<template>
  <div ref="modalDetailElement" class="modalDetail" @click="clickOutsideModal">
    <div class="modal">
      <div class="text-right">
        <button @click="toggleModal" class="bg-transparent hover:bg-transparent text-gray-800"><CloseButton /></button>
      </div>
      <div class="w-full text-center text-lg pb-8">
        <h2>Detail Surat</h2>
      </div>
      <table class="table table-auto w-full text-sm">
        <tr v-for="(data, index) in dataProps.mail" :key="data.id">
          <td>{{ deSnake(index) }}</td>
          <td>:</td>
          <td>{{ data }}</td>
        </tr>
      </table>
      <div class="w-full p-4 flex gap-2 justify-center items-center">
        <button @click="editButton(dataProps.mail.id)">Edit</button>
        <button @click="deleteMail(dataProps.mail.id)" class="bg-red-600 hover:bg-red-700">Hapus</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
table {
  @apply border-collapse border-gray-100 p-4;
}
td {
  @apply border-b border-l-0 border-r-0 border-solid border-gray-200 p-2;
}
.modalDetail {
  @apply absolute w-full h-screen bg-[rgba(0,0,0,0.3)] z-50 flex justify-center;
}
.hide {
  @apply hidden;
}
.modal {
  @apply w-full max-w-[550px] bg-white px-6 py-4 rounded-md h-max mt-4;
}
</style>
