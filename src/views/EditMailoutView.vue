<script setup>
import { useRoute } from 'vue-router'
import axiosJWT from '../api/axios'
import { onMounted, ref } from 'vue'
import router from '../router'
import formSubmiter from '../components/helpers/formSubmiter'
import Swal from 'sweetalert2'

const route = useRoute()

const nomorBerkas = ref()
const alamatPenerima = ref()
const tanggalKeluar = ref()
const perihal = ref()
const params = route.params.id

const mailoutEditSubmit = async (e) => {
  const { isConfirmed } = await Swal.fire({
    title: 'Yakin ingin mengubah surat?',
    text: 'Surat yang diubah tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ubah!',
    cancelButtonText: 'Batal'
  })
  if (isConfirmed) {
    await formSubmiter(e, {
      endpoint: `/suratkeluar/${params}`,
      fetcher: axiosJWT,
      method: 'PUT',
      target: '/suratkeluar'
    })
  }
}

const goPrev = () => {
  router.back()
}

onMounted(async () => {
  try {
    const { data } = (await axiosJWT.get(`/suratkeluar/${route.params.id}`)).data

    nomorBerkas.value = data.nomor_berkas
    alamatPenerima.value = data.alamat_penerima
    tanggalKeluar.value = data.tanggal_keluar
    perihal.value = data.perihal
  } catch (error) {
    await router.push('/')
  }
})
</script>
<template>
  <div class="relative">
    <div class="viewTitleContainer">
      <h1>Edit Surat Keluar</h1>
    </div>
    <div class="editContainer">
      <form @submit.prevent="mailoutEditSubmit">
        <div class="label">
          <label for="nomorBerkas">Nomor Berkas</label>
          <input type="text" name="nomorBerkas" placeholder="Nomor Berkas" id="nomorBerkas" v-model="nomorBerkas" />
        </div>
        <div class="label">
          <label for="alamatPenerima">Alamat Penerima</label>
          <input type="text" name="alamatPenerima" placeholder="Alamat Penerima" id="alamatPenerima" v-model="alamatPenerima" />
        </div>
        <div class="label">
          <label for="tanggalKeluar">Tanggal Keluar</label>
          <input type="date" name="tanggalKeluar" id="tanggalKeluar" v-model="tanggalKeluar" />
        </div>
        <div class="label">
          <label for="perihal">Perihal</label>
          <input type="text" name="perihal" placeholder="Perihal" id="perihal" v-model="perihal" />
        </div>
        <button type="submit">Ubah</button>
        <a href="#back" @click.prevent="goPrev()" class="text-center text-sm text-red-500 hover:underline">Batal</a>
      </form>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.editContainer {
  @apply max-w-lg w-full rounded-sm m-auto p-6 shadow-sm my-4 bg-white;
}
</style>
