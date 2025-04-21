import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || ''
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    username: state => state.username,
    email: state => state.email
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.isLoggedIn = value
      localStorage.setItem('isLoggedIn', value)
    },
    SET_USERNAME(state, value) {
      state.username = value
      localStorage.setItem('username', value)
    },
    SET_EMAIL(state, value) {
      state.email = value
      localStorage.setItem('email', value)
    },
    LOGOUT(state) {
      state.isLoggedIn = false
      state.username = ''
      state.email = ''
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('rememberMe')
    }
  },
  actions: {
    login({ commit }, { username, rememberMe }) {
      commit('SET_LOGGED_IN', true)
      commit('SET_USERNAME', username)
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('rememberMe')
      }
    },
    register({ commit }, { username, email }) {
      commit('SET_LOGGED_IN', true)
      commit('SET_USERNAME', username)
      commit('SET_EMAIL', email)
    },
    logout({ commit }) {
      commit('LOGOUT')
    }
  }
}) 