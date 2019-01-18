<template>
    <div id="app">
    <Header/>
    <div>
        <DiceHolder />
        <div class="container">
            <ScoreCard :player="player1"/>
            <ScoreCard :player="player2"/>
        </div>
    </div>
        <!-- <div v-else>
            <Intro @start-game="startGame"/>
        </div> -->
    </div>
</template>

<script>

import Header from './components/Header';
import DiceHolder from './components/DiceHolder';
import ScoreCard from './components/ScoreCard';
import Intro from './components/Intro';
import Player from './../src/assets/player.js';

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
            player1: new Player('Tom'),
            player2: new Player('Dick')
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
