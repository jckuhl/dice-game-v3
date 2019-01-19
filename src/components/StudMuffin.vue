<template>
    <div>
        <DiceHolder />
        <div class="container">
            <ScoreCard 
            v-for="(player, index) of players"
            :key="index"
            :player="player"
            />
        </div>
    </div>
</template>

<script>
import DiceHolder from './DiceHolder';
import ScoreCard from './ScoreCard';
import store from './../store.js';

export default {
    name: 'StudMuffin',
    components: {
        DiceHolder,
        ScoreCard
    },
    data() {
        return {
            players: [],
            roller: {}
        }
    },
    created() {
        this.players = store.state.players;
    }
}
</script>
