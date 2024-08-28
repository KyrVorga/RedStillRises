export class TurnManager {
    constructor(scene, playerManager, aiManager) {
        this.scene = scene;
        
        this.playerManager = playerManager;
        this.aiManager = aiManager;
        const houses = [
            "Apollo",
            "Bacchus",
            "Ceres",
            "Diana",
            "Juno",
            "Jupiter",
            "Mars",
            "Mercury",
            "Minerva",
            "Neptune",
            "Pluto",
            "Venus",
            "Vulcan",
        ]
        this.turnOrder = this.shuffle(houses);
        this.currentTurnIndex = 0;
    }

    // Fisher-Yates shuffle algorithm to randomize the turn order
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Check if it's the given player's turn
    isPlayerTurn(player) {
        return this.turnOrder[this.currentTurnIndex] === player;
    }

    // Move to the next turn
    nextTurn() {
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        const currentHouse = this.turnOrder[this.currentTurnIndex];
        this.aiManager.notifyTurn(currentHouse);
        this.playerManager.notifyTurn(currentHouse);
    }

    startGame() {
        const currentHouse = this.turnOrder[this.currentTurnIndex];
        this.aiManager.notifyTurn(currentHouse);
        this.playerManager.notifyTurn(currentHouse);
    }
}