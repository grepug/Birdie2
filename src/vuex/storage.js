const storage = {
  onInit (state, store) {
    console.log(store)
  },
  onMutation (mutation, state, store) {
    console.log(mutation)
  }
}

export default storage
