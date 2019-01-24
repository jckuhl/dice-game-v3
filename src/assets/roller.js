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

    roll_except(indices) {
        this.values = this.dice.map((die, index) => {
            if(!indices.includes(index)) {
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
        return Object.entries(this.getNumbers()).some(([k, v])=> v >= kind)
    }

    validateGroups(num) {
        let pairs = [];
        Object.entries(this.getNumbers()).forEach(([key, value]) => {
            if (value >= num) pairs.push(key);
        });
        return pairs.length > 1 ? true : false;
    }

    validateFullHouse() {
        let isThreeOfKind = false;
        let isPair = false;
        Object.values(this.getNumbers()).forEach(value => {
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
        function calcUpper(field) {
            if(this.getNumbers()[field]) {
                return this.getNumbers()[field] * field;
            } else {
                return 0;
            }
        }

        function calcOfAKind(kind) {
            if(this.validateOfAKind(kind)) {
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
            if(this.validateOfAKind(5)) {
                return 100;
            }
        }

        function chance() {
            return this.values.reduce((x, y)=> x + y);
        }

        function straight(size) {
            if(this.validateStraight(size)) {
                return size === 5 ? 40 : 30;
            } else {
                return 0;
            }
        }

        const scoreFns = {
            ones: calcUpper.bind(this, 1),
            twos: calcUpper.bind(this, 2),
            threes: calcUpper.bind(this, 3),
            fours: calcUpper.bind(this, 4),
            fives: calcUpper.bind(this, 5),
            sixes: calcUpper.bind(this, 6),
            threeOfAKind: calcOfAKind.bind(this, 3),
            fourOfAKind: calcOfAKind.bind(this, 4),
            fullHouse: fullHouse.bind(this),
            studmuffin: studmuffin.bind(this),
            studmuffinBonus: studmuffinBonus.bind(this),
            chance: chance.bind(this),
            smStraight: straight.bind(this, 4),
            lgStraight: straight.bind(this, 5)
        }
        return scoreFns[field]();
    }
}