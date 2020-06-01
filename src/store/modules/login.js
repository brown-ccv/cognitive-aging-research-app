export default {
  namespaced: true,
  actions: {
    keyCloakAuthenticate({ commit }, payload) {
      commit('SET_USER_PROFILE', payload, { root: true })
    }
  }
}
