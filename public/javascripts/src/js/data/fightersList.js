import Fighter from "./fighter";

class FightersList {
    fightersDetailsMap = new Map();

    constructor(fighters) {
        fighters.map(fighter => {
            this.fightersDetailsMap.set(fighter._id, new Fighter(fighter));
        });
    }

    set(fighter) {
        this.fightersDetailsMap.set(fighter._id, new Fighter(fighter));
    }

    getFighter(_id) {
        return this.fightersDetailsMap.get(_id);
    }

    get() {
        return this.fightersDetailsMap;
    }
}

export default FightersList;

