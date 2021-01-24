<template>
   <v-card color="secondary" min-height="20vh" rounded="lg" flat dark>
    <v-card-title class="secondary">
      {{results.title}}
    </v-card-title>
    <v-expand-transition>
    <v-card-text class="secondary">
      <v-row>
        <v-col cols="12" sm="4" class="d-flex justify-content-center">
          <v-img :src="results.image" right height="300" width="300"/>
        </v-col>
        <v-col cols="12" sm="8">
          <v-list
            class="secondary">
            <v-list-item
            v-for="(detail,i) in details"
            :key="i">
              <v-list-item-content>
                <v-list-item-title class="text-uppercase">{{detail.key}}</v-list-item-title>
                {{detail.value}}
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item v-for="i in episodes" :key="i" :to="stream_link(i)" router>
              <v-list-item-action>Episode- {{episodes - i + 1}}</v-list-item-action>
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
      results: this.$store.state.currentAnime
    }
  },
  async fetch({store,route}){
    let result = await fetch(`/api/gogoanime/details/${route.params.anime}`,
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
        store.commit('ADD_CURRENT_ANIME',res.results[0]);
        return res
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => (console.log('finished')))
  },
  mounted(){
  },
  head(){
    return{
      title: this.results.title,
      meta:[{
        hid:'description',
        name:'description',
        content:this.results.summary
      }]
    }
  },
  methods:{
    stream_link(val){
      return `/links?`+new URLSearchParams({
        anime_id: this.$route.params.anime,
        title: this.results.title,
        episode: val
      });
    }
  },
  computed:{
    details () {
      if (!this.results) return []

      return Object.keys(this.results)
      .map(key => {
        return {
          key,
          value: this.results[key] || 'n/a',
        }
      })
      .filter(i=>i.key !== 'image')
      .filter(i=>i.key !== 'totalepisode')
    },
    episodes(){
      return parseInt(this.results.totalepisode)
    }
  }
}
</script>

<style>

</style>
