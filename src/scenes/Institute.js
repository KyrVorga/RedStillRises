import { Scene } from 'phaser';
import { MapGenerator } from '../institute/MapGenerator';
import { OverlayManager } from '../institute/OverlayManager';
import { CameraController } from '../institute/CameraController';
import { MapManager } from '../institute/MapManager';
import { Tooltip } from '../institute/Tooltip';
import { PlayerManager } from '../institute/PlayerManager';
import { AIManager } from '../institute/AIManager';
import { TurnManager } from '../institute/TurnManager';
import { House } from '../institute/House';
import { Tile } from '../institute/Tile';

export class Institute extends Scene {
    constructor() {
        super('Institute');
    }

    init() {
        this.tileSize = 96;
        this.sideLength = 20;
        this.margin = 100;
    }

    preload() {
        const borderlessSize = this.tileSize - 8;
        const occupiedSize = this.tileSize - 16;

        this.load.svg('grassland', 'assets/tiles/Grassland.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('mountain', 'assets/tiles/Mountain.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('hill', 'assets/tiles/Hill.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('forest', 'assets/tiles/Forest.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('greatwood', 'assets/tiles/Greatwood.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('farmland', 'assets/tiles/Farmland.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('desert', 'assets/tiles/Desert.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('swamp', 'assets/tiles/Swamp.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('tundra', 'assets/tiles/Tundra.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('castle', 'assets/tiles/Castle.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('shallow', 'assets/tiles/Shallow.svg', { width: borderlessSize, height: borderlessSize });
        this.load.svg('deep', 'assets/tiles/Deep.svg', { width: borderlessSize, height: borderlessSize });

        
        this.load.svg('grassland_occupied', 'assets/tiles/Grassland.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('mountain_occupied', 'assets/tiles/Mountain.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('hill_occupied', 'assets/tiles/Hill.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('forest_occupied', 'assets/tiles/Forest.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('greatwood_occupied', 'assets/tiles/Greatwood.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('farmland_occupied', 'assets/tiles/Farmland.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('desert_occupied', 'assets/tiles/Desert.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('swamp_occupied', 'assets/tiles/Swamp.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('tundra_occupied', 'assets/tiles/Tundra.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('castle_occupied', 'assets/tiles/Castle.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('shallow_occupied', 'assets/tiles/Shallow.svg', { width: occupiedSize, height: occupiedSize });
        this.load.svg('deep_occupied', 'assets/tiles/Deep.svg', { width: occupiedSize, height: occupiedSize });
        
        this.load.svg('fog', 'assets/tiles/Fog.svg', { width: this.tileSize, height: this.tileSize });

        this.load.svg('eye', 'assets/icons/eye.svg', { width: 32, height: 32 });
        this.load.svg('eye-off', 'assets/icons/eye-off.svg', { width: 32, height: 32 });
        this.load.svg('info', 'assets/icons/info.svg', { width: 32, height: 32 });
        this.load.svg('help', 'assets/icons/help.svg', { width: 32, height: 32 });
        this.load.svg('close', 'assets/icons/close.svg', { width: 32, height: 32 });

        this.load.svg('apollo_border', 'assets/tiles/ApolloBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('bacchus_border', 'assets/tiles/BacchusBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('ceres_border', 'assets/tiles/CeresBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('diana_border', 'assets/tiles/DianaBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('juno_border', 'assets/tiles/JunoBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('jupiter_border', 'assets/tiles/JupiterBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('mars_border', 'assets/tiles/MarsBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('mercury_border', 'assets/tiles/MercuryBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('minerva_border', 'assets/tiles/MinervaBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('neptune_border', 'assets/tiles/NeptuneBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('pluto_border', 'assets/tiles/PlutoBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('venus_border', 'assets/tiles/VenusBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('vulcan_border', 'assets/tiles/VulcanBorder.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('normal_border', 'assets/tiles/NormalBorder.svg', { width: this.tileSize, height: this.tileSize });


        const iconWidth = this.tileSize * 0.55;
        const iconHeight = this.tileSize * 0.55;
        const smallIconWidth = this.tileSize * 0.4;
        const smallIconHeight = this.tileSize * 0.4;

        // Load house logo svgs
        this.load.svg('apollo', "assets/icons/house/apollo.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('bacchus', "assets/icons/house/bacchus.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('ceres', "assets/icons/house/ceres.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('diana', "assets/icons/house/diana.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('juno', "assets/icons/house/juno.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('jupiter', "assets/icons/house/jupiter.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('mars', "assets/icons/house/mars.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('mercury', "assets/icons/house/mercury.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('minerva', "assets/icons/house/minerva.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('neptune', "assets/icons/house/neptune.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('pluto', "assets/icons/house/pluto.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('venus', "assets/icons/house/venus.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('vulcan', "assets/icons/house/vulcan.svg", { width: iconWidth, height: iconHeight });

        //load tile icons
        this.load.svg('forest_1', "assets/icons/forest/forest_1.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('forest_2', "assets/icons/forest/forest_2.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('forest_3', "assets/icons/forest/forest_3.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('grassland_1', "assets/icons/grassland/grassland_1.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('farmland_1', "assets/icons/farmland/farmland_1.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('greatwood_1', "assets/icons/greatwood/greatwood_1.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('greatwood_2', "assets/icons/greatwood/greatwood_2.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('greatwood_3', "assets/icons/greatwood/greatwood_3.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('greatwood_4', "assets/icons/greatwood/greatwood_4.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('squiggle_1', "assets/icons/squiggle/squiggle_1.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('squiggle_2', "assets/icons/squiggle/squiggle_2.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('squiggle_3', "assets/icons/squiggle/squiggle_3.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('hill_1', "assets/icons/hill/hill_1.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('hill_2', "assets/icons/hill/hill_2.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('hill_3', "assets/icons/hill/hill_3.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('hill_4', "assets/icons/hill/hill_4.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('hill_5', "assets/icons/hill/hill_5.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('hill_6', "assets/icons/hill/hill_6.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('mountain_1', "assets/icons/mountain/mountain_1.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('mountain_2', "assets/icons/mountain/mountain_2.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('mountain_3', "assets/icons/mountain/mountain_3.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('mountain_4', "assets/icons/mountain/mountain_4.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('mountain_5', "assets/icons/mountain/mountain_5.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('mountain_6', "assets/icons/mountain/mountain_6.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('swamp_1', "assets/icons/swamp/swamp_1.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('swamp_2', "assets/icons/swamp/swamp_2.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('swamp_3', "assets/icons/swamp/swamp_3.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('swamp_4', "assets/icons/swamp/swamp_4.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('tundra_1', "assets/icons/tundra/tundra_1.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('tundra_2', "assets/icons/tundra/tundra_2.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('tundra_3', "assets/icons/tundra/tundra_3.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('tundra_4', "assets/icons/tundra/tundra_4.svg", { width: iconWidth, height: iconHeight });

        this.load.svg('outpost_1', "assets/icons/outpost/outpost_1.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('outpost_2', "assets/icons/outpost/outpost_2.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('outpost_3', "assets/icons/outpost/outpost_3.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('outpost_4', "assets/icons/outpost/outpost_4.svg", { width: iconWidth, height: iconHeight });
        this.load.svg('outpost_5', "assets/icons/outpost/outpost_5.svg", { width: iconWidth, height: iconHeight });

        //load smaller tile icons
        this.load.svg('apollo_small', "assets/icons/house/apollo.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('bacchus_small', "assets/icons/house/bacchus.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('ceres_small', "assets/icons/house/ceres.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('diana_small', "assets/icons/house/diana.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('juno_small', "assets/icons/house/juno.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('jupiter_small', "assets/icons/house/jupiter.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('mars_small', "assets/icons/house/mars.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('mercury_small', "assets/icons/house/mercury.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('minerva_small', "assets/icons/house/minerva.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('neptune_small', "assets/icons/house/neptune.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('pluto_small', "assets/icons/house/pluto.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('venus_small', "assets/icons/house/venus.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('vulcan_small', "assets/icons/house/vulcan.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('forest_1_small', "assets/icons/forest/forest_1.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('forest_2_small', "assets/icons/forest/forest_2.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('forest_3_small', "assets/icons/forest/forest_3.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('grassland_1_small', "assets/icons/grassland/grassland_1.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('farmland_1_small', "assets/icons/farmland/farmland_1.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('greatwood_1_small', "assets/icons/greatwood/greatwood_1.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('greatwood_2_small', "assets/icons/greatwood/greatwood_2.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('greatwood_3_small', "assets/icons/greatwood/greatwood_3.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('greatwood_4_small', "assets/icons/greatwood/greatwood_4.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('squiggle_1_small', "assets/icons/squiggle/squiggle_1.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('squiggle_2_small', "assets/icons/squiggle/squiggle_2.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('squiggle_3_small', "assets/icons/squiggle/squiggle_3.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('hill_1_small', "assets/icons/hill/hill_1.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('hill_2_small', "assets/icons/hill/hill_2.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('hill_3_small', "assets/icons/hill/hill_3.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('hill_4_small', "assets/icons/hill/hill_4.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('hill_5_small', "assets/icons/hill/hill_5.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('hill_6_small', "assets/icons/hill/hill_6.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('mountain_1_small', "assets/icons/mountain/mountain_1.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('mountain_2_small', "assets/icons/mountain/mountain_2.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('mountain_3_small', "assets/icons/mountain/mountain_3.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('mountain_4_small', "assets/icons/mountain/mountain_4.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('mountain_5_small', "assets/icons/mountain/mountain_5.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('mountain_6_small', "assets/icons/mountain/mountain_6.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('swamp_1_small', "assets/icons/swamp/swamp_1.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('swamp_2_small', "assets/icons/swamp/swamp_2.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('swamp_3_small', "assets/icons/swamp/swamp_3.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('swamp_4_small', "assets/icons/swamp/swamp_4.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('tundra_1_small', "assets/icons/tundra/tundra_1.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('tundra_2_small', "assets/icons/tundra/tundra_2.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('tundra_3_small', "assets/icons/tundra/tundra_3.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('tundra_4_small', "assets/icons/tundra/tundra_4.svg", { width: smallIconWidth, height: smallIconHeight });

        this.load.svg('outpost_1_small', "assets/icons/outpost/outpost_1.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('outpost_2_small', "assets/icons/outpost/outpost_2.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('outpost_3_small', "assets/icons/outpost/outpost_3.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('outpost_4_small', "assets/icons/outpost/outpost_4.svg", { width: smallIconWidth, height: smallIconHeight });
        this.load.svg('outpost_5_small', "assets/icons/outpost/outpost_5.svg", { width: smallIconWidth, height: smallIconHeight });
    }

    async create() {
        this.cameras.main.setBackgroundColor(0x000000);

        // Add background image and set it to follow the camera
        const background = this.add.image(0, 0, 'institute').setAlpha(0.5);
        background.setOrigin(0, 0);
        background.setScrollFactor(0); 
        background.setDepth(-1); 
        background.setScale(0.75);

        this.loadProgress();

        this.mapManager = new MapManager(this, this.mapData, this.tileSize, this.playerHouse, this.houses);
        await this.mapManager.revealHouseTiles(this.houses);

        this.playerManager = new PlayerManager(this, this.mapManager, this.playerHouse);
        this.mapManager.setPlayerManager(this.playerManager);
        
        this.aiManager = new AIManager(this, this.mapManager, this.aiHouses, this.mapData);
        this.turnManager = new TurnManager(this, this.playerManager, this.aiManager, this.mapManager, this.playerHouse.name, this.turnOrder, this.turnIndex);

        this.playerManager.setTurnManager(this.turnManager);
        this.aiManager.setTurnManager(this.turnManager);

        const playerHouseTile = this.mapData.find(tile => tile.icon === this.playerHouse.name.toLowerCase());
        let {x, y} = this.mapManager.getTileCoordinates(playerHouseTile.q, playerHouseTile.r);

        this.cameraController = new CameraController(this);
        this.cameraController.initializeCamera(x, y, 1);
        this.cameraController.enablePanning();

        this.mapManager.revealAllTiles(this.playerHouse);
        await this.mapManager.renderMap(this.playerHouse);
        this.turnManager.startGame();
    }

    loadProgress() {
        const gameState = localStorage.getItem('gameState');
        this.name = localStorage.getItem('playerName');
        this.house = localStorage.getItem('playerHouse');

        if (gameState) {
            const { mapData, houses, turnOrder, turnIndex } = JSON.parse(gameState);
            this.mapData = mapData.map(tile => Tile.deserialize(tile));
            this.houses = houses.map(house => House.deserialize(house));
            
            this.turnOrder = turnOrder;
            this.turnIndex = turnIndex;
            
            this.playerHouse = this.houses.find((house) => house.name.toLowerCase() === this.house);
            this.aiHouses = this.houses.filter((house) => house.name.toLowerCase() !== this.house);
        } else {
            this.mapGenerator = new MapGenerator(this.tileSize, this.sideLength);
            this.mapData = this.mapGenerator.generateMapData();
            

            this.houses = House.instantiateHouses();
            this.playerHouse = this.houses.find((house) => house.name.toLowerCase() === this.house);
            
            this.aiHouses = this.houses.filter((house) => house.name.toLowerCase() !== this.house);
        }
    }

    saveProgress() {
        const gameState = {
            mapData: this.mapManager.getMapData(),
            houses: this.houses,
            turnOrder: this.turnManager.getTurnOrder(),
            turnIndex: this.turnManager.getCurrentTurnIndex(),
        };
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }

     checkWinLoseConditions() {
        // Check lose condition: player loses all units
        if (this.playerHouse.getTotalUnits() === 0) {
            this.endGame('lose', 'Your house has been eliminated.');
            return;
        }
    
        // Check win condition: player has 650 units
        if (this.playerHouse.getTotalUnits() >= 650) {
            this.endGame('win', 'You have eliminated all other houses.');
            return;
        }
    
        // Check win condition for all houses
        for (let house of this.houses) {
            const houseHoldsAllCastles = house.getTotalCastles() === 13; // Assuming castles is an array of castles held by the house
            if (houseHoldsAllCastles) {
                house.turnsHoldingCastles++;
                if (house.turnsHoldingCastles >= 5) {
                    if (house === this.playerHouse) {
                        this.endGame('win', 'You have held all 13 castles for 5 turns in a row.');
                    } else {
                        this.endGame('lose', `House ${house.name} has held all 13 castles for 5 turns in a row.`);
                        this.aiManager.removeHouse(house); // Assuming aiManager has a method to remove a house
                    }
                    return;
                }
            } else {
                house.turnsHoldingCastles = 0;
            }
        }
    }

    getHouse(houseName) {
        return this.houses.find(house => house.name.toLowerCase() === houseName.toLowerCase());
    }
    
    endGame(result, reason) {
        if (result === 'win') {
            alert(`Congratulations! You have won the game! Reason: ${reason}`);
        } else if (result === 'lose') {
            alert(`Game Over! You have lost the game. Reason: ${reason}`);
        }
    
        localStorage.removeItem('gameState');
        localStorage.removeItem('playerName');
        localStorage.removeItem('playerHouse');
    
        localStorage.setItem('currentScene', 'CarvingQuestions');
    
        this.scene.start('MainMenu');
    }

    displayMessage(message) {
        this.playerManager.overlayManager.displayMessage(message);
    }
    updateTurnText(houseName) {
        this.playerManager.overlayManager.updateTurnText(houseName);
    }
}