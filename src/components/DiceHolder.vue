<template>
  <div>
    <div class="diceholder">
        <Die
            class="die"
            v-for="(die, index) in dice"
            :key="index"
            :value="die"
        />
    </div>
    <button @click="handleRoll()">Roll</button>
  </div>
</template>

<script>

import Die from './Die';
import Roller from '../assets/roller';
import random from '../assets/random';

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
            isFourStraight: false,
            isFiveStraight: false,
            rolls: 3
        }
    },
    methods: {
        handleRoll() {
            this.dice = this.roller.roll();
            this.numbers = this.roller.getNumbers();
            // console.log(this.numbers);
            // this.$emit('pass-numbers', this.numbers);
            // TODO: pass the numbers to Vuex
            if(this.rolls === 0) {
                this.$emit('new-turn');
                this.rolls = 3;
            }
            this.rolls -= 1;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
