export default {
  namespaced: true,
  actions: {
    keyCloakAuthenticate({ commit }, payload) {
      console.log('set profile', payload)
      commit('SET_USER_PROFILE', payload, { root: true })
    }
  }
}
