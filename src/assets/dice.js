import random from './random';

export default class Dice {
    constructor(sides=6) {
        this.sides = sides;
        this.value = 0;
    }

    roll() {
        this.value = random(1, this.sides + 1);
        return this.value;
    }
}