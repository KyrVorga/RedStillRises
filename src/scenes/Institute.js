import { Scene } from 'phaser';
import { MapGenerator } from '../institute/MapGenerator';
import { OverlayManager } from '../institute/OverlayManager';
import { CameraController } from '../institute/CameraController';
import { MapManager } from '../institute/MapManager';

export class Institute extends Scene {
    constructor() {
        super('Institute');
    }

    init(data) {
        this.house = data.house;
        this.name = data.name;
        this.tileSize = 64;
        this.sideLength = 30;
        this.margin = 100;

        this.mapGenerator = new MapGenerator(this.tileSize, this.sideLength);
        this.mapData = this.mapGenerator.generateMapData();
    }

    preload() {
        this.load.svg('grassland', 'assets/tiles/Grassland.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('fog', 'assets/tiles/Fog.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('mountain', 'assets/tiles/Mountain.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('hill', 'assets/tiles/Hill.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('forest', 'assets/tiles/Forest.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('greatwood', 'assets/tiles/Greatwood.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('farmland', 'assets/tiles/Farmland.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('desert', 'assets/tiles/Desert.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('swamp', 'assets/tiles/Swamp.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('tundra', 'assets/tiles/Tundra.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('castle', 'assets/tiles/Castle.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('shallow', 'assets/tiles/Shallow.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('deep', 'assets/tiles/Deep.svg', { width: this.tileSize, height: this.tileSize });

        const iconWidth = this.tileSize * 0.6;
        const iconHeight = this.tileSize * 0.6;

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
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);

        const hexWidth = this.tileSize;
        const hexHeight = Math.sqrt(3) / 2 * hexWidth;

        const centerTile = this.mapData.find(tile => tile.q === 0 && tile.r === 0);
        const centerX = hexWidth * (3/4 * centerTile.q);
        const centerY = hexHeight * (centerTile.r + centerTile.q / 2);

        this.cameraController = new CameraController(this);
        this.cameraController.initializeCamera(centerX, centerY, 1);
        this.cameraController.enablePanning();


        // Add background image and set it to follow the camera
        const background = this.add.image(0, 0, 'institute').setAlpha(0.5);
        background.setOrigin(0, 0);
        background.setScrollFactor(0); 
        background.setDepth(-1); 
        background.setScale(0.75);

        this.mapManager = new MapManager(this, this.mapData, this.tileSize, this.margin);
        this.mapManager.revealAllTiles();

        // this.overlayManager = new OverlayManager(this, this.margin);
        // this.overlay = this.overlayManager.createOverlay();
    }
}