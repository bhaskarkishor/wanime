<template>
  <v-footer
    :padless="true"
    dark
  >
    <v-card
      flat
      tile
      width="100%"
      class="secondary text-center"
    >

      <v-img src="icon.png" alt="wanime" height="50" width="50" class="mx-auto" />
      <v-divider></v-divider>
      <v-card-text class="text-center white--text">

        <nuxt-link class="text-decoration-none mx-3 white--text" v-for="(link,i) in links" :key="i" :to="link.url">{{link.text}}</nuxt-link>
      </v-card-text>
      <v-card-subtitle>
        <strong>WAnime</strong> &copy; {{ new Date().getFullYear() }}
      </v-card-subtitle>
    </v-card>
  </v-footer>

</template>

<script>
export default {
  data(){
    return {
      links:[
        {
          text:'About',
          url:'/about'
        },
        {
          text:'Privacy Policy',
          url:'/policy'
        },
        {
          text:'Sitemap',
          url:'/sitemap'
        }
      ]
    }
  }
}
</script>

<style>

</style>
