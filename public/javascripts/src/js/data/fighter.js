import getRandomArbitrary from "../helpers/getRandomArbitrary";

class Fighter {

    fighter;

    constructor(fighter) {
        this.fighter = {};
        this.fighter.health = fighter.health;
        this.fighter.attack = fighter.attack;
        this.fighter.defense = fighter.defense;
        this.fighter._id = fighter._id;
        this.fighter.source = fighter.source;
        this.fighter.name = fighter.name;
    }

    updateFighterData(data) {
        this.fighter.health = data.health ? data.health : this.fighter.health;
        this.fighter.attack = data.attack ? data.attack : this.fighter.attack;
        this.fighter.defense = data.defense ? data.defense : this.fighter.defense;
    }

    getHitPower() {
        let power = this.fighter.attack * getRandomArbitrary(1, 2);
        return Math.floor(power);
    }

    getBlockPower() {
        let power = this.fighter.defense * getRandomArbitrary(1, 2);
        return Math.floor(power);
    }

    get() {
        return this.fighter;
    }
}

export default Fighter;