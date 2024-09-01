export class TurnManager {
    constructor(scene, playerManager, aiManager, mapManager, playerHouse, turnOrder = null, turnIndex=0) {
        this.scene = scene;
        console.log(turnOrder, turnIndex);
        
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
        if (turnOrder) {
            this.turnOrder = turnOrder;
        } else {
            this.turnOrder = this.shuffle(houses);
        }

        this.currentTurnIndex = turnIndex;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async nextTurn() {
        const currentHouse = this.turnOrder[this.currentTurnIndex];
        console.log('Current house:', currentHouse);

        if (currentHouse === this.playerHouse) {
            this.scene.updateTurnText("Your turn");
            await this.playerManager.notifyTurn(currentHouse);
        } else {
            this.scene.updateTurnText(currentHouse + "'s turn");
            await this.aiManager.notifyTurn(currentHouse);
        }
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
    }

    async startGame() {
        while (true) {
            await this.nextTurn();
        }
    }

    getTurnOrder() {
        return this.turnOrder;
    }

    getCurrentTurnIndex() {
        return this.currentTurnIndex;
    }
}