import { createStore } from 'vuex'
import { initialState } from './songs/initialState'
import { reducer, ActionCreators, Song } from './songs/songReducer'
export default createStore({
  state: {
    ...initialState,
  },
  mutations: {
    ADD(state, songs: Song[]) {
      state = reducer(state, ActionCreators.addSongs(songs))
    },
  },
  actions: {},
  modules: {},
})
