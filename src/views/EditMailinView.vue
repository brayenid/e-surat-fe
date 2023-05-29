<script setup>
import { useRoute } from 'vue-router'
import axiosJWT from '../api/axios'
import { onMounted, ref } from 'vue'
import router from '../router'
import formSubmiter from '../components/helpers/formSubmiter'
import Swal from 'sweetalert2'

const route = useRoute()

const nomorBerkas = ref()
const tanggalMasuk = ref()
const nomorSurat = ref()
const perihal = ref()
const pengantar = ref()
const params = route.params.id

const mailinEditSubmit = async (e) => {
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
      endpoint: `/suratmasuk/${params}`,
      fetcher: axiosJWT,
      method: 'PUT',
      target: '/suratmasuk'
    })
  }
}

const goPrev = () => {
  router.back()
}

onMounted(async () => {
  try {
    const { data } = (await axiosJWT.get(`/suratmasuk/${route.params.id}`)).data
    nomorBerkas.value = data.nomor_berkas
    tanggalMasuk.value = data.tanggal_masuk
    nomorSurat.value = data.nomor_surat
    perihal.value = data.perihal
    pengantar.value = data.pengantar
  } catch (error) {
    await router.push('/')
  }
})
</script>
<template>
  <div class="relative">
    <div class="viewTitleContainer">
      <h1>Edit Surat Masuk</h1>
    </div>
    <div class="editContainer">
      <form @submit.prevent="mailinEditSubmit">
        <div class="label">
          <label for="nomorBerkas">Nomor Berkas</label>
          <input type="text" name="nomorBerkas" placeholder="Nomor Berkas" id="nomorBerkas" v-model="nomorBerkas" />
        </div>
        <div class="label">
          <label for="tanggalMasuk">Tanggal Masuk</label>
          <input type="date" name="tanggalMasuk" id="tanggalMasuk" v-model="tanggalMasuk" />
        </div>
        <div class="label">
          <label for="nomorSurat">Nomor Surat</label>
          <input type="text" name="nomorSurat" placeholder="Nomor Surat" id="nomorSurat" v-model="nomorSurat" />
        </div>
        <div class="label">
          <label for="perihal">Perihal</label>
          <input type="text" name="perihal" placeholder="Perihal" id="perihal" v-model="perihal" />
        </div>
        <div class="label">
          <label for="pengantar">Pengantar</label>
          <input type="text" name="pengantar" placeholder="Pengantar" id="pengantar" v-model="pengantar" />
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
