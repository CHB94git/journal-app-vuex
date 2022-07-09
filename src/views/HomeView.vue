<template>
  <div class="home justify-content-center">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="goToDayBook" class="btn btn-primary">Ir a Journal</button>
  </div>
</template>


<script>
export default {
  methods: {
    goToDayBook () {
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>

