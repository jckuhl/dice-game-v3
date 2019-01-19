<template>
    <div class="center intro">
        <h1>Welcome to Studmuffin!</h1>
        <h3>A rousing dice game!</h3>
        <p>Dear Hasbro, if this game looks like Yatzee, it's because it's actually Yatzee.  I don't make money of this, don't sue me bro.</p>
        <label for="name">Please enter your name: </label>
        <input type="text" id="name" v-model="player1name" :class="{ warning: warning}">
        <button @click="handleInput">Submit</button>
        <span v-if="warning">Name is required</span>
        <div v-if="players.length">
            <p>Do you want to play with another player or against the computer?</p>
            <input type="radio" name="playerpicker" value="player" v-model="picked">
            <label for="player">Player</label>
            <input type="radio" name="playerpicker" value="computer" v-model="picked">
            <label for="computer">Computer</label>
            <div v-if="picked === 'computer'">
                <button @click="playGame">Play Game</button>
            </div>
            <div v-else-if="picked ==='player'">
                <p>You can have up to 3 other players</p>
                <template v-for="(input, index) in inputs" >
                    <component @pass-up="addName" :is="input" :key="index">
                        <span slot="label">Add Player</span>
                        <span slot="btn-text">Add</span>
                    </component>
                </template>
                <p><button @click="playGame" :disabled="invalidPlayers">Play Game</button></p>
            </div>
        </div>
    </div> 
</template>

<script>
import InputAndButton from './InputButton';
import store from './../store.js';
import router from  './../router.js';
import Player from './../assets/player.js';
import names from './../assets/names.js';
import random from './../assets/random.js';
import InputButtonVue from './InputButton.vue';

export default {
    name: 'Intro',
    components: {
        InputAndButton
    },
    data() {
        return {
            picked: '',
            warning: false,
            players: [],
            names: [],
            inputs: [InputAndButton],
            player1name: ''
        }
    },
    computed: {
        invalidPlayers() {
            const invalidPlayer1 = this.player1name === '' || this.player1name.length === 0;
            const invalidOtherPlayers = this.names.length === 1 && this.names[0] === ''
            if(this.picked === 'computer') {
                return invalidPlayer1
            } else {
                return invalidOtherPlayers && invalidPlayer1;
            }
        }
    },
    methods: {
        playGame() {
            if(this.picked === 'computer') {
                const plName = names[random(0, names.length)];
                const player = new Player(plName);
                this.players.push(player);
            } else {

                const players = this.names.map(name => new Player(name));
                this.players = this.players.concat(players);
            }
            store.commit('addPlayers', this.players);
            this.$router.push('/game');
        },
        handleInput() {
            if(this.player1name && this.players.length == 0) {
                const player = new Player(this.player1name);
                this.players.push(player);
            }
        },
        addName(value) {
            if(this.inputs.length <= 2) {
                this.inputs.push(InputAndButton);
            }
            if(this.names.length <= 3) {
                this.names.push(value);
            }
        }
    }
}
</script>

<style scoped>
    .warning {
        border: 3px solid red;
    }

    .intro {
        width: 50%;
    }
</style>
