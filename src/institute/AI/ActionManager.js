export class ActionManager {
    constructor(aiManager, movementManager) {
        this.aiManager = aiManager;
        this.movementManager = movementManager;
    }

    async executeDecision(decisions) {
        for (const decision of decisions) {
            console.log(decision);
            switch (decision.type) {
                case 'Retreat':
                    await this.retreat(decision.tile, decision.targetTile);
                    break;
                case 'Attack':
                    await this.attack(decision.tile, decision.targetTile);
                    break;
                case 'Defend':
                    await this.defend(decision.tile, decision.targetTile);
                    break;
                case 'Explore':
                    await this.explore(decision.tile, decision.targetTile);
                    break;
                case 'Take Castle':
                    await this.takeCastle(decision.tile, decision.targetTile);
                    break;
                case 'Random Roaming':
                    await this.randomRoaming(decision.targetTile);
                    break;
                default:
                    break;
            }
        }
    }

    async retreat(unit, targetTile) {
        console.log('Retreating: ' + targetTile, "from: ", unit);
        const path = await this.movementManager.findPath(unit, targetTile);
        const actionCost = await this.movementManager.followPath(path, unit.units);
        this.aiManager.currentHouse.performAction(actionCost);
    }

    async attack(unit, targetTile) {
        console.log('Attacking: ' + targetTile, "from: ", unit);

        const path = await this.movementManager.findPath(unit, targetTile);
        const actionCost = await this.movementManager.followPath(path, unit.units);
        this.aiManager.currentHouse.performAction(actionCost);
    }

    async defend(unit, targetTile) {
        console.log('Defending: ' + targetTile, "from: ", unit);
        const path = await this.movementManager.findPath(unit, targetTile);
        const actionCost = await this.movementManager.followPath(path, unit.units);
        this.aiManager.currentHouse.performAction(actionCost);
    }

    async explore(unit, targetTile) {
        console.log('Exploring: ' + targetTile, "from: ", unit);
        const path = await this.movementManager.findPath(unit, targetTile);
        console.log(path);
        const actionCost = await this.movementManager.followPath(path, unit.units);
        console.log(actionCost);
        this.aiManager.currentHouse.performAction(actionCost);
    }

    async takeCastle(unit, targetTile) {
        console.log('Taking Castle: ' + targetTile, "from: ", unit);
        const path = await this.movementManager.findPath(unit, targetTile);
        const actionCost = await this.movementManager.followPath(path, unit.units);
        this.aiManager.currentHouse.performAction(actionCost);
    }

    async randomRoaming(targetTile) {
        console.log('Random Roaming: ' + targetTile);
        // Get all of the houses units
        const tilesWithUnits = await this.aiManager.getTilesWithUnits();
    
        // Find any groups of units larger than 15
        const largeGroups = tilesWithUnits.filter(tile => tile.units > 15);
    
        let path;
        let actionCost = 1;
    
        // If there are groups larger than 15
        if (largeGroups.length > 0) {
            for (const unitGroup of largeGroups) {
                // Check if the group has a path being followed
                if (this.movementManager.pathsBeingFollowed.includes(unitGroup)) {
                    // Get the path being followed
                    path = this.movementManager.getPath(unitGroup, targetTile);
                    
                    // Split the group in half if its larger than 10, onto the next tile in the path
                    const unitsHalved = Math.floor(unitGroup.units / 2);
                    actionCost = await this.movementManager.followPath(path, unitsHalved);
    
                // Else there are no large groups with a path being followed
                } else {
                    // Create a path to the target tile
                    path = await this.movementManager.findPath(unitGroup, targetTile);
    
                    // Split the group in half if its larger than 10, onto the next tile in the path
                    const unitsHalved = Math.floor(unitGroup.units / 2);
                    actionCost = await this.movementManager.followPath(path, unitsHalved);
                }
            }
    
        // If there arent any groups larger than 15
        } else if (largeGroups.length === 0) {
            for (const unitGroup of tilesWithUnits) {
                if (!this.movementManager.pathsBeingFollowed.includes(unitGroup)) {
                    // Create a path to the target tile
                    path = await this.movementManager.findPath(unitGroup, targetTile);
                    actionCost = await this.movementManager.followPath(path, unitGroup.units);
                }
            }
    
        // Else every group is smaller than 15 and has a path being followed
        } else {
            for (const unitGroup of tilesWithUnits) {
                // Get the path being followed
                path = this.movementManager.getPath(unitGroup, targetTile);
                
                // Move the units to the next tile in the path
                actionCost = await this.movementManager.followPath(path, unitGroup.units);
            }
        }
        // Deduct the action cost from the current house
        this.aiManager.currentHouse.performAction(actionCost);
        // console.log(currentHouse.name + ' has ' + currentHouse.actionPoints + ' action points left');
    }


    async splitUnits(units, groupSize) {
        let groups = [];
        for (let i = 0; i < units; i += groupSize) {
            groups.push(Math.min(groupSize, units - i));
        }
        return groups;
    }
}