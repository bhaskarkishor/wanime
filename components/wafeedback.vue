<template>
<div>
  <v-card flat class="mt-3 text-center" v-show="feedbackVisibility">
    <v-card-subtitle>
      Feedback & Feature Request
      <v-btn x-small icon text fab @click="feedbackVisibility=!feedbackVisibility">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-textarea v-model="feedback" rows="2" auto-grow label="Type here">
        </v-textarea>
        <v-btn class="" text>
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
export default {
  data(){
    return {
      feedback:'',
      feedbackVisibility:false
    }
  }
}
</script>

<style>

</style>
