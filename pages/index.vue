<template>
<v-container>
    <v-card-title class="">
      Search Your Favourite Anime
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="searchText"
        :loading="isLoading"
        hide-no-data
        hide-selected
        autofocus
        single-line
        label="Type here"
        placeholder="Start typing to Search"
        prepend-icon="mdi-pokeball"
        v-on:keyup.enter="searchQuery"
      ></v-text-field>
      <v-btn v-on:click="searchQuery" class="primary" text>Search</v-btn>

    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list
        v-if="items"
        class="secondary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="path(item)"
          router
        >
          <v-list-item-content>
            <v-row>
              <v-col cols="4" sm="2">
                <v-img lazy-src="w.png" :src="item.image" height="100" width="100" />
              </v-col>
              <v-col cols="8" sm="10">
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.id"></v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-expand-transition>
    <v-card-actions v-show="nextPreviousVisibility">
      <v-spacer/>
        <v-btn :disabled="previousPageButton" @click="getPreviousResultPage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn :disabled="nextPageButton" @click="getNextResultPage">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-spacer/>
      </v-card-actions>
</v-container>
</template>

<script>
//import debounce from 'debounce'

export default {
  layout:'default',
  head:{
    title:'Search',
    meta:[{
      hid:'description',
      name:'description',
      content:'Search and stream your favorite anime on wanime.me, highest quality available, dubbed and subbed anime'
    }]
  },
  data: () => ({
    synopsisLimit: 200,
    searchResult: [],
    isLoading: false,
    resultPage:1,
    searchText: '',
  }),


  computed: {
    items () {
      return this.searchResult.map(entry => {
        const title = entry.title
        let image = entry.image
        let id = entry.id
        return Object.assign( { id, title, image },)
      })
    },
    nextPreviousVisibility(){
      if(this.searchResult.length===0){
        return false
      }
      else{
        return true
      }
    },
    previousPageButton(){
      if(this.resultPage>1){
        return false
      }
      else{
        return true
      }
    },
    nextPageButton(){
      if(this.searchResult.length<20){
        return true
      }
      else{
        return false
      }
    }
  },

  methods: {
    path(val){
      return `${val.id}`
    },
    searchQuery: function(){
      // Items have already been requested
      if (this.isLoading) return
      this.isLoading = true
      console.info('fetching anime list ')
      // Lazily load input items
      fetch(`/api/gogoanime/search/${this.searchText}/${this.resultPage}`,
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
          this.searchResult = res.results;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    getPreviousResultPage(){
      this.searchResult=[];
      this.resultPage--;
      this.searchQuery();
    },
    getNextResultPage(){
      this.searchResult=[];
      this.resultPage++;
      this.searchQuery();
    }

  },
}
</script>

<style>

</style>
