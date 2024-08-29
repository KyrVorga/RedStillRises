export class AIManager {
    constructor(scene, mapManager, houses) {
        this.scene = scene;
        this.mapManager = mapManager;
        this.houses = houses;
        this.houseNames = houses.map(house => house.name);

    }

    notifyTurn(house) {
       if (this.houseNames.includes(house)) {
           console.log('AI turn:', house);
           this.takeTurn(house);
       }
    }

    takeTurn(houseName) {
        const house = this.houses.find(house => house.name === houseName);
        console.log(house);

    }

}

