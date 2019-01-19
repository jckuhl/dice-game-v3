export default class Player {
    constructor(name) {
        this.name = name;
        this._scoreBoard = {
            upper: {
                ones: 'empty',
                twos: 'empty',
                threes: 'empty',
                fours: 'empty',
                fives: 'empty',
                sixes: 'empty',
            },
            totalupper: 0,
            bonusUsed: false,
            lower: {
                threeOfAKind: 'empty',
                fourOfAKind: 'empty',
                fullHouse: 'empty',
                studmuffin: 'empty',
                studmuffinBonus: 'empty',
                chance: 'empty'
            },
            totallower: 0,
            grandTotal: 0
        }
    }

    get(section) {
        const scoreboard = Object.assign({}, this._scoreBoard[section]);
        Object.freeze(scoreboard);
        return scoreboard;
    }

    getField(field) {
        if (Object.keys(this._scoreBoard.upper).includes(field)) {
            return this._scoreBoard.upper[field]
        } else if (Object.keys(this._scoreBoard.lower).includes(field)) {
            return this._scoreBoard.lower[field]
        } else {
            return this._scoreBoard[field];
        }
    }

    calcSubTotal(subTotalKey) {
        return Object.values(this._scoreBoard[subTotalKey])
                .filter(value => value !== 'empty')
                .reduce((x, y) => x + y);
    }

    calcGrandTotal() {
        this._scoreBoard['grandTotal'] = this._scoreBoard['totallower'] + this._scoreBoard['totalupper'];
    }

    getGrandTotal() {
        return this._scoreBoard['grandTotal'];
    }

    setScore(field, value) {
        function set(section, field, value) {
            console.log(section, field, this)
            if(this._scoreBoard[section][field] === 'empty') {
                this._scoreBoard[section][field] = value;
                const subTotalKey = 'total' + section;
                this._scoreBoard[subTotalKey] = this.calcSubTotal(section);
                if (section == 'upper' && this._scoreBoard['totalupper'] >= 63
                        && this._scoreBoard.bonusUsed) {
                    this._scoreBoard['totalupper'] += 35;
                    this._scoreBoard.bonusUsed = true;
                }
                this.calcGrandTotal();
                return true;
            } else {
                return false;
            }
        }

        if (Object.keys(this._scoreBoard.upper).includes(field)) {
            return set.bind(this, 'upper', field, value)();
        } else if (Object.keys(this._scoreBoard.lower).includes(field)) {
            return set.bind(this, 'lower', field, value)();
        } else {
            throw new Error('Invalid key');
        }
    }

    fieldIsEmpty(field) {
        if (Object.keys(this._scoreBoard.upper).includes(field)) {
            return this._scoreBoard.upper[field] === 'empty';
        } else if (Object.keys(this._scoreBoard.lower).includes(field)) {
            return this._scoreBoard.lower[field] === 'empty';
        } else {
            throw new Error('Invalid key');
        }
    }
}