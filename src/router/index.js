import jwtDecode from 'jwt-decode'
import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import HomeView from '../views/HomeView.vue'
import MailinView from '../views/MailinView.vue'
import MailDetailView from '../views/MailDetailView.vue'
import MailoutView from '../views/MailoutView.vue'
import RegisterView from '../views/RegisterView.vue'
import ErrorView from '../views/ErrorView.vue'
import LoginView from '../views/LoginView.vue'
import Auth from '../services/auth'
import TokenStorage from '../services/storage'
import EditMailinView from '../views/EditMailinView.vue'
import EditMailoutView from '../views/EditMailoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'activeNav',
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: ErrorView
    },
    {
      path: '/',
      name: 'Index',
      component: IndexView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/suratmasuk',
          name: 'suratmasuk',
          component: MailinView
        },
        {
          path: '/suratmasuk/:id',
          name: 'suratmasukDetail',
          component: MailDetailView
        },
        {
          path: '/suratmasuk/edit/:id',
          name: 'suratmasukEdit',
          component: EditMailinView
        },
        {
          path: '/suratkeluar',
          name: 'suratkeluar',
          component: MailoutView
        },
        {
          path: '/suratkeluar/:id',
          name: 'suratkeluarDetail',
          component: MailDetailView
        },
        {
          path: '/suratkeluar/edit/:id',
          name: 'suratkeluarEdit',
          component: EditMailoutView
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    }
  ]
})

//autentikasi tingkat route
const isAuthenticated = async () => {
  //mendapatkan token dari storage
  const token = localStorage.getItem('accessToken')
  if (token) {
    //jika mendapatkan token, lakukan decoded dan ambil exp dari token
    const decodedToken = jwtDecode(token)
    const exp = decodedToken.exp * 1000 // waktu kadaluarsa dalam millisecond
    const now = new Date().getTime()
    if (now < exp) {
      //jika token masih berlaku
      return true
    } else {
      //jika token sudah kadaluarsa, lakukan permintaan ke server untuk accesstoken baru dengan refresh token yang valid
      const refreshToken = localStorage.getItem('refreshToken')
      const accessToken = await Auth.getNewAccessToken(refreshToken)
      if (accessToken) {
        //setor access token baru ke storage
        TokenStorage.addAccessToken(accessToken)
        return true
      } else {
        //jika semua sesi di atas tidak berjalan sesuai, seperti token tidak valid maka hapus token dari storage dan kembalikan false
        TokenStorage.removeAccessToken()
        TokenStorage.removeRefreshToken()
        return false
      }
    }
  } else {
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  const auth = await isAuthenticated()
  if (to.name !== 'Login' && to.name !== 'Register' && !auth) next({ name: 'Login' })
  if (to.name === 'Login' && auth) next({ name: 'home' })
  else next()
})

export default router
