import { DecisionManager } from './AI/DecisionManager.js';
import { ActionManager } from './AI/ActionManager.js';
import { MovementManager } from './AI/MovementManager.js';

export class AIManager {
    constructor(scene, mapManager, houses, mapData) {
        this.scene = scene;
        this.mapManager = mapManager;
        this.houses = houses;
        this.mapData = mapData;

        this.houseNames = houses.map(house => house.name);
        this.currentHouse = null;
        this.turnManager = null;

        this.movementManager = new MovementManager(this, mapManager);
        this.decisionManager = new DecisionManager(this);
        this.actionManager = new ActionManager(this, this.movementManager);
    }

    async notifyTurn(houseName) {
        if (this.houseNames.includes(houseName)) {
            await this.takeTurn(houseName);
        }
    }

    setTurnManager(turnManager) {
        this.turnManager = turnManager;
    }

    async takeTurn(houseName) {
        const house = this.houses.find(house => house.name === houseName);
        this.currentHouse = house;

        // Check if the house is eliminated
        if (this.isEliminated(house)) {
            console.log(`${houseName} has been eliminated and will not take a turn.`);
            return;
        }

        let actionPoints = house.actionPoints;
        let failedAttempts = 0;

        while (house.actionPoints > 0 && failedAttempts < 10) {
            actionPoints = house.actionPoints;
            this.analyzeMap();
            const decision = this.decisionManager.makeDecision();

            if (decision) {
                try {
                    await this.actionManager.executeDecision(decision);
                    await delay(25);
                } catch (error) {
                    failedAttempts++;
                }
            } else {
                failedAttempts++;
            }
        }
        this.endTurn();
    }

    analyzeMap() {
        this.tilesWithUnits = this.getTilesWithUnits();
        this.castleTiles = this.getCastleTiles();
        this.enemyCastleTiles = this.getEnemyCastleTiles();
        this.outpostTiles = this.getOutpostTiles();
    }

    getVisibleTiles() {
        // Filter this.mapData to only include tiles that are revealed for the current house
        // currentHouse.revealedTiles is an array of objects with a q and r property
        return this.mapData.filter(tile => this.currentHouse.revealedTiles.some(revealedTile => revealedTile.q === tile.q && revealedTile.r === tile.r));
    }

    getTilesWithUnits() {
        return this.getVisibleTiles().filter(tile => tile.units > 0);
    }

    getTilesWithEnemyUnits() {
        return this.getVisibleTiles().filter(tile => tile.units > 0 && tile.house !== this.currentHouse.name.toLowerCase());
    }

    getCastleTiles() {
        return this.getVisibleTiles().filter(tile => tile.type === 'castle');
    }

    getEnemyCastleTiles() {
        return this.getCastleTiles().filter(tile => tile.house !== this.currentHouse.name.toLowerCase());
    }

    getOutpostTiles() {
        return this.getVisibleTiles().filter(tile => tile.type === 'outpost');
    }

    getCurrentHouse() {
        return this.currentHouse;
    }

    endTurn() {
        this.currentHouse.resetActionPoints();
        this.currentHouse = null;
    }

    isEliminated(house) {
        return house.units <= 0;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}