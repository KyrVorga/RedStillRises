import { Scene } from 'phaser';

export class MapManager {
    constructor(scene, mapData, tileSize, margin) {
        this.scene = scene;
        this.mapData = mapData;
        this.tileSize = tileSize;
        this.margin = margin;
        this.fogTiles = [];
        this.scaleFactor = 1;
        this.zoomFactor = 1; // Add zoom factor
        this.tileSprites = []; // Store references to tile sprites
        this.tileIcons = []; // Store references to tile icons

        this.calculateHexSize();
        this.renderMap();
    }


    renderMap() {
        this.mapData.forEach((tile) => {
            const { q, r, biome } = tile;
            const x = this.hexWidth * (3/4 * q);
            const y = this.hexHeight * (r + q / 2);
            const tileSprite = this.scene.add.image(x, y, biome);
            // tileSprite.setScale(this.scaleFactor * this.zoomFactor); // Adjust scale based on zoom factor
            this.tileSprites.push(tileSprite);

            // display the tiles icon
            if (tile.icon) {
                const icon = this.scene.add.image(x, y, tile.icon);
                // icon.setScale(this.scaleFactor * this.zoomFactor); // Adjust scale based on zoom factor
                if (!tile.isOutpost && !tile.isCastle) {
                    icon.setAlpha(0.5);
                }
                this.tileIcons.push(icon);
            }

            if (!tile.revealed) {
                const fogTile = this.scene.add.image(x, y, 'fog');
                // fogTile.setScale(this.scaleFactor * this.zoomFactor); // Adjust scale based on zoom factor
                this.fogTiles.push({ q: tile.q, r: tile.r, sprite: fogTile });
            }
        });
    }

    rerenderMap() {
        console.log(this.tileSize);
        this.tileSprites.forEach(sprite => sprite.destroy());
        this.fogTiles.forEach(fogTile => fogTile.sprite.destroy());
        this.tileIcons.forEach(icon => icon.destroy());
        this.tileSprites = [];
        this.fogTiles = [];
        this.tileIcons = [];
        this.calculateHexSize();
        this.renderMap();
    }

    handleMapClick(pointer) {
        const worldPoint = pointer.positionToCamera(this.scene.cameras.main);
        const clickedTile = this.mapData.find(tile => {
            const x = this.hexWidth * (3/4 * tile.q);
            const y = this.hexHeight * (tile.r + tile.q / 2);
            return Phaser.Math.Distance.Between(worldPoint.x, worldPoint.y, x, y) < this.tileSize / 2;
        });

        if (clickedTile) {
            console.log('Tile clicked:', clickedTile);
            // Handle tile click logic here
        }
    }

    calculateHexSize() {
        this.hexWidth = this.tileSize;
        this.hexHeight = Math.sqrt(3) / 2 * this.hexWidth;
        console.log(this.hexWidth, this.hexHeight);
    }

    revealTile(q, r) {
        const fogTile = this.fogTiles.find(tile => tile.q === q && tile.r === r);
        if (fogTile) {
            fogTile.sprite.destroy();
            this.fogTiles = this.fogTiles.filter(tile => tile !== fogTile);
        }
    }

    revealAdjacentTiles(q, r) {
        const adjacentTiles = this.mapGenerator.getAdjacentTiles(q, r);
        adjacentTiles.forEach(tile => {
            this.revealTile(tile.q, tile.r);
        });
    }

    revealAllTiles() {
        this.mapData.forEach(tile => {
            tile.revealed = true;
        });
        this.rerenderMap();
    }

    setZoomFactor(zoomFactor) {
        this.zoomFactor = zoomFactor;
        this.rerenderMap();
    }

    setTileSize(tileSize) {
        this.tileSize = tileSize;
        console.log(this.tileSize);
        this.calculateHexSize();
    }
}