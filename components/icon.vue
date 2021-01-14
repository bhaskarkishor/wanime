<template>
<a :href="home">
  <v-img src="wanime-logo.png" alt="wanime" height="50" width="250"/>
</a>
</template>

<script>
export default {
  computed:{
    home(){
      return `${process.env.baseUrl}`
    }
  }
}
</script>

<style>

</style>
