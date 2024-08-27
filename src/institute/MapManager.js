import { Scene } from 'phaser';

export class MapManager {
    constructor(scene, mapData, tileSize, margin) {
        this.scene = scene;
        this.mapData = mapData;
        this.tileSize = tileSize;
        this.margin = margin;
        this.fogTiles = [];
        this.hexWidth = this.tileSize;
        this.hexHeight = Math.sqrt(3) / 2 * this.hexWidth;
        this.scaleFactor = 1;
        this.tileSprites = []; // Store references to tile sprites

        this.renderMap();
    }

    renderMap() {
        this.mapData.forEach((tile) => {
            const { q, r } = tile;
            const x = this.hexWidth * (3/4 * q);
            const y = this.hexHeight * (r + q / 2);
            const tileSprite = this.scene.add.image(x, y, 'grassland');
            tileSprite.setScale(this.scaleFactor);
            this.tileSprites.push(tileSprite); // Store reference to tile sprite

            if (!tile.revealed) {
                const fogTile = this.scene.add.image(x, y, 'fog');
                fogTile.setScale(this.scaleFactor);
                this.fogTiles.push({ q: tile.q, r: tile.r, sprite: fogTile });
            }
        });
    }

    rerenderMap() {
        this.tileSprites.forEach(sprite => sprite.destroy());
        this.fogTiles.forEach(fogTile => fogTile.sprite.destroy());
        this.tileSprites = [];
        this.fogTiles = [];
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
}