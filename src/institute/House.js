export class House {
    constructor(name, units = 50, resources = {}) {
        this.name = name;
        this.units = units;
        this.resources = resources;
        this.turn = 0;
        this.actionPoints = 0;
        this.revealedTiles = [];
    }

    addUnits(units) {
        this.units += units;
    }

    removeUnits(units) {
        this.units = Math.max(0, this.units - units);
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
}