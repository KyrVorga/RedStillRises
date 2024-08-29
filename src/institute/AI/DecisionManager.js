export class DecisionManager {
    constructor(aiManager) {
        this.aiManager = aiManager;
    }

    makeDecision() {
        // Pick a random nearby tile to move to
        const visibleTiles = this.aiManager.getVisibleTiles();
        const randomTile = visibleTiles[Math.floor(Math.random() * visibleTiles.length)];

        return {
            type: 'Random Roaming',
            targetTile: randomTile
        };
    }
}