<template>
  <div>
    <h2>{{ player.name }} <span v-if="turn">Your Turn</span></h2>
    <table>
        <thead>
            <tr>
                <td>Upper Section</td>
                <td>How To Score</td>
                <td>Score</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="([key, value], index) in Object.entries(player.get('upper'))" :key="index">
                <th>{{ key | title }}</th>
                <td>Add up all the {{ key }}</td>
                <td @click="getValue(key)">{{ value | hideEmpty }}</td>
            </tr>
            <tr>
                <th>Bonus Studmuffin!</th>
                <td>Score 100 per extra studmuffin!</td>
                <!-- i'll rework this later -->
                <td><span v-if="studmuffin > 0">{{ studmuffin }}</span></td>
            </tr>
            <tr>
                <th colspan="2">Upper Section Total</th>
                <td><span v-if="upperSectionTotal > 0">{{ player.getField('totalupper') }}</span></td>
            </tr>
            <tr>
                <th colspan="2">Lower Section Total</th>
                <td><span v-if="lowerSectionTotal > 0">{{ lowerSectionTotal }}</span></td>
            </tr>
            <tr>
                <th colspan="2">Grand Total</th>
                <td><span v-if="grandTotal > 0">{{ grandTotal }}</span></td>
            </tr>            
        </tbody>
    </table>
    <button v-if="player === 'Player 1'">Save Grand Score!</button>
  </div>
</template>

<script>
import store from '../store';

export default {
    name: 'ScoreCard',
    props: {
        player: Object,
    },
    data() {
        return {
            turn: false,
            subtotal: 0,
            bonus: 35,
            upperSectionTotal: 0,
            threeOfAKind: 0,
            fourOfAKind: 0,
            fullHouse: 0,
            smStraight: 0,
            lgStraight: 0,
            studmuffin: 0,
            chance: 0,
            bonusStudmuffin: [],
            lowerSectionTotal: 0,
            grandTotal: 0
        }
    },
    filters: {
        hideEmpty(value) {
            return value === 'empty' ? '' : value;
        }
    },
    methods: {
        getValue(field) {
            store.commit('setCurrentField', field);
            const score = store.getters.getFieldScore;
            this.player.setScore(field, score);
        }
    },
    mounted: function() {
        this.turn = false;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    table, tr, td, th {
        border: 2px solid black;
    }

    td, th {
        width: 33%;
        min-width: 33%;
        padding: 0.5rem;
    }

    thead, th {
        font-weight: bold;
        text-align: left;
    }

    tbody tr:nth-child(odd) {
        background: lightcoral;
    }

    tbody tr:nth-child(even), thead {
        background: tomato;
    }


    table {
        background: white;
        table-layout: fixed;
        border-collapse: collapse;
    }
</style>