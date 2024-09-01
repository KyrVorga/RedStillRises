export class TurnManager {
    constructor(scene, playerManager, aiManager, mapManager, playerHouse) {
        this.scene = scene;
        
        this.playerManager = playerManager;
        this.aiManager = aiManager;
        this.mapManager = mapManager;
        this.playerHouse = playerHouse;

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

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async nextTurn() {
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        const currentHouse = this.turnOrder[this.currentTurnIndex];

        if (currentHouse === this.playerHouse) {
            console.log("Player's turn started");
            await this.playerManager.notifyTurn(currentHouse);
            console.log("Player's turn ended");
        } else {
            console.log(currentHouse + "'s turn started");
            await this.aiManager.notifyTurn(currentHouse);
            console.log(currentHouse + "'s turn ended");
        }
    }

    async startGame() {
        while (true) {
            await this.nextTurn();
        }
    }
}