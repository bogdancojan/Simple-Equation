import axios from 'axios'

const state = {
  equation: ''
}

const mutations = {
  setEquation(state, equation) {
    state.equation = equation
  }
}

const actions = {
  async fetchEquation({ commit }) {
    try {
      const response = await axios.get('http://localhost:4567/generate_equation')
      commit('setEquation', response.data.equation)
    } catch (error) {
      console.error('Error fetching equation:', error)
    }
  }
}

const getters = {
  equation: state => state.equation
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}