<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <div class="has-background-dark p-5 login has-text-light has-text-centered" @keyup.enter="fetchRegister">
      <h1 class="title is-4 has-text-white mb-5">
        Register
      </h1>
      <b-field
        label="Name"
        label-position="inside"
      >
        <b-input
          v-model="name"
          type="text"
        />
      </b-field>
      <b-field
        label="Email"
        label-position="inside"
      >
        <b-input
          v-model="email"
          type="email"
        />
      </b-field>
      <b-field
        class="mt-4"
        label="Password"
        label-position="inside"
      >
        <b-input
          v-model="pass"
          type="password"
          password-reveal
        />
      </b-field>
      <div v-if="bad">
        <p>Invalid data</p>
      </div>
      <b-button class="mt-5" type="is-light" expanded @click="fetchRegister">
        Register
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      pass: '',
      bad: false
    }
  },
  methods: {
    async fetchRegister () {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          // avatar: "",
          password: this.pass
        })
      })
      const user = await res.json()
      this.$auth.setUserToken(user.token)
      this.$auth.setUser(user)
      if (res) {
        this.$router.push('/')
      } else {
        this.bad = true
      }
    }
  }
}
</script>

<style scoped>
.login{
    border-radius: 15px;
    position: relative;
    top:20vh
}
</style>
