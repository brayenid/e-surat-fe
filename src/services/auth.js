import axios from 'axios'

const Auth = {
  getNewAccessToken: async (token) => {
    //selalu ingat gunakan try catch blok dalam axios untuk meng-handle error, karena tidak bisa manual dengan if else semata
    try {
      const response = await axios.put('/auth', {
        refreshToken: token
      })
      if (response.status === 200) {
        return response.data.data.accessToken
      }
    } catch (error) {
      return false
    }
  },
  deleteRefreshToken: async (token) => {
    try {
      await axios.delete('/auth', {
        data: {
          refreshToken: token
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default Auth
