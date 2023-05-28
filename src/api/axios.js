import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Auth from '../services/auth'
import TokenStorage from '../services/storage'

axios.defaults.baseURL = 'http://34.101.41.38'
axios.defaults.withCredentials = true

//Buat sebuah objek axios baru khusus untuk permintaan di luar autentikasi dan registrasi
const axiosJWT = axios.create({ withCredentials: true })

axiosJWT.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}` //memasang header pada option create menghasilkan null pada suatu kondisi

  const oldToken = localStorage.getItem('accessToken')
  const { exp } = jwtDecode(oldToken)
  const currentTime = new Date().getTime()
  const isCurrentTokenExpired = exp * 1000 < currentTime
  if (isCurrentTokenExpired) {
    const refreshToken = localStorage.getItem('refreshToken')
    const token = await Auth.getNewAccessToken(refreshToken)
    config.headers.Authorization = `Bearer ${token}`
    TokenStorage.addAccessToken(token)
  }

  return config
})

export default axiosJWT
