<template>
    <div class="center intro">
        <h1>Welcome to Studmuffin!</h1>
        <h3>A rosing dice game!</h3>
        <p>Dear Hasbro, if this game looks like Yatzee, it's because it's actually Yatzee.  I don't make money of this, don't sue me bro.</p>
        <label for="name">Please enter your name: </label>
        <input type="text" id="name" v-model="names[0]" :class="{ warning: warning}" @change="handleInput">
        <span v-if="warning">Name is required</span>
        <p>Do you want to play with another player or against the computer?</p>
        <input type="radio" name="playerpicker" value="player" v-model="picked">
        <label for="player">Player</label>
        <input type="radio" name="playerpicker" value="computer" v-model="picked">
        <label for="computer">Computer</label>
        <div v-if="picked === 'computer'">
            <button @click="playGame">Play Game</button>
        </div>
        <div v-else>
            <p>You can have up to 3 other players</p>
            <label for="player2">Add a player: </label>
            <input type="text" id="player2">
            <span>(+)</span><span>(-)</span>
            <p><button @click="playGame">Play Game</button></p>
        </div>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            names: [],
            picked: '',
            warning: false
        }
    },
    methods: {
        playGame() {
            if(this.names[0]) {
                this.warning = false;
                const gameData = {
                    names: this.names,
                    type: this.picked
                }
                this.$emit('start-game', gameData);
            } else {
                this.warning = true;
            }
        },
        handleInput() {
            if(this.names[0]) this.warning = false;
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
