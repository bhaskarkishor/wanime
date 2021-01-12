<template>
<div>
    <v-card-title class="headline red lighten-3">
      Search Your Favourite Anime
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="searchText"
        :loading="isLoading"
        color="white"
        hide-no-data
        hide-selected
        autofocus
        single-line
        label="Type here"
        placeholder="Start typing to Search"
        prepend-icon="mdi-pokeball"
        v-on:keyup.enter="searchQuery(searchText)"
      ></v-text-field>
      <v-btn v-on:click="searchQuery(searchText)">Search</v-btn>

    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list
        v-if="items"
        class="red lighten-3"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="path(item)"
          router
        >
          <v-list-item-content>
            <v-row>
              <v-col cols="2">
                <v-img lazy-src="w.png" :src="item.image" height="100" width="100" />
              </v-col>
              <v-col cols="10">
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.id"></v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!model"
        color="grey darken-3"
        @click="model = null"
      >
        Clear
        <v-icon right>
          mdi-close-circle
        </v-icon>
      </v-btn>
    </v-card-actions> -->
  </div>
</template>

<script>
//import debounce from 'debounce'

export default {
  layout:'default2',
  data: () => ({
    synopsisLimit: 200,
    searchResult: [],
    isLoading: false,
    resultPage:1,
    searchText: null,
  }),


  computed: {
    items () {
      return this.searchResult.map(entry => {
        const title = entry.title
        let image = entry.image
        let id = entry.id
        return Object.assign( { id, title, image },)
      })
    }
  },

  methods: {
    path(val){
      return `${val.id}`
    },
    searchQuery: function(val){

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      console.info('fetching anime list ')
      // Lazily load input items
      fetch(`/api/gogoanime/search/${val}/${this.resultPage}`,
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
    }
  },
}
</script>

<style>

</style>
