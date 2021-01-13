<template>
  <v-card
    color="secondary"
    dark
  >
    <v-card-title class="accent">
      {{results[0].title}}
    </v-card-title>
    <v-expand-transition>
    <v-card-text class="accent">
      <v-row>
        <v-col cols="12" sm="4" class="d-flex justify-content-center">
          <v-img :src="results[0].image" right height="300" width="300"/>
        </v-col>
        <v-col cols="12" sm="8">
          <v-list
            class="accent">
            <v-list-item
            v-for="(detail,i) in details"
            :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="detail.key"></v-list-item-title>
                <v-list-item-subtitle v-text="detail.value"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item v-for="i in episodes" :key="i" :to="stream_link(i)" router>
              <v-list-item-action>Episode- {{i}}</v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>

export default {
  data(){
    return {
    }
  },
  async asyncData({route}){
    return await fetch(`/api/gogoanime/details/${route.params.anime}`,
      {
        method:'GET',
        headers:{
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => (console.log('finished')))
  },
  methods:{
    stream_link(val){
      return `/links?`+new URLSearchParams({
        anime_id: this.$route.params.anime,
        title: this.results[0].title,
        episode: val
      });
    }
  },
  computed:{
    details () {
      if (!this.results) return []

      return Object.keys(this.results[0])
      .map(key => {
        return {
          key,
          value: this.results[0][key] || 'n/a',
        }
      })
      .filter(i=>i.key !== 'image')
      .filter(i=>i.key !== 'totalepisode')
    },
    episodes(){
      return parseInt(this.results[0].totalepisode)
    }
  }
}
</script>

<style>

</style>
