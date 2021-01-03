<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <!-- <v-app-bar-title class="font-weight-bold secondary--text">
        <div class="text-decoration-underline">
        WAnime
        </div>
      </v-app-bar-title> -->
      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
            >
             <h1 align="center">WAnime</h1>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="20vh"
              rounded="lg"
            >
            <!-- NUXT -->
              <nuxt/>
            </v-sheet>
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
  export default {
    data: () => ({
      links: [
        'Search'
      ],
    }),
  }
</script>