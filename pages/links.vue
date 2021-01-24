<template>
   <v-card color="secondary" min-height="20vh" rounded="lg" flat dark>
    <v-card-title>
      Looking for Streaming links
    </v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle>
      {{$route.query.title}}
    </v-card-subtitle>
    <div class="text-center" v-if="isLoading">
      <v-progress-circular
      indeterminate
      color="white"
    ></v-progress-circular>
    </div>
    <div v-else>


      <v-list>
        <v-list-item v-for="(link,i) in streamingLinks" :key="i" v-on:click="go_to_player(link.link)">
          <v-list-item-action-text>{{link.hostname}} - {{link.quality}}</v-list-item-action-text>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
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
      let uri = link.split('?')[0];
      console.log(uri.slice(-3));
      if(uri.slice(-3)==='mp4'){
        let url = `/stream?`+new URLSearchParams({
        link: link,
        title: this.$route.query.title,
        episode: this.$route.query.episode
      });
      this.$store.commit('ADD_STREAMING_SOURCE',new URL(link).hostname);
      this.$router.push(url);
      }
      else{
        window.open(link,'_blank');
      }
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
