import axios from 'axios'
import router from '../../router'
import Swal from 'sweetalert2'

const fetchPostRegister = async (endpoint, input, fetcher = axios, method = 'POST') => {
  try {
    if (method === 'POST') {
      const response = await fetcher.post(endpoint, input)
      if (!response.status) {
        fetchPostRegister(endpoint, input)
      }
      Swal.fire({
        icon: 'success',
        text: response.data.message,
        width: '16em'
      })
      return response
    } else if (method === 'PUT') {
      const response = await fetcher.put(endpoint, input)
      if (!response.status) {
        fetchPostRegister(endpoint, input)
      }
      Swal.fire({
        icon: 'success',
        text: response.data.message,
        width: '16em'
      })
      return response
    }
  } catch (error) {
    console.error(error.response.data.message)
    Swal.fire({
      icon: 'error',
      text: error.response.data.message,
      width: '16em'
    })
  }
}

const formSubmiter = async (event, { endpoint, target, fetcher, method }) => {
  const form = new FormData(event.target)
  const input = Object.fromEntries(form.entries())
  const response = await fetchPostRegister(endpoint, input, fetcher, method)
  if ((target && response?.status === 201) || (target && response?.status === 200)) {
    router.push(target)
  }
  return response?.data
}

export default formSubmiter
