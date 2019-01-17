import Dice from './dice'

export default class Roller {
    constructor(diceStr) {
        let diceStrVals = diceStr.split('d').map(val => parseInt(val));
        this.numDice = diceStrVals[0];
        this.sides = diceStrVals[1];
        this.dice = [];
        this.values = [];
        for (let i = 0; i < this.numDice; i++) {
            this.dice[i] = new Dice(this.sides);
        }
    }

    roll() {
        this.values = this.dice.map(die => die.roll());
        return this.values;
    }

    getNumbers() {
        let numbers = {}
        this.values.forEach(value => {
            let valStr = value.toString();
            if (!numbers[valStr]) {
                numbers[valStr] = 1;
            } else {
                numbers[valStr] += 1;
            }
        });
        return numbers;
    }

    validateStraight(size=5) {
        // Don't mutate this.values
        let values = this.values;
        let length = size === 5 ? values.length - 1 : values.length - 2;
        values.sort();
        if (Math.abs(values[0] - values[1]) != 1) {
            values.reverse();
        }
        for (let i = 0; i < length; i++) {
            if (Math.abs(values[i] - values[i + 1]) != 1) {
                return false;
            }
        }
        return true;
    }

    // validateFiveStraight() {
    //     // Don't mutate this.values
    //     let values = this.values;
    //     values.sort();
    //     for (let i = 0; i < values.length - 1; i++) {
    //         if (Math.abs(values[i] - values[i + 1]) != 1) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    validateOfAKind(num, numbers) {
        let counter = 0;
        Object.values(numbers).forEach(value => {
            if (value >= num) counter++;
        });
        return counter != 0 ? true : false;
    }

    validateGroups(num, numbers) {
        let pairs = [];
        Object.entries(numbers).forEach(([key, value]) => {
            if (value >= num) pairs.push(key);
        });
        return pairs.length > 1 ? true : false;
    }

    validateFullHouse(numbers) {
        let isThreeOfKind = false;
        let isPair = false;
        Object.values(numbers).forEach(value => {
            if (value == 2) isPair = true;
            if (value == 3) isThreeOfKind = true;
        });
        return isPair && isThreeOfKind;
    }

    createFiveKind(value) {
        this.values = this.values.map(val=> value);
        return this.values;
    }
}