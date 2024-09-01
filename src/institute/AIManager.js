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
            return;
        }

        let failedAttempts = 0;

        while (house.actionPoints > 0 && failedAttempts < 10) {
            this.analyzeMap();
            const decision = await this.decisionManager.makeDecision();
            console.log(decision);

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

    async analyzeMap() {
        this.tilesWithUnits = await this.getTilesWithUnits();
        this.castleTiles = await this.getCastleTiles();
        this.enemyCastleTiles = await this.getEnemyCastleTiles();
        this.outpostTiles = await this.getOutpostTiles();
    }

    async getVisibleTiles() {
        // Filter this.mapData to only include tiles that are revealed for the current house
        // currentHouse.revealedTiles is an array of objects with a q and r property
        return this.mapData.filter(tile => this.currentHouse.revealedTiles.some(revealedTile => revealedTile.q === tile.q && revealedTile.r === tile.r));
    }

    async getTilesWithUnits() {
        const visibleTiles = await this.getVisibleTiles();
        return visibleTiles.filter(tile => tile.units > 0);
    }

    async getTilesWithEnemyUnits() {
        const visibleTiles = await this.getVisibleTiles();
        return visibleTiles.filter(tile => tile.units > 0 && tile.house !== this.currentHouse.name.toLowerCase());
    }

    async getCastleTiles() {
        const visibleTiles = await this.getVisibleTiles();
        return visibleTiles.filter(tile => tile.type === 'castle');
    }

    async getEnemyCastleTiles() {
        const castleTiles = await this.getCastleTiles();
        return castleTiles.filter(tile => tile.house !== this.currentHouse.name.toLowerCase());
    }

    async getOutpostTiles() {
        const visibleTiles = await this.getVisibleTiles();
        return visibleTiles.filter(tile => tile.type === 'outpost');
    }

    getCurrentHouse() {
        return this.currentHouse;
    }

    async getThreats(tile) {
        const nearbyEnemies = await this.getNearbyEnemies(tile);
        const threats = nearbyEnemies.filter(enemyTile => enemyTile.units > tile.units);
        return threats;
    }

    async isAdjacent(tile1, tile2) {
        // Assuming tiles have q and r properties for coordinates
        const dq = Math.abs(tile1.q - tile2.q);
        const dr = Math.abs(tile1.r - tile2.r);
        return (dq <= 1 && dr <= 1);
    }

    async getNearbyEnemies(tile) {
        const visibleTiles = await this.getVisibleTiles();
        const enemyTiles = visibleTiles.filter(visibleTile => visibleTile.units > 0 && visibleTile.house !== this.currentHouse.name.toLowerCase());
        const nearbyEnemies = enemyTiles.filter(enemyTile => this.isAdjacent(tile, enemyTile));
        return nearbyEnemies;
    }

    async getWeakestEnemy(tile) {
        const nearbyEnemies = await this.getNearbyEnemies(tile);
        return nearbyEnemies.reduce((weakest, enemyTile) => {
            return enemyTile.units < weakest.units ? enemyTile : weakest;
        }, { units: Infinity });
    }

    async findSafeTile(tile) {
        const visibleTiles = await this.getVisibleTiles();
        const safeTiles = visibleTiles.filter(visibleTile => visibleTile.units === 0);
        const safeTile = safeTiles.find(safeTile => this.isAdjacent(tile, safeTile));
        return safeTile;
    }

    async isNearCastle(tile) {
        const visibleTiles = await this.getVisibleTiles();
        const castleTiles = visibleTiles.filter(visibleTile => visibleTile.type === 'castle');
        return castleTiles.some(castleTile => this.isAdjacent(tile, castleTile));
    }

    async isCastleUnderThreat() {
        const castleTiles = await this.getCastleTiles();
        const enemyUnits = await this.getTilesWithEnemyUnits();
        return castleTiles.some(castleTile => enemyUnits.some(enemyTile => this.isAdjacent(enemyTile, castleTile)));
    }

    async getCastleTile() {
        const castleTiles = await this.getCastleTiles();
        return castleTiles.find(tile => tile.house === this.currentHouse.name.toLowerCase());
    }

    async getTotalTiles() {
        return this.mapData.length;
    }

    async getClosestEnemyCastle(tile) {
        const enemyCastles = await this.getEnemyCastleTiles();
        console.log(enemyCastles);
        let closestCastle = null;
        let minDistance = Infinity;

        enemyCastles.forEach(castleTile => {
            const distance = Math.abs(tile.q - castleTile.q) + Math.abs(tile.r - castleTile.r);
            if (distance < minDistance) {
                minDistance = distance;
                closestCastle = castleTile;
            }
        });

        return closestCastle;
    }

    async getUnexploredTile() {
        const visibleTiles = await this.getVisibleTiles();
        const unexploredTiles = this.mapData.filter(tile => !visibleTiles.includes(tile));
        return unexploredTiles.length > 0 ? unexploredTiles[0] : null;
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