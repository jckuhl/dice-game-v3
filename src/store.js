import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        players: [],
        roller: {},
        field: '',
    },
    mutations: {
        addPlayers(state, payload) {
            state.players = [];
            payload.forEach(player => {
                state.players.push(player);
            });
            return state;
        },
        setCurrentNumbers(state, payload) {
            state.roller = payload;
        },
        setCurrentField(state, payload) {
            state.field = payload
        }
    },
    getters: {
        getFieldScore(state) {
            if(typeof state.roller.calculateScore === 'function' && state.field) {
                return state.roller.calculateScore(state.field);
            }
        }
    }
});