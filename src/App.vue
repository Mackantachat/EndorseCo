<template>
  <router-view/>
</template>

<style>

</style>
<script>
let brand = " | ระบบสลักหลัง CO";
export default ({
  name : 'App',
  watch:{
    $route(to){
      document.title = to.meta.title + brand
    }
  }
})
</script>