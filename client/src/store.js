import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, data) {
      state.activeBoard = data
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('setUser', {})
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      try {
        let res = await api.get('boards')
        commit('setBoards', res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async getBoardById({ dispatch, commit }, payload) {
      try {
        let res = await api.get('boards/' + payload.boardId)
        commit('setActiveBoard', res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async addBoard({ commit, dispatch }, payload) {
      try {
        let res = await api.post('boards/', payload)
        dispatch('getBoards')
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion
    async deleteBoard({ dispatch, commit }, payload) {
      try {
        let res = await api.delete('boards/' + payload)
        router.push({ name: 'boards' })
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }
})