export default {
  namespaced: true,
  actions: {
    authenticate({ commit }, payload) {
      commit('SET_USER_PROFILE', payload, { root: true })
    }
  }
}
