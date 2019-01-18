<template>
  <div>
    <div class="diceholder">
        <Die
            class="die"
            v-for="(die, index) in dice"
            :key="index"
            :index="index"
            :value="die"
            @keep-die="keepDie"
        />
    </div>
    <div :class="{ 'status-hidden': !dice.length }">
        <p>Click any dice you would like to keep!</p>
        <p>You have {{ rolls }} rolls remaining!</p>
    </div>
    <button @click="handleRoll()">Roll</button>
  </div>
</template>

<script>

import Die from './Die';
import Roller from '../assets/roller';
import random from '../assets/random';
import store from './../store.js';

export default {
    name: 'DiceHolder',
    components: {
        Die
    },
    data() {
        return {
            roller: new Roller('5d6'),
            dice: [],
            numbers: {},
            keep: [],
            rolls: 4
        }
    },
    methods: {
        handleRoll() {
            if(!this.keep.length) {
                this.dice = this.roller.roll();
            } else {
                this.dice = this.roller.roll_except(this.keep)
            }
            this.numbers = this.roller.getNumbers();
            store.commit('setCurrentNumbers', this.numbers);
            this.rolls -= 1;
            if(this.rolls === 0) {
                this.$emit('new-turn');
                this.rolls = 4;
                this.keep = [];
                this.dice = [];
            }
        },
        keepDie(index) {
            if(this.keep.includes(index)) {
                this.keep = this.keep.filter(i => i !== index);
            } else {
                this.keep.push(index);
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.status-hidden {
    visibility: hidden;
}

.diceholder {
    background: lightcoral;
    width: 50%;
    min-height: 120px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
}

.die {
    background-color: white;
    margin: 0.5rem;
    height: 100px;
    width: 100px;
    border: 3px solid black;
    border-radius: 25px;
    text-align: center;
    position: relative;
    box-sizing: border-box;
}

button {
    font-size: 2rem;
    background: lightcoral;
    text-align: center;
    display: block;
    margin: 1rem auto;
}

button:focus {
    outline: none;
}

</style>
