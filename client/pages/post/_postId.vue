<template>
  <div class="container">
    <div class="has-text-centered">
      <h1 class="title mt-6 block has-text-white">
        {{ getById.title }}
      </h1>
      <div>
        <h1 class="has-text-light">
          {{ getById.description }}
        </h1>
        <img :src="getById.image" class="my-6 post-image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getById () {
      return this.$store.getters.getById(this.$route.params.postId)
    }
  }
}
</script>

<style>
.post-image{
    width: 40rem;
    height: auto;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>
