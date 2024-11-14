const state = {
  rankingBoard: JSON.parse(sessionStorage.getItem('rankingBoard')) || []
};

const mutations = {
  addPlayer(state, player) {
    const existingPlayerIndex = state.rankingBoard.findIndex(p => p.name === player.name);

    if(existingPlayerIndex !== -1){
      const existingPlayer = state.rankingBoard[existingPlayerIndex];
      if(player.correctAnswers > existingPlayer.correctAnswers || 
        (player.correctAnswers === existingPlayer.correctAnswers && player.time < existingPlayer.time) 
      ) {
        state.rankingBoard.splice(existingPlayerIndex, 1, player);
      }
    }else{
      state.rankingBoard.push(player);
    }

    state.rankingBoard.sort((a, b) => {
        if(b.correctAnswers === a.correctAnswers) {
          return a.time - b.time;
        }
        return b.correctAnswers - a.correctAnswers;
      });
    
    sessionStorage.setItem('rankingBoard', JSON.stringify(state.rankingBoard));
  }
};

const actions = {
  addPlayer({ commit }, player) {
    commit('addPlayer', player);
  }
};

const getters = {
  rankingBoard: state => state.rankingBoard
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}