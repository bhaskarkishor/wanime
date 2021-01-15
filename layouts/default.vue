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
            <v-img src="wanime-logo.png" alt="wanime" height="25" width="125"/>

          </v-col>

          <v-col
            cols="12"
            sm="8"
          >

            <v-card color="secondary" min-height="20vh" rounded="lg" flat dark>
            <!-- NUXT -->
              <nuxt/>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <footer class="text-center accent">
      <v-img class="mx-auto" src="w.png" alt="wanime" height="50" width="50"/>
      <span>WAnime &copy; {{ new Date().getFullYear() }}</span>
    </footer>
  </v-app>
</template>

<script>
import icon from '~/components/icon'
  export default {
    components:{
      icon
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
