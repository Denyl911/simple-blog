export const state = () => ({
  list: []
})

export const getters = {
  getById: state => (id) => {
    return state.list.find(post => post._id === id)
  }
}

export const actions = {
  async getPosts (context) {
    const res = await fetch('http://localhost:5000/posts')
    const data = await res.json()
    context.commit('setAll', data)
  },
  async addPost (context, post) {
    const data = JSON.stringify(post)
    const res = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.$auth.strategy.token.get()
      }
    })

    if (res.status === 200) {
      const data = await res.json()
      context.commit('addOnePost', data)
      return true
    }
    return false
  }
}

export const mutations = {
  // initialiseStore (state) {
  //   if (localStorage.getItem('user')) {
  //     state.user = JSON.parse(localStorage.getItem('user'))
  //   }
  // },
  setAll (state, data) {
    state.list = data
  },
  addOnePost (state, data) {
    state.list.push(data)
    this.$auth.user.posts.push(data)
  },
  setUser (state, data) {
    state.user = data
  }
}
