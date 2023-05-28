const TokenStorage = {
  addAccessToken: (token) => {
    localStorage.setItem('accessToken', token)
  },
  removeAccessToken: () => {
    localStorage.removeItem('accessToken')
  },
  addRefreshToken: (token) => {
    localStorage.setItem('refreshToken', token)
  },
  removeRefreshToken: () => {
    localStorage.removeItem('refreshToken')
  }
}

export default TokenStorage
