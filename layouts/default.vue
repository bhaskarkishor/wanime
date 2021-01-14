<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-app-bar-title class="secondary--text">

      </v-app-bar-title>
      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
        <div v-if="$route.path=='/'">
        Search
        </div>
        <div v-else>
          <v-img to="/" src="w.png" alt="wanime" height="40" width="40"/>
        </div>
        </v-tab>
      </v-tabs>

    </v-app-bar>

    <v-main class="grey lighten-3">
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

            <v-card color="secondary" min-height="20vh" rounded="lg" dark>

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
