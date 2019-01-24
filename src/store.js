import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        players: [],
        dice: [],
        roller: {},
        field: '',
        turn: 0,
        maxTurns: 0
    },
    mutations: {
        addPlayers(state, payload) {
            state.players = [];
            payload.forEach(player => {
                state.players.push(player);
            });
            state.maxTurns = state.players.length * 13;
            return state;
        },
        setCurrentNumbers(state, payload) {
            state.roller = payload;
        },
        setCurrentField(state, payload) {
            state.field = payload
        },
        setTurn(state) {
            state.players.forEach((player, index) => {
                player.turn = false;
                if(state.turn % state.players.length === index) {
                    player.turn = true;
                }
            });
            state.dice = [];
            state.roller.values = [];
            state.turn += 1;
        },
        setDice(state, payload) {
            state.dice = payload;
        }
    },
    getters: {
        getFieldScore(state) {
            if(typeof state.roller.calculateScore === 'function' && state.field) {
                return state.roller.calculateScore(state.field);
            }
        },
        validRoller(state) {
            return state.roller.values && state.roller.values.length !== 0;
        },
        getDice(state) {
            return state.dice;
        }
    }
});