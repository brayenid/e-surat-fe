<script setup>
import { onMounted, ref } from 'vue'
import axiosJWT from '../api/axios'
import formSubmiter from '../components/helpers/formSubmiter'
import { useElement } from '../stores/elements'
import SearchBox from '../components/SearchBox.vue'
import SearchIcon from '../components/icons/SearchIcon.vue'
import router from '../router'

const useElementStore = useElement()

const mailoutSubmit = async (e) => {
  await formSubmiter(e, {
    endpoint: '/suratkeluar',
    fetcher: axiosJWT
  })
  // setelah menambahkan data, load ulang dataMails
  currentPage.value = 1 // reset currentPage ke 1
  dataMails.value = await getDataMailsOut() // load ulang dataMails
}

const dataMails = ref([])
const currentPage = ref(1)
const pageSize = 10
const isLoadMore = ref(false)

const getDataMailsOut = async (page = currentPage.value, size = pageSize) => {
  const response = await axiosJWT.get(`/suratkeluar?page=${page}&size=${size}`)
  const newData = response.data.data

  if (newData.length < pageSize) {
    isLoadMore.value = false // set isLoadMore menjadi false jika data terakhir telah diambil
  } else {
    isLoadMore.value = true
  }

  if (page === 1) {
    dataMails.value = newData // jika currentPage adalah 1, maka set ulang dataMails ke newData
  } else {
    dataMails.value = [...dataMails.value, ...newData] // jika currentPage bukan 1, maka gabungkan newData dengan dataMails
  }

  return newData
}

const loadMore = async () => {
  currentPage.value += 1
  await getDataMailsOut(currentPage.value)
}

const showDetailMailOut = async (id) => {
  router.push(`/suratmasuk/${id}`)
}

const showSearchBox = () => {
  useElementStore.searchBoxElement.classList.remove('hide')
}

onMounted(async () => {
  await getDataMailsOut()
})
</script>
<template>
  <div class="relative">
    <SearchBox path="suratkeluar" />
    <div class="viewTitleContainer">
      <h1>Surat Keluar</h1>
      <button @click="showSearchBox"><SearchIcon /></button>
    </div>
    <div class="gridContainer">
      <div class="gridChild">
        <h2 class="p-2">Tambahkan Surat Keluar</h2>
        <div>
          <form @submit.prevent="mailoutSubmit">
            <div class="label">
              <label for="nomorBerkas">Nomor Berkas</label>
              <input type="text" name="nomorBerkas" placeholder="Nomor Berkas" id="nomorBerkas" />
            </div>
            <div class="label">
              <label for="alamatPenerima">Alamat Penerima</label>
              <input type="text" name="alamatPenerima" placeholder="Alamat Penerima" id="alamatPenerima" />
            </div>
            <div class="label">
              <label for="tanggalKeluar">Tanggal Keluar</label>
              <input type="date" name="tanggalKeluar" id="tanggalKeluar" />
            </div>
            <div class="label">
              <label for="perihal">Perihal</label>
              <input type="text" name="perihal" placeholder="Perihal" id="perihal" />
            </div>
            <button type="submit">Tambahkan</button>
          </form>
        </div>
      </div>
      <div class="gridChild">
        <div v-if="dataMails.length > 0">
          <div v-for="data in dataMails" :key="data.id" class="mailItem" @click="showDetailMailOut(data.id)">
            <p><strong>Perihal :</strong> {{ data.perihal }}</p>
            <p><strong>Nomor Berkas :</strong> {{ data.nomor_berkas }}</p>
            <p><strong>Tanggal Masuk :</strong> {{ data.tanggal_keluar }}</p>
            <div class="absolute bottom-0 right-0 max-w-full p-2 bg-red-200">
              <p>{{ data.alamat_penerima }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="p-4 text-center">Belum Ada Surat Keluar!</p>
        </div>
        <div class="text-center">
          <button v-if="isLoadMore" @click="loadMore" class="border-1 border-solid border-slate-900 text-center">Load More</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.mailItem {
  @apply p-4 pb-16 mb-4 bg-slate-50 shadow-sm rounded-sm text-sm relative cursor-pointer;
}
</style>
