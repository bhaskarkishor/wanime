<template>
<v-container fluid>
  <v-row dense>
    <v-col v-for="(anime,i) in popularAnimes" :key="i" cols="12" sm="4">
      <v-card
        :to="anime.id" router
        max-width="300">
        <v-img
          class="white--text align-end"
          lazy-src="/w.png"
          :src="anime.image"
          height="200px"
          gradient="to bottom, rgba(255,255,255,0) 0%, rgba(2,0,36,1) 90%"
        ><v-card-title>
          {{anime.title}}
        </v-card-title>
        </v-img>

      </v-card>
    </v-col>
    </v-row>
</v-container>
</template>

<script>

export default {
  props:['popularAnimes'],
  data(){
    return{

    }
  }

}
</script>

<style>

</style>
