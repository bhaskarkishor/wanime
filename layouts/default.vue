<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-spacer/>
      <nuxt-link to="/">
          <v-img to="/" src="w.png" alt="wanime" height="40" width="40"/>

      </nuxt-link>
      <v-spacer/>
    </v-app-bar>

    <v-main class="accent">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
            class="mx-auto" centered
          >
            <!-- <v-img src="wanime-logo.png" alt="wanime" height="25" width="125"/> -->

          </v-col>

          <v-col
            cols="12"
            sm="8"
          >

            <!-- NUXT -->
              <nuxt/>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <feedback/>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <WAfooter/>
  </v-app>
</template>

<script>
import WAfooter from '~/components/wafooter'
import feedback from '~/components/wafeedback.vue'

  export default {
    components:{
      WAfooter,
      feedback
    },
    data: () => ({
      links: [
        'Search'
      ],
    }),
  }
</script>
<style scoped>
li a {
    text-decoration: none;
}
</style>
