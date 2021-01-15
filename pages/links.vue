<template>
  <v-container>
    <h2>
      Looking for Streaming links
    </h2>
    <v-divider></v-divider>
    <h1>
      {{$route.query.title}}
      </h1>
    <div class="text-center" v-if="isLoading">
      <v-progress-circular
      indeterminate
      color="white"
    ></v-progress-circular>
    </div>
    <div v-else>


      <v-list>
        <v-list-item v-for="(link,i) in streamingLinks" :key="i" :to="go_to_player(link.link)">
          <v-list-item-action-text>{{link.hostname}} - {{link.quality}}</v-list-item-action-text>
        </v-list-item>
      </v-list>
    </div>
  </v-container>
</template>

<script>

export default {
  layout:'default',
  head:{
    title:'Available links',
    meta:[{
      hid:'description',
      name:'description',
      content:'Available streaming links found on internet'
    }]
  },
  data(){
    return {
      isLoading: true,
      data:null
    }
  },
  computed:{
    streamingLinks(){
      return this.data.links.map(link =>{
        return {
          'link':link,
          'hostname': new URL(link).hostname,
          'quality': link.substr(link.lastIndexOf("/")+1,9)
        }
      })
    }
  },
  methods:{
    go_to_player(link){
      return `/stream?`+new URLSearchParams({
        link: link,
        title: this.$route.query.title,
        episode: this.$route.query.episode
      })
    },
    play(link){
      window.open(link,'_blank')
    }
  },
  mounted(){
    fetch(`/api/gogoanime/watching/${this.$route.query.anime_id}/${this.$route.query.episode}`,
    {
      method:'GET',
      headers:{
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    })
    .then(res => res.json())
    .then(res => {
      this.isLoading = false
      console.log('Links from gogoanime',res)
      this.data = res;
    })
    .catch(err=>{
      console.log(err)
      alert("Something went wrong...")
    })
    .finally(()=>console.info("Completed..."))
  }
}
</script>

<style>

</style>
