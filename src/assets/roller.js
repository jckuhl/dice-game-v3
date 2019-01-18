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

    roll_set(indices) {
        this.values = this.dice.map((die, index) => {
            if(indices.includes(index)) {
                return die.roll();
            } else {
                return die.value;
            }
        });
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

    validateOfAKind(kind) {
        function validateKind(kind) {
            return Object.entries(this.getNumbers).some(([k, v])=> v >= kind)
        }
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

    calculateScore(field) {
        function calcUpper(field, n) {
            if(this.getNumbers()[field]) {
                return this.getNumbers()[field] * n;
            }
        }

        function calcOfAKind(kind) {
            if(this.validateKind(kind)) {
                return this.values.reduce((x, y)=> x + y);
            } else {
                return 0;
            }
        }

        function fullHouse() {
            if(this.validateFullHouse()) {
                return 25;
            } else {
                return 0;
            }
        }

        function studmuffin() {
            if(this.validateOfAKind(5)) {
                return 50;
            } else {
                return 0
            }
        }

        function studmuffinBonus() {
            return 100;
        }

        function chance() {
            return this.values.reduce((x, y)=> x + y);
        }

        const scoreFns = {
            ones: calcUpper.bind(this, 'ones', 1),
            twos: calcUpper.bind(this, 'ones', 2),
            threes: calcUpper.bind(this, 'ones', 3),
            fours: calcUpper.bind(this, 'fours' , 4),
            fives: calcUpper.bind(this, 'fives', 5),
            sixes: calcUpper.bind(this, 'sixes', 6),
            threeOfAKind: calcOfAKind.bind(this, 3),
            fourOfAKind: calcOfAKind.bind(this, 4),
            fullHouse,
            studmuffin,
            studmuffinBonus,
            chance
        }

        return scoreFns[field]();
    }
}