<template>
  <v-container>
    <h1>
    {{$route.query.anime}}
    </h1>
  </v-container>
</template>

<script>

export default {
  data(){
    return {
      links:[]
    }
  },
  async asyncData({ $route, $axios}){
    console.log('waiting for server response',$route)
    const sources = await $axios.$get('/api/')
    console.log('response',sources)
    return {sources}
  },
  mounted(){
    
  }
}
</script>

<style>

</style>