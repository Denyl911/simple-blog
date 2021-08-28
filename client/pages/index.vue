<template>
  <div class="container">
    <div class="block has-text-centered has-text-light mt-5 mx-5 is-flex is-flex-direction-column is-align-items-center">
      <div class="my-image" />
      <div class="my-text mb-4">
        <h1 class="title is-2 has-text-light">
          Hi, All
        </h1>
        <p class="subtitle is-5 has-text-light">
          A worldclass software and network engineer, with alot of experience under my belt.
          Welcome to my blog, this blog will be about software and network engineering.
        </p>
      </div>
    </div>
    <template v-if="$auth.loggedIn">
      <AddPost />
    </template>
    <div v-for="(post,i) in posts" :key="i" class="container max-width">
      <NuxtLink :to="`/post/${post._id}`">
        <Card :id="post.user.id" :title="post.title" :description="post.description" :author="post.user.name" class="my-6" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  data () {
    return {
    }
  },
  async fetch () {
    await this.$store.dispatch('getPosts')
  },
  computed: {
    posts () {
      return this.$store.state.list
    }
  }
}
</script>

<style scoped>
.my-image{
  background-image: url(~/assets/astro.jpg);
  background-position: center;
  background-size: cover;
  width: 150px;
  height: 150px;
  border-radius: 9999px
}
.my-text{
  max-width: 60%;
}
.max-width{
  max-width: 80%;
}
</style>
