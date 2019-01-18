import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        players: [],
        numbers: {}
    },
    mutations: {
        addPlayers(state, payload) {
            console.log(payload)
            payload.forEach(player => {
                state.players.push(player);
            });
            return state;
        },
        setCurrentNumbers(state, payload) {
            state.numbers = payload;
        }
    },
    getters: {
        getCurrentNumbers(state) {
            return state.numbers;
        }
    }
});