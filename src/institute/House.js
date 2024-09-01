import { Tile } from './Tile.js';

export class House {
    constructor(name, units = 50, resources = { food: 0, wood: 0, stone: 0}, actionPoints = 5, revealedTiles = []) {
        this.name = name;
        this.units = units;
        this.resources = resources;
        this.actionPoints = actionPoints;
        this.revealedTiles = revealedTiles;
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

    serialize() {
        return {
            name: this.name,
            units: this.units,
            resources: this.resources,
            actionPoints: this.actionPoints,
            revealedTiles: this.revealedTiles.map(tile => tile.serialize()),
        };
    }

    static deserialize(data) {
        return new House(
            data.name,
            data.units,
            data.resources,
            data.actionPoints,
            data.revealedTiles
        );
    }
}