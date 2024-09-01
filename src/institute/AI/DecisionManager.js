export class DecisionManager {
    constructor(aiManager) {
        this.aiManager = aiManager;
    }

    async makeDecision() {
        await this.aiManager.analyzeMap();
        const visibleTiles = await this.aiManager.getVisibleTiles();
        const tilesWithUnits = await this.aiManager.getTilesWithUnits();
        const decisions = [];

        await Promise.all(tilesWithUnits.map(async (tile) => {
            if (await this.shouldDefend(tile)) {
                decisions.push(await this.defend(tile));
            } else if (await this.shouldRetreat(tile)) {
                decisions.push(await this.retreat(tile));
            } else if (await this.shouldAttack(tile)) {
                decisions.push(await this.attack(tile));
            } else if (await this.shouldExplore(tile)) {
                decisions.push(await this.explore(tile));
            } else if (await this.shouldTakeCastle(tile)) {
                decisions.push(await this.takeCastle(tile));
            } else {
                decisions.push(await this.randomRoaming(tile, visibleTiles));
            }
        }));

        console.log(decisions);
        return decisions;
    }

    async shouldRetreat(tile) {
        const threats = await this.aiManager.getThreats(tile);
        if (!threats) return false;
        return threats.length > 0 && tile.units < Math.max(...threats.map(t => t.units));
    }

    async retreat(tile) {
        const safeTile = await this.aiManager.findSafeTile(tile);
        if (!safeTile) return null;
        return {
            type: 'Retreat',
            tile: tile,
            targetTile: safeTile
        };
    }

    async shouldAttack(tile) {
        const enemies = await this.aiManager.getNearbyEnemies(tile);
        if (!enemies) return false;
        return enemies.some(enemy => tile.units > enemy.units);
    }

    async attack(tile) {
        const target = await this.aiManager.getWeakestEnemy(tile);
        console.log(target);
        if (!target) return null;
        return {
            type: 'Attack',
            tile: tile,
            targetTile: target.tile
        };
    }

    async shouldDefend(tile) {
        const isNearCastle = await this.aiManager.isNearCastle(tile);
        const isCastleUnderThreat = await this.aiManager.isCastleUnderThreat();
        const nearbyEnemies = await this.aiManager.getNearbyEnemies(tile);
        if (!nearbyEnemies) return false;

        return isNearCastle && (isCastleUnderThreat || nearbyEnemies.length > 0);
    }

    async defend(tile) {
        const castleTile = await this.aiManager.getCastleTile();
        const nearbyEnemies = await this.aiManager.getNearbyEnemies(tile);
        if (!castleTile || !nearbyEnemies) return null;

        if (nearbyEnemies.length > 0) {
            const closestEnemy = nearbyEnemies.reduce((closest, enemy) => {
                const distance = Math.abs(tile.q - enemy.q) + Math.abs(tile.r - enemy.r);
                return distance < closest.distance ? { enemy, distance } : closest;
            }, { enemy: null, distance: Infinity }).enemy;

            return {
                type: 'Defend',
                tile: tile,
                targetTile: closestEnemy.tile
            };
        }

        return {
            type: 'Defend',
            tile: tile,
            targetTile: castleTile
        };
    }

    async shouldExplore(tile) {
        const visibleTiles = await this.aiManager.getVisibleTiles();
        if (!visibleTiles) return false;
        return !this.aiManager.isNearCastle(tile) && visibleTiles.length < this.aiManager.getTotalTiles();
    }

    async explore(tile) {
        const unexploredTile = await this.aiManager.getUnexploredTile(tile);
        if (!unexploredTile) return null;
        return {
            type: 'Explore',
            tile: tile,
            targetTile: unexploredTile
        };
    }

    async shouldTakeCastle(tile) {
        const enemyCastle = await this.aiManager.getClosestEnemyCastle(tile);
        if (!enemyCastle) return false;

        const nearbyEnemies = await this.aiManager.getNearbyEnemies(tile);
        if (!nearbyEnemies) return false;

        const castleDefenders = enemyCastle.units;
        const totalEnemyStrength = castleDefenders + nearbyEnemies.reduce((acc, enemy) => acc + enemy.units, 0);
        return tile.units > totalEnemyStrength;
    }

    async takeCastle(tile) {
        const targetCastle = await this.aiManager.getClosestEnemyCastle(tile);
        if (!targetCastle) return null;
        return {
            type: 'Take Castle',
            tile: tile,
            targetTile: targetCastle
        };
    }

    async randomRoaming(tile, visibleTiles) {
        if (!visibleTiles || visibleTiles.length === 0) return null;
        const randomTile = visibleTiles[Math.floor(Math.random() * visibleTiles.length)];
        return {
            type: 'Random Roaming',
            tile: tile,
            targetTile: randomTile
        };
    }
}