<template>
    <div ref="die" class="diegrid" @click="select" :class="{ 'keep' : keep }">
        <div v-for="(pip, index) in pips" :key="index" class="square">
            <div :class="setPipClass(value, index)"></div>
        </div>
    </div>
</template>

<script>

import setPips from './../assets/setpips.js';

export default {
    name: 'Die',
    props: {
        value: Number,
        index: Number
    },
    data() {
        return {
            pips: new Array(9),
            keep: false
        }
    },
    methods: {
        setPipClass(value, index) {
            return setPips(value, index) ? 'pip': 'square';
        },
        select() {
            this.$emit('keep-die', this.index);
            this.keep = !this.keep;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.diegrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 90px;
    max-width: 90px;
    height: 100px;
}

.pip {
    width: 15px;
    height: 15px;
    background-color: black;
    border: 2px solid black;
    border-radius: 50% 50%;
}

.square {
    display: flex;
    justify-content: center;
    align-items: center;
}

.keep {
    border: 5px solid red !important;
}

</style>
