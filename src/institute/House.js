export class House {
    constructor(name, units = 50, resources = { food: 0, wood: 0, stone: 0}, actionPoints = 5, revealedTiles = [], turnsHoldingAllCastles = 0) {
        this.name = name;
        this.units = units;
        this.resources = resources;
        this.actionPoints = actionPoints;
        this.revealedTiles = revealedTiles;
        this.turnsHoldingAllCastles = turnsHoldingAllCastles;
    }

    addUnits(units) {
        this.units += units;
        console.log(this.name + ' has ' + this.units + ' units');
    }

    removeUnits(units) {
        this.units = Math.max(0, this.units - units);
        console.log(this.name + ' has ' + this.units + ' units');
    }

    addResources(resourceType, amount) {
        if (!this.resources[resourceType]) {
            this.resources[resourceType] = 0;
        }
        this.resources[resourceType] += amount;
    }

    removeResources(resourceType, amount) {
        if (this.resources[resourceType]) {
            this.resources[resourceType] = Math.max(0, this.resources[resourceType] - amount);
        }
    }

    calculateResourceIncome() {
        let foodIncome = 0;
        let woodIncome = 0;
        let stoneIncome = 0;

        // For each tile owned by the house, with units on it, calculate the resource income, each unit produces 10% of the tile's resources
        this.revealedTiles.forEach(tile => {
            if (tile.units > 0 && tile.house === this.name.toLowerCase()) {
                foodIncome += Math.floor(tile.food * tile.units * 0.1);
                woodIncome += Math.floor(tile.wood * tile.units * 0.1);
                stoneIncome += Math.floor(tile.stone * tile.units * 0.1);
            }
        });

        return { food: foodIncome, wood: woodIncome, stone: stoneIncome };
    }

    resetActionPoints() {
        this.actionPoints = 5;
    }

    canPerformAction(actionCost) {
        return this.actionPoints >= actionCost;
    }

    performAction(actionCost) {
        // console.log('Performing action:', actionCost);
        this.actionPoints -= actionCost;
        // console.log(this.name + ' has ' + this.actionPoints + ' action points left');
    }

    getTotalUnits() {
        return this.units;
    }

    getTotalCastles() {
        return this.revealedTiles.filter(tile => tile.isCastle && tile.house === this.name.toLowerCase()).length;
    }

    static instantiateHouses() {
        return [
            new House("Apollo"),
            new House("Bacchus"),
            new House("Ceres"),
            new House("Diana"),
            new House("Juno"),
            new House("Jupiter"),
            new House("Mars"),
            new House("Mercury"),
            new House("Minerva"),
            new House("Neptune"),
            new House("Pluto"),
            new House("Venus"),
            new House("Vulcan"),
        ];
    }

    serialize() {
        return {
            name: this.name,
            units: this.units,
            resources: this.resources,
            actionPoints: this.actionPoints,
            revealedTiles: this.revealedTiles,
            turnsHoldingAllCastles: this.turnsHoldingAllCastles
        };
    }

    static deserialize(data) {
        return new House(
            data.name,
            data.units,
            data.resources,
            data.actionPoints,
            data.revealedTiles,
            data.turnsHoldingAllCastles
        );
    }
}