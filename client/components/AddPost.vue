<template>
  <section class="container has-text-centered">
    <b-button
      label="Añadir post + "
      rounded
      type="is-primary"
      size="is-medium"
      @click="isPostModal = true"
    />
    <b-modal v-model="isPostModal">
      <div class="container">
        <div class="card has-background-grey-light">
          <div class="card-content">
            <h1 class="title is-5">
              Crea un nuevo post
            </h1>
            <b-field label="Titulo">
              <b-input v-model="title" />
            </b-field>
            <b-field label="Descripcion">
              <b-input v-model="description" maxlength="500" type="textarea" />
            </b-field>
            <!-- <b-field label="Imagen">
              <b-input v-model="title" type="file" />
            </b-field> -->
            <div class="has-text-centered">
              <b-button
                label="Publicar"
                rounded
                type="is-success"
                @click="addPost"
              />
              <b-button
                label="Cancelar"
                rounded
                type="is-danger"
                @click="isPostModal = false"
              />
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      isPostModal: false
    }
  },
  methods: {
    async addPost () {
      const res = await this.$store.dispatch('addPost', {
        title: this.title,
        description: this.description,
        user: {
          id: this.$auth.user._id,
          name: this.$auth.user.name
        }
      })
      if (res) {
        this.isPostModal = false
        this.$buefy.toast.open({
          message: 'Post añadido correctamente',
          type: 'is-success'
        })
      } else {
        this.$buefy.toast.open({
          message: 'Ocorrio un problema',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

<style scoped>
.max-70{
    max-width: 60%;
}
</style>
