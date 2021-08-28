<template>
  <div class="container">
    <div class="card has-background-dark has-text-light">
      <header class="card-header">
        <p class="card-header-title has-text-white is-size-5">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="has-text-centered">
            {{ description }}
          </div>
          <template v-if="$auth.user">
            <NuxtLink v-if="$auth.user._id===id" to="/profile">
              <div class="my-3 ml-5 has-text-left is-italic is-size-7">
                - {{ author }}
              </div>
            </NuxtLink>
            <NuxtLink v-else :to="`/user/${id}`">
              <div class="my-3 ml-5 has-text-left is-italic is-size-7">
                - {{ author }}
              </div>
            </NuxtLink>
          </template>
          <NuxtLink v-else :to="`/user/${id}`">
            <div class="my-3 ml-5 has-text-left is-italic is-size-7">
              - {{ author }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: String,
    title: String,
    author: String,
    id: String
  }
}
</script>
