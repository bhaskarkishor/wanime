<template>
  <v-footer
    :padless="true"
    dark
  >
    <v-card
      flat
      tile
      width="100%"
      class="secondary"
    >

      <v-card-text class="white--text " >
         <v-img src="wanime-logo.png" alt="wanime" height="25" width="125" />
         <div class="text-right">
        <nuxt-link class="text-decoration-none mx-3 white--text" to="/about">About</nuxt-link>
        <nuxt-link class="text-decoration-none mx-3 white--text" to="/termsandconditions">Terms & Conditions</nuxt-link>
         </div></v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-center white--text">
        <strong>WAnime</strong> &copy; {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>

</template>

<script>
export default {

}
</script>

<style>

</style>
