const mutations = {
  INIT_STORE (state, data) {
    state.appId = data.appId;
  },
  EDIT_ID (state, note) {
    state.appId = note;
  }
};

export default mutations;
