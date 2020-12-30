import Cookies from 'js-cookie'

export default {
  getToken() {
    return Cookies.get('vAdmin') || ''
  },
  setToken(token) {
    Cookies.set('vAdmin', token)
  },
}
