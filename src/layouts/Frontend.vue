<template>
  <Nav />
  <main>
    <router-view />
  </main>
</template>

<script>
import Nav from '@/components/frontend/Nav.vue'

export default {
  name: 'FrontendLayout',
  components: {
    Nav
  }
}
</script>

<style lang="css">


  /* .select2.select2-container.select2-container--default {
       position: revert;
  }
  .select2-container .select2-selection--single .select2-selection__clear{
       position: revert;
  } */
</style>
