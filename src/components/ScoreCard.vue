<template>
  <div>
    <h2>{{ player.name }} <span v-if="player.turn">Your Turn</span></h2>
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
                <th colspan="2">Upper Section Total</th>
                <td>
                    <span v-if="player.getField('totalupper') !== 'empty'">
                        {{ player.getField('totalupper') }}
                    </span>
                </td>
            </tr>
            <tr v-for="([key, value], index) in Object.entries(player.get('lower'))" :key="index+10">
                <th>{{ key | title }}</th>
                <td>{{ getLowerInstructions(key) }}</td>
                <td @click="getValue(key)">{{ value | hideEmpty }}</td>
            </tr>
                <th colspan="2">Upper Section Total</th>
                <td>
                    <span v-if="player.getField('totallower') !== 'empty'">
                        {{ player.getField('totallower') }}
                    </span>
                </td>
            <tr>
                <th colspan="2">Grand Total</th>
                <td>
                    <span v-if="player.getField('totalupper') !== 'empty'">
                        {{ player.getField('grandtotal') }}
                    </span>
                </td>
            </tr>            
        </tbody>
    </table>
    <button>Save Grand Score!</button>
  </div>
</template>

<script>
import store from '../store';

export default {
    name: 'ScoreCard',
    props: {
        player: Object,
    },
    filters: {
        hideEmpty(value) {
            return value === 'empty' ? '' : value;
        }
    },
    methods: {
        getValue(field) {
            if(this.player.turn && store.getters.validRoller) {
                store.commit('setCurrentField', field);
                const score = store.getters.getFieldScore;
                this.player.setScore(field, score);
                store.commit('setTurn');
            } else {
                console.log('not your turn');   // TODO: replace with something on the UI
            }
        },
        getLowerInstructions(key) {
            const instructions = {
                'chance': 'Add up all the dice',
                'threeOfAKind': 'Add up all the dice',
                'fourOfAKind': 'Add up all the dice',
                'studmuffin': 'Score 50 points',
                'fullHouse': 'Score 25 points',
                'smStraight': 'Score 30 points',
                'lgStraight': 'Score 40 points',
                'studmuffinBonus': 'Score 100 points for every Studmuffin after your first'
            };
            return instructions[key];
        }
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