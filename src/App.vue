<template>
  <div id="app">
    <Header/>
    <div v-if="loggedIn">
      <DiceHolder @pass-numbers="passNumbers"/>
      <div class="container">
        <ScoreCard
          :aces="aces"
          :twos="twos"
          :threes="threes"
          :fours="fours"
          :fives="fives"
          :sixes="sixes"
          @get-score="getScore" 
          :player="names[0]"/>
        <ScoreCard :player="names[1]"/>
        <ScoreCard :player="names[2]" v-if="names[2]"/>
        <ScoreCard :player="names[1]" v-if="names[3]"/>
      </div>
    </div>
    <div v-else>
      <Intro @start-game="startGame"/>
    </div>
  </div>
</template>

<script>

import Header from './components/Header';
import DiceHolder from './components/DiceHolder';
import ScoreCard from './components/ScoreCard';
import Intro from './components/Intro';

export default {
    name: 'App',
    components: {
        Header,
        DiceHolder,
        ScoreCard,
        Intro
    },
    data() {
        return {
            loggedIn: false,
            names: [
                'Player 1',
                'Player 2'
            ],
            numbers: {},
            scores: [
                {aces: 0},
                {twos: 0},
                {threes: 0},
                {fours: 0},
                {fives: 0},
                {sixes: 0},
            ],
        }
    },
    methods: {
        getScore(score) {
            switch (score) {
                case 'aces':
                    this.aces = this.numbers['1'];
                    break;
                case 'twos':
                    this.twos = this.numbers['2'] * 2;
                    break;
                case 'threes':
                    this.threes = this.numbers['3'] * 3;
                    break;
                case 'fours':
                    this.fours = this.numbers['4'] * 4;
                    break;
                case 'fives':
                    this.fives = this.numbers['5'] * 5;
                    break;
                case 'sixes':
                    this.sixes = this.numbers['6'] * 6;
                    break;
            }
        },
        passNumbers(numbers) {
            this.numbers = numbers;
        },
        startGame(gameData) {
            this.names = gameData.names;
            if(!this.names[1]) this.names[1] = 'Player 2';
            this.loggedIn = true;
        }
    }
}
</script>

<style>

body {
  background: #ff5555;
}

.container {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    width: 90%;
}

.center {
    margin: 0 auto;
}

</style>
