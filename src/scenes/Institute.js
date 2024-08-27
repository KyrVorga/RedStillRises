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
        this.sideLength = 10;
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

        this.overlayManager = new OverlayManager(this, this.margin);
        this.overlay = this.overlayManager.createOverlay();
    }
}