<template>
  <div class="container">
    <div class="block has-text-centered has-text-light mt-5 mx-5 is-flex is-flex-direction-column is-align-items-center">
      <div class="my-image" />
      <div class="my-text mb-4">
        <h1 class="title is-2 has-text-light">
          Hi, I'm {{ user.name }}
        </h1>
        <p class="subtitle is-5 has-text-light">
          A worldclass software and network engineer, with alot of experience under my belt.
          Welcome to my blog, this blog will be about software and network engineering.
        </p>
        <p> My id is {{ id }}</p>
      </div>
    </div>
    <!-- <div v-for="(post,i) in posts" :key="i" class="container max-width">
      <NuxtLink :to="`/${post.id}`">
        <Card :title="post.title" :description="post.description" author="Pepe" class="my-6" />
      </NuxtLink>
    </div> -->
    <template v-if="user.posts">
      <div v-for="(post,i) in user.posts" :key="i" class="container max-width">
        <NuxtLink :to="`/post/${post.id}`">
          <Card :id="user._id" :title="post.title" :description="post.description" :author="user.name" class="my-6" />
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  asyncData ({ params }) {
    return {
      id: params.id
    }
  },
  data () {
    return {
      user: ''
    }
  },
  async fetch () {
    const user = await fetch(`http://localhost:5000/users/${this.id}`)
    this.user = await user.json()
  }
}
</script>
