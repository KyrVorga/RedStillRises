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

export class Institute extends Scene {
    constructor() {
        super('Institute');
    }

    init(data) {
        this.house = data.house;
        this.name = data.name;
        this.tileSize = 96;
        this.sideLength = 30;
        this.margin = 100;

        this.mapGenerator = new MapGenerator(this.tileSize, this.sideLength);
        this.mapData = this.mapGenerator.generateMapData();
    }

    preload() {
        const borderlessSize = this.tileSize - 8;
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
        
        this.load.svg('fog', 'assets/tiles/Fog.svg', { width: this.tileSize, height: this.tileSize });

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


        const iconWidth = this.tileSize * 0.6;
        const iconHeight = this.tileSize * 0.6;
        const houseIconWidth = this.tileSize * 0.4;
        const houseIconHeight = this.tileSize * 0.4;

        // Load house logo svgs
        this.load.svg('apollo', "assets/icons/house/apollo.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('bacchus', "assets/icons/house/bacchus.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('ceres', "assets/icons/house/ceres.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('diana', "assets/icons/house/diana.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('juno', "assets/icons/house/juno.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('jupiter', "assets/icons/house/jupiter.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('mars', "assets/icons/house/mars.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('mercury', "assets/icons/house/mercury.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('minerva', "assets/icons/house/minerva.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('neptune', "assets/icons/house/neptune.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('pluto', "assets/icons/house/pluto.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('venus', "assets/icons/house/venus.svg", { width: houseIconWidth, height: houseIconHeight });
        this.load.svg('vulcan', "assets/icons/house/vulcan.svg", { width: houseIconWidth, height: houseIconHeight });

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
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);

        // Add background image and set it to follow the camera
        const background = this.add.image(0, 0, 'institute').setAlpha(0.5);
        background.setOrigin(0, 0);
        background.setScrollFactor(0); 
        background.setDepth(-1); 
        background.setScale(0.75);

        this.mapManager = new MapManager(this, this.mapData, this.tileSize);
        const playerHouse = this.mapManager.revealPlayerHouseTile(this.house);

        this.playerManager = new PlayerManager(this, this.mapManager, playerHouse);
        this.mapManager.setPlayerManager(this.playerManager);
        
        const houses = House.instantiateHouses();
        this.aiManager = new AIManager(this, this.mapManager, houses);
        this.turnManager = new TurnManager(this, this.playerManager, this.aiManager);

        this.cameraController = new CameraController(this);
        this.cameraController.initializeCamera(playerHouse.x, playerHouse.y, 1);
        this.cameraController.enablePanning();

        // Tooltip setup
        this.tooltip = new Tooltip(this, 0, 0, '');
        this.hoveredTile = null;
        this.hoverStartTime = 0;
        this.hoveredPosition = { x: 0, y: 0 };
        this.hoverTimer = null;

        this.input.on('pointermove', (pointer) => {
            const tile = this.mapManager.getTileAt(pointer.worldX, pointer.worldY);
            if (tile !== this.hoveredTile) {
                this.hoveredTile = tile;
                this.hoverStartTime = this.time.now;
                this.hoveredPosition = { x: pointer.worldX, y: pointer.worldY };
                this.tooltip.hide();

                // Clear any existing timer
                if (this.hoverTimer) {
                    this.hoverTimer.remove(false);
                }

                // Start a new timer for the remaining time
                this.hoverTimer = this.time.delayedCall(1500, () => {
                    if (this.hoveredTile && pointer.worldX === this.hoveredPosition.x && pointer.worldY === this.hoveredPosition.y) {
                        this.tooltip.show(pointer.worldX, pointer.worldY, `Tile: ${tile.q}, ${tile.r}`);
                    }
                });
            // } else if (this.hoveredTile && this.time.now - this.hoverStartTime > 1500) {
            //     this.tooltip.show(pointer.worldX, pointer.worldY, `Tile: ${tile.q}, ${tile.r}`);
            }
        });

        this.input.on('pointerout', () => {
            this.tooltip.hide();
            this.hoveredTile = null;

            // Clear the timer when the cursor leaves the tile
            if (this.hoverTimer) {
                this.hoverTimer.remove(false);
            }
        });
        // Timer event to check hover state
        // this.time.addEvent({
        //     delay: 100, // Check every 100ms
        //     callback: () => {
        //         if (this.hoveredTile && this.time.now - this.hoverStartTime > 1500) {
        //             const pointer = this.input.activePointer;
        //             this.tooltip.show(pointer.worldX, pointer.worldY, `Tile: ${this.hoveredTile.q}, ${this.hoveredTile.r}`);
        //         }
        //     },
        //     loop: true
        // });
        // this.overlayManager = new OverlayManager(this, this.margin);
        // this.overlay = this.overlayManager.createOverlay();



        this.turnManager.startGame();
    }
}