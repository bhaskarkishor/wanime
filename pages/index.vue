<template>    
  <v-card
    color="red lighten-2"
    dark
  >
    <v-card-title class="headline red lighten-3">
      Search Your Favourite Anime
    </v-card-title>
    <!-- <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="title"
        item-value="title"
        label="Type here"
        placeholder="Start typing to Search"
        prepend-icon="mdi-pokeball"
        return-object
      ></v-autocomplete> -->
    <v-card-text>
      <v-text-field
        v-model="search"
        :items="items"
        :loading="isLoading"
        color="white"
        hide-no-data
        hide-selected
        item-text="title"
        item-value="title"
        label="Type here"
        placeholder="Start typing to Search"
        prepend-icon="mdi-pokeball"
        v-on:keyup.enter="searchQuery(search)"
      ></v-text-field>
      <v-btn v-on:click="searchQuery(search)">Search</v-btn>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list
        v-if="items"
        class="red lighten-3"
      >
        <v-list-item
          v-for="(field, i) in items"
          :key="i"
          :to="path(field.title)"
          router
        >
          <v-list-item-content>
            <v-list-item-title v-text="field.title"></v-list-item-title>
            <v-list-item-subtitle v-text="field.synopsis"></v-list-item-subtitle>
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
  </v-card>
</template>

<script>
import debounce from 'debounce'

  export default {
    data: () => ({
      synopsisLimit: 200,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    }),

    watch:{
      // search(val){
      //  // Items have already been loaded
      //   if (this.items.length > 0) return

      //   // Items have already been requested
      //   if (this.isLoading) return

      //   this.isLoading = true

      //   console.info('Api requested')
      //   // Lazily load input items
      //   fetch('https://kitsu.io/api/edge/anime?' + new URLSearchParams({
      //       'filter[text]': `${val}`,
      //       'fields[anime]': 'titles,synopsis'
      //     }),
      //     {
      //       method:'GET',
      //       headers:{
      //         'Accept': 'application/vnd.api+json',
      //         'Content-Type': 'application/vnd.api+json'
      //       }
      //     })
      //     .then(res => res.json())
      //     .then(res => {
      //       console.log(res);
      //       this.entries = res.data;
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      //     .finally(() => (this.isLoading = false))
      // }
    },

    computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const synopsis = entry.attributes.synopsis.length > this.synopsisLimit
            ? entry.attributes.synopsis.slice(0, this.synopsisLimit) + '...'
            : entry.attributes.synopsis
          const title = entry.attributes.titles.en_jp
          var slug = entry.attributes.slug
          return Object.assign( { synopsis, title, slug },)
        })
      }      
    },

    methods: {
      path(val){
        //console.log(val,"dome");
        return `stream?anime=${val}`
      },
      searchQuery: debounce( function(val){
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        console.info('fetching anime list ')
        // Lazily load input items
        fetch('https://kitsu.io/api/edge/anime?' + new URLSearchParams({
            'filter[text]': `${val}`,
            'fields[anime]': 'titles,synopsis,slug',
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
            this.entries = res.data;
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },10)
    },
  }
</script>

<style>

</style>  