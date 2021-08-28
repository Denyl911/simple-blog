<template>
  <b-navbar type="is-dark">
    <template #brand>
      <b-navbar-item tag="NuxtLink" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="NuxtLink" :active="$route.path == '/' ? true : false" to="/">
        Home
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item class="mr-5" href="https://github.com/Denyl911" target="_blank" rel="noopener noreferrer">
        <b-icon
          icon="github"
          size="is-medium"
          type="is-light"
        />
      </b-navbar-item>
      <b-navbar-item v-if="$auth.loggedIn" tag="NuxtLink" :active="$route.path == '/profile' ? true : false" to="/profile">
        <b-icon
          icon="account"
          type="is-light"
          class="px-4"
        />
      </b-navbar-item>
      <b-navbar-item v-else tag="NuxtLink" :active="$route.path == '/register' ? true : false" to="/register">
        Register
      </b-navbar-item>
      <b-navbar-item v-if="$auth.loggedIn" @click="logout">
        <b-icon
          icon="account-arrow-left"
          type="is-light"
          class="px-4"
        />
      </b-navbar-item>
      <b-navbar-item v-else tag="NuxtLink" :active="$route.path == '/login' ? true : false" to="/login">
        Login
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
