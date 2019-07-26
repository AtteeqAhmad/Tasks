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
    activeBoard: {},
    lists: [],
    activeList: {},
    tasks: {
      /**
       * listId2: [{task1}, {task2}],
       * listId42: []
       */
    },
    activeTask: {},
    comments: [],
    activeComments: {}
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
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setActiveList(state, data) {
      state.activeList = data
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },
    setActiveTask(state, data) {
      state.activeTask = data
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.comments)
    },
    setActiveComment(state, data) {
      state.activeComment = data
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
    },



    async addList({ commit, dispatch }, listData) {
      api.post('lists', listData)
        .then(serverList => {
          dispatch('getListsByBoardId', listData.boardId)
        })
    },


    async getListsByBoardId({ commit, dispatch }, payload) {
      try {
        let res = await api.get('/boards/' + payload + '/lists/')
        commit("setLists", res.data)
      } catch (error) {
        console.error(error)
      }
    },


    async deleteList({ dispatch, commit }, payload) {
      try {
        let res = await api.delete('lists/' + payload)
        router.push({ name: 'lists' })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },

    // #region -- LISTS --

    async getTask({ commit, dispatch }) {
      api.get('tasks')
        .then(res => {
          commit('setTasks', res.data)
        })
    },

    async addTask({ commit, dispatch }, taskData) {
      api.post('tasks', taskData)
        .then(servertask => {
          dispatch('getTasksByListId', { _id: taskData.listId })
        })
    },

    async getTasksByListId({ dispatch, commit }, payload) {
      try {
        let res = await api.get('/lists/' + payload._id + '/tasks/')
        commit('setTasks', { tasks: res.data, listId: payload._id })
      } catch (error) {
        console.error(error)
      }
    },


    async deleteTask({ dispatch, commit }, payload) {
      try {
        let res = await api.delete('tasks/' + payload)
        router.push({ name: 'tasks' })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },



    async getComment({ commit, dispatch }) {
      api.get('comments')
        .then(res => {
          commit('setComments', res.data)
        })
    },

    async addComment({ commit, dispatch }, CommentData) {
      api.post('comments', CommentData)
        .then(serverComment => {
          dispatch('getCommentsByTaskId', { _id: CommentData.taskId })
        })
    },

    async getCommentsByTaskId({ dispatch, commit }, payload) {
      try {
        let res = await api.get('/tasks/' + payload._id + '/comments/')
        commit('setComments', { comments: res.data, taskId: payload._id })
      } catch (error) {
        console.error(error)
      }
    },

    async deleteComment({ dispatch, commit }, payload) {
      try {
        let res = await api.delete('comments/' + payload)
        router.push({ name: 'comments' })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
  }
})
