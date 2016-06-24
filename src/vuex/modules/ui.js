const state = {
  sortableListSorted: false
}

const mutations = {
  'UI_SORTABLE_SORTED' (state, flag) {
    state.sortableListSorted = flag
  }
}

export default {
  state,
  mutations
}
