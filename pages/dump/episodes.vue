<template>
  <v-card
    color="secondary"
    dark
  >
    <v-card-title class="headline red lighten-3">
      {{$route.query.anime}}
    </v-card-title>
    <v-expand-transition>
    <v-card-text>
      <v-list
        class="red lighten-3">
        <v-list-item
        v-for="(episode,i) in episodes"
        :key="i"
        :to="path(episode)"
        router>
          <v-list-item-content>
            <v-list-item-title v-text="episode.title"></v-list-item-title>
            <v-list-item-subtitle>Episode-{{episode.number}}</v-list-item-subtitle>
            <v-list-item-subtitle v-text="episode.synopsis"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
//   async asyncData({ route, $axios}){
//     console.info('waiting for server response')
//     const sources = await $axios.$get(`/api/stream/${route.query.anime}`)
//     console.info('response',sources)
//     return {sources}
//   },
  async asyncData({$axios,route}){
    return await fetch('https://kitsu.io/api/edge/episodes?'+ new URLSearchParams({
        'filter[mediaId]': `${route.query.anime_id}`,
        'fields[episodes]':'titles,canonicalTitle,seasonNumber,relativeNumber,synopsis,length',
        'page[limit]':20
      }),
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
    path(val){
      return 'stream?' + new URLSearchParams({
        'episodeName': val.title,
        'episodeNumber': val.number
      });
    }
  },
  computed:{
    episodes: function(){
      return this.data.map(entry => {
          const synopsis = entry.attributes.synopsis.length > this.synopsisLimit
            ? entry.attributes.synopsis.slice(0, this.synopsisLimit) + '...'
            : entry.attributes.synopsis
          const title = entry.attributes.titles.en_us
          let season = entry.attributes.seasonNumber
          let number = entry.attributes.relativeNumber
          let length = entry.attributes.length
          return Object.assign( { number, synopsis, title, length, season},)
        })
    }
  }
}
</script>

<style>

</style>
