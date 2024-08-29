import PathFinder from './PathFinder.js';

export class MovementManager {
    constructor(aiManager, mapManager) {
        this.aiManager = aiManager;
        this.mapManager = mapManager;
        this.pathFinder = new PathFinder(mapManager);
        this.pathsBeingFollowed = [];
    }

    async findPath(fromTile, toTile) {
        const path = await this.pathFinder.findPath(fromTile, toTile);
        if (path) {
            this.pathsBeingFollowed.push(path);
        }
        return path;
    }

    getPath(source, dest) {
        // find the existing path from source to dest
        const path = this.pathsBeingFollowed.find(path => path[0] === source && path[path.length - 1] === dest);

        return path;
    }

    async followPath(path, units) {
        // Get the source tile and the next tile in the path
        const fromTile = path[0];
        const toTile = path[1];

        const currentHouse = this.aiManager.getCurrentHouse();

        // clamp the units to the source tile's unit count
        if (fromTile.units < units) {
            units = fromTile.units;
        }

        let actionCost

        // Calculate the action cost
        if (units < fromTile.units) {
            actionCost = this.mapManager.calculateActionCost(currentHouse, fromTile, toTile, units, 'split');
        } else {
            actionCost = this.mapManager.calculateActionCost(currentHouse, fromTile, toTile, units, 'move');
        }

        // Move the units from the source tile to the next tile
        if (currentHouse.canPerformAction(actionCost)) {
            // Perform the action
            await this.mapManager.moveUnits(currentHouse, fromTile, toTile, units);
        }

        // Remove the source tile from the path
        path.shift();
        if (path.length === 1) {
            this.pathsBeingFollowed = this.pathsBeingFollowed.filter(p => p !== path);
        }
        
        return actionCost;
    }
}