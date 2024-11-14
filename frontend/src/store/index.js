import { createStore } from 'vuex'
import equations from './modules/equations'
import rankingBoard from './modules/rankingBoard'

export default createStore({
  modules: {
    equations,
    rankingBoard
  }
})