<template>
<v-card color="secondary" min-height="20vh" rounded="lg" flat dark>
  <v-card-title>
    Watching {{$route.query.title}}
  </v-card-title>
  <v-card-subtitle>
  <h3>Episode {{$route.query.episode}}</h3>
  </v-card-subtitle>
    <videoPlayer  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"

                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @waiting="onPlayerWaiting($event)"
                 @playing="onPlayerPlaying($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @timeupdate="onPlayerTimeupdate($event)"
                 @canplay="onPlayerCanplay($event)"
                 @canplaythrough="onPlayerCanplaythrough($event)"

                 @statechanged="playerStateChanged($event)"
                 @ready="playerReadied">
  </videoPlayer>
</v-card>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
export default {
  layout:'default',
  components:{
    videoPlayer
  },
  head(){
    return {
      title: 'Watching '+ this.$route.query.title
    }
  },
  data(){
    return {
      playerOptions: {
        // videojs options
        fluid:true,
        //width:"100%",
        //height:400,
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: this.$route.query.link
        }],
        poster: "",
      }
    }
  },
  mounted(){
    setTimeout(() => {
      console.log('dynamic change options', this.player)
      this.player.muted(false)
    }, 2000)
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log('example player 1 readied', player)
      player.currentTime(10)
      // console.log('example 01: the player is readied', player)
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
}
</script>

<style>
@import url('video.js/dist/video-js.css');
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -1em
}
</style>
