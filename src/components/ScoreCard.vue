<template>
  <div>
    <h2>{{ player }} <span v-if="turn">Your Turn</span></h2>
    <table>
        <thead>
            <tr>
                <td>Upper Section</td>
                <td>How To Score</td>
                <td>Score</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Aces</th>
                <td>Count only the Aces</td>
                <td @click="$emit('get-score', 'aces')"><span v-if="aces > 0">{{ aces }}</span></td>
            </tr>
            <tr>
                <th>Twos</th>
                <td>Count only the Twos</td>
                <td @click="$emit('get-score', 'twos')"><span v-if="twos > 0">{{ twos }}</span></td>
            </tr>
            <tr>
                <th>Threes</th>
                <td>Count only the Threes</td>
                <td @click="$emit('get-score', 'threes')"><span v-if="threes > 0">{{ threes }}</span></td>
            </tr>
            <tr>
                <th>Fours</th>
                <td>Count only the Fours</td>
                <td @click="$emit('get-score', 'fours')"><span v-if="fours > 0">{{ fours }}</span></td>
            </tr>
            <tr>
                <th>Fives</th>
                <td>Count only the Fives</td>
                <td @click="$emit('get-score', 'fives')"><span v-if="fives > 0">{{ fives }}</span></td>
            </tr>
            <tr>
                <th>Sixes</th>
                <td>Count and add only the Sixes</td>
                <td @click="$emit('get-score', 'sixes')"><span v-if="sixes > 0">{{ sixes }}</span></td>
            </tr>
            <tr>
                <th>Total</th>
                <td>The total so far:</td>
                <td><span v-if="subtotal > 0">{{ subtotal }}</span></td>
            </tr>
            <tr>
                <th>Bonus!</th>
                <td>Add 35 if the above score is 63 or higher</td>
                <td><span v-if="subtotal > 62">{{ bonus }}</span></td>
            </tr>
            <tr>
                <th colspan="2">Upper Section Total</th>
                <td><span v-if="upperSectionTotal > 0">{{ upperSectionTotal }}</span></td>
            </tr>
            <tr>
                <th colspan="3">Lower Section</th>
            </tr>
            <tr>
                <th>Three of a Kind</th>
                <td>Add total of all dice</td>
                <td><span v-if="threeOfAKind > 0">{{ threeOfAKind }}</span></td>
            </tr>
            <tr>
                <th>Four of a Kind</th>
                <td>Add total of all dice</td>
                <td><span v-if="fourOfAKind > 0">{{ fourOfAKind }}</span></td>
            </tr>
            <tr>
                <th>Full House</th>
                <td>Score 25</td>
                <td><span v-if="fullHouse > 0">{{ fullHouse }}</span></td>
            </tr>
            <tr>
                <th>Small Straight</th>
                <td>Sequence of 4 ,Score 30</td>
                <td><span v-if="smStraight > 0">{{ smStraight }}</span></td>
            </tr>
            <tr>
                <th>Large Straight</th>
                <td>Sequence of 5 ,Score 40</td>
                <td><span v-if="lgStraight > 0">{{ lgStraight }}</span></td>
            </tr>
            <tr>
                <th>Studmuffin!</th>
                <td>Five of a kind, Score 50</td>
                <td><span v-if="studmuffin > 0">{{ studmuffin }}</span></td>
            </tr>
            <tr>
                <th>Chance</th>
                <td>Score total of all five die</td>
                <td><span v-if="chance > 0">{{ chance }}</span></td>
            </tr>
            <tr>
                <th>Bonus Studmuffin!</th>
                <td>Score 100 per extra studmuffin!</td>
                <!-- i'll rework this later -->
                <td><span v-if="studmuffin > 0">{{ studmuffin }}</span></td>
            </tr>
            <tr>
                <th colspan="2">Upper Section Total</th>
                <td><span v-if="upperSectionTotal > 0">{{ upperSectionTotal }}</span></td>
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
export default {
    name: 'ScoreCard',
    props: {
        player: String,
        aces: Number,
        twos: Number,
        threes: Number,
        fours: Number,
        fives: Number,
        sixes: Number
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