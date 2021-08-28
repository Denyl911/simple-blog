<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <div class="has-background-dark p-5 login has-text-light has-text-centered" @keyup.enter="fetchLogin">
      <h1 class="title is-4 has-text-white mb-5">
        Login
      </h1>
      <b-field label="Email" label-position="inside">
        <b-input v-model="email" type="email" />
      </b-field>
      <b-field class="mt-4" label="Password" label-position="inside">
        <b-input v-model="pass" type="password" password-reveal />
      </b-field>
      <p>{{ keyname }}</p>
      <div v-if="bad">
        <p>Password or email are incorrect</p>
        <p>{{ keyname }}</p>
      </div>
      <b-button class="mt-5" type="is-light" expanded @click="fetchLogin">
        Log in
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: 'test@test.com',
      pass: '1234',
      bad: false
    }
  },
  methods: {
    async fetchLogin () {
      const user = await this.$auth.loginWith('local', {
        data: { email: this.email, password: this.pass }
      })
      this.$auth.setUser(user.data)
      //   const res = await this.$store.dispatch('login', { email: this.email, pass: this.pass })
      //   if (res) {
      //     this.$router.push('/profile')
      //   } else {
      //     this.bad = true
      //   }
    }
  }
}
</script>

<style scoped>
.login {
  border-radius: 15px;
  position: relative;
  top: 20vh;
}
</style>
