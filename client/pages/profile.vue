<template>
  <div class="container">
    <div class="block has-text-centered has-text-light mt-5 mx-5 is-flex is-flex-direction-column is-align-items-center">
      <div class="my-image" />
      <div class="my-text mb-4">
        <h1 class="title is-2 has-text-light">
          Hi, {{ $auth.user.name }}
        </h1>
        <p class="subtitle is-5 has-text-light">
          A worldclass software and network engineer, with alot of experience under my belt.
          Welcome to my blog, this blog will be about software and network engineering.
        </p>
        <p> Your id is {{ $auth.user._id }}</p>
      </div>
    </div>
    <template v-if="$auth.user.posts">
      <div v-for="(post,i) in $auth.user.posts" :key="i" class="container max-width">
        <NuxtLink :to="`/post/${post.id}`">
          <Card :id="$auth.user._id" :title="post.title" :description="post.description" :author="$auth.user.name" class="my-6" />
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  middleware: 'auth',
  data () {
    return {

    }
  }

}
</script>
