export class House {
    constructor(name, units = 50, resources = {}) {
        this.name = name;
        this.units = units;
        this.resources = resources;
        this.turn = 0;
        this.actions = 0;
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
}