import { Scene } from 'phaser';

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

export class Institute extends Scene {
    constructor() {
        super('Institute');
    }

    init(data) {
        this.house = data.house;
        this.name = data.name;
        this.tileSize = 64;       // Size of each tile
        this.gridSize = 3;      // 100x100 grid
        this.margin = 100;         // this.margin around the grid

        this.canvasHeight = 1000;
        this.canvasWidth = 1000;
        
        this.mapData = this.generateMapData(this.gridSize);
        this.fogTiles = [];
    }

    preload() {
        // Optional: Load a background image
        this.load.image('background', 'path/to/background.png');
        
        // Load hexagonal tile images
        this.load.svg('hex', 'assets/tiles/Grassland.svg', { width: this.tileSize, height: this.tileSize });
        this.load.svg('fog', 'assets/tiles/Fog.svg', { width: this.tileSize, height: this.tileSize });

    }
    
    create() {
        console.log("canvas:", this.canvasWidth, this.canvasHeight);
    
        const viewportWidth = this.cameras.main.width;
        const viewportHeight = this.cameras.main.height;
        console.log("viewport:", viewportWidth, viewportHeight);
    
        const gridWidth = this.gridSize * this.tileSize;
        const gridHeight = this.gridSize * this.tileSize;
        console.log("grid:", gridWidth, gridHeight);
    
        let startX = -(gridWidth / 2) - (this.tileSize / 2);
        let startY = -(gridHeight / 2)- (this.tileSize / 2);
        console.log("start:", startX, startY);
        
        // Create the grid of hexagonal tiles
        const hexWidth = this.tileSize;
        const hexHeight = Math.sqrt(3) / 2 * hexWidth; // Height of a flat-top hexagon
        const scaleFactor = 1; // Adjust scale as needed

        // Center tile at (0, 0)
        const centerX = 64 * 8;
        const centerY = 64 * 6;
        console.log("center:", centerX, centerY);


        // Lay out the map tiles
        this.mapData.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                const posX = startX + colIndex * hexWidth * 0.75;
                const posY = startY + rowIndex * hexHeight + (colIndex % 2 === 0 ? 0 : hexHeight / 2);
                const tileSprite = this.add.image(posX, posY, 'hex');
                tileSprite.setScale(scaleFactor);

                // Add fog tile on top of non-center tiles
                if (!(rowIndex === 1 && colIndex === 1)) {
                    const fogTile = this.add.image(posX, posY, 'fog');
                    fogTile.setScale(scaleFactor);
                    this.fogTiles.push({ x: colIndex, y: rowIndex, sprite: fogTile });
                }
            });
        });


        // Create an overlay with a hole
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x333333, 1);

        // Create the top rectangle
        this.overlay.fillRect(0, 0, viewportWidth, this.margin);
        
        // Create the bottom rectangle
        this.overlay.fillRect(0, viewportHeight - this.margin, viewportWidth, this.margin);
        
        // Create the left rectangle
        this.overlay.fillRect(0, this.margin, this.margin, viewportHeight - 2 * this.margin);
        
        // Create the right rectangle
        this.overlay.fillRect(viewportWidth - this.margin, this.margin, this.margin, viewportHeight - 2 * this.margin);
        this.overlay.setScrollFactor(0);

        // Initialize panning variables
        let isPanning = false;
        let panStartX = 0;
        let panStartY = 0;

        // Add event listener for mouse down (start panning)
        this.input.on('pointerdown', (pointer) => {
            if (pointer.middleButtonDown()) {
                isPanning = true;
                panStartX = pointer.x;
                panStartY = pointer.y;
            }
        });

        // Add event listener for mouse up (stop panning)
        this.input.on('pointerup', (pointer) => {
            if (pointer.middleButtonReleased()) {
                isPanning = false;
            }
        });

        // Add event listener for mouse move (handle panning)
        this.input.on('pointermove', (pointer) => {
            if (isPanning) {
                const deltaX = panStartX - pointer.x;
                const deltaY = panStartY - pointer.y;

                // Pan the camera
                this.cameras.main.scrollX += deltaX;
                this.cameras.main.scrollY += deltaY;

                // Update the start position for the next move
                panStartX = pointer.x;
                panStartY = pointer.y;
            }
        });
    }

    generateMapData(size) {
        const mapData = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push({ type: 'grassland' }); // Example tile type
            }
            mapData.push(row);
        }
        return mapData;
    }

    getAdjacentTiles(x, y) {
        const directions = [
            { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
            { dx: 0, dy: 1 }, { dx: 0, dy: -1 },
            { dx: 1, dy: -1 }, { dx: -1, dy: 1 }
        ];
        return directions.map(dir => ({ x: x + dir.dx, y: y + dir.dy }));
    }

    revealTile(x, y) {
        const fogTile = this.fogTiles.find(tile => tile.x === x && tile.y === y);
        if (fogTile) {
            fogTile.sprite.destroy();
            this.fogTiles = this.fogTiles.filter(tile => tile !== fogTile);
        }
    }

    revealAdjacentTiles(x, y) {
        const adjacentTiles = this.getAdjacentTiles(x, y);
        adjacentTiles.forEach(tile => {
            this.revealTile(tile.x, tile.y);
        });
    }
}