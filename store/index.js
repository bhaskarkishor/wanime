export const state = () => ({
  currentAnime:{}
})

export const mutations = {
  ADD_CURRENT_ANIME(state,data){
    state.currentAnime = data;
  },
  ADD_STREAMING_SOURCE(state,data){
    state.currentAnime.streamingSource = data;
  }
}
