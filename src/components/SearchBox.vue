<script setup>
import { onMounted, ref } from 'vue'
import { useElement } from '../stores/elements'
import axiosJWT from '../api/axios'
import router from '../router'

const useElementStore = useElement()

const props = defineProps({
  path: String
})

const searchBox = ref()
const searchValue = ref()
const fetchedResults = ref([])

const showDetail = async (id) => {
  router.push(`/${props.path}/${id}`)
}

const toggleSearchBox = () => {
  if (!searchBox.value?.classList?.contains('hide')) {
    searchBox.value?.classList?.add('hide')
  } else {
    searchBox.value?.classList?.remove('hide')
  }
}

const closeOutsideModal = (e) => {
  if (!e.target.closest('.searchPart')) {
    toggleSearchBox()
  }
}

const getDataBySearchValue = async (value) => {
  const { data } = await axiosJWT.get(`/${props.path}/search?q=${value}`)
  fetchedResults.value = data.data
}

let timerId
const debounceSearch = async (value) => {
  const delay = 800
  clearTimeout(timerId)
  timerId = setTimeout(async () => {
    await getDataBySearchValue(value)
  }, delay)
}

onMounted(() => {
  useElementStore.$patch({ searchBoxElement: searchBox.value })
  toggleSearchBox()
})
</script>

<template>
  <div ref="searchBox" class="searchBoxLayer" @click="closeOutsideModal">
    <div class="mt-4 max-w-[600px] w-full">
      <input type="text" placeholder="Search..." class="searchPart" v-model="searchValue" @input="debounceSearch(searchValue)" />
      <div class="resultBox">
        <p v-show="fetchedResults.length < 1" class="text-center p-4 text-sm text-gray-500 searchPart">No result</p>
        <ul v-show="fetchedResults.length > 0" class="resultList">
          <li v-for="data in fetchedResults" :key="data.id" @click="showDetail(data.id)" class="cursor-pointer">{{ data.perihal }} - {{ data.pengantar || data.alamat_penerima }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.searchBoxLayer {
  @apply absolute w-full h-screen bg-[rgba(0,0,0,0.4)] flex justify-center z-10;
}
input {
  @apply w-full py-4 px-6 rounded-t-md;
}
input:focus {
  @apply outline-none bg-gray-50;
}
.resultBox {
  @apply w-full bg-white rounded-b-md;
}
.hide {
  @apply hidden;
}
.resultList {
  @apply p-4 text-sm;
}
.resultList li {
  @apply border-b border-gray-200 p-2;
}
</style>
