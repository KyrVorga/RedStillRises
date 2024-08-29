import { Scene } from 'phaser';

export class MapManager {
    constructor(scene, mapData, tileSize) {
        this.playerManager;
        this.scene = scene;
        this.mapData = mapData;
        this.tileSize = tileSize;
        this.fogTiles = [];
        this.scaleFactor = 1;
        this.zoomFactor = 1; // Add zoom factor
        this.tileSprites = []; // Store references to tile sprites
        this.tileIcons = []; // Store references to tile icons
        this.tileBorders = []; // Store references to tile borders

        this.calculateHexSize();
    }

    setPlayerManager(playerManager) {
        this.playerManager = playerManager;
    }

    renderMap(house) {
        this.mapData.forEach((tile) => {
            const { q, r, biome } = tile;
            let x, y;
            if (!tile.x && !tile.y) {
                x = this.hexWidth * (3/4 * q);
                y = this.hexHeight * (r + q / 2);
    
                tile.x = x;
                tile.y = y;
            } else {
                x = tile.x;
                y = tile.y;
            }
    
            if (house.revealedTiles.includes(tile)) {
                if (tile.house) {
                    const hexBorder = this.scene.add.image(x, y, tile.border);
                    this.tileBorders.push(hexBorder);
                } else {
                    const normalBorder = this.scene.add.image(x, y, 'normal_border');
                    this.tileBorders.push(normalBorder);
                }
    
                const tileSprite = this.scene.add.image(x, y, biome);
                this.tileSprites.push(tileSprite);
    
                // Make the tile clickable
                tileSprite.setInteractive();
                tileSprite.on('pointerdown', (pointer) => this.playerManager.handleMapClick(pointer, tile));
    
                // display the tiles icon
                if (tile.icon) {
                    let icon;
                    if (!tile.isOutpost && !tile.isCastle) {
                        icon = this.scene.add.image(x, y, tile.icon);
                    } else {
                        icon = this.scene.add.image(x, y-10, tile.icon);
                    }
                    icon.setAlpha(0.5);
                    this.tileIcons.push(icon);
                }
    
                if (tile.units > 0) {
                    const unitText = this.scene.add.text(x, y + 25, tile.units, { fontSize: '20px', fill: '#000' });
                    unitText.setOrigin(0.5);
                    this.tileSprites.push(unitText);
                }
            } else {
                const fogTile = this.scene.add.image(x, y, 'fog');
                this.fogTiles.push({ q: tile.q, r: tile.r, sprite: fogTile });
            }
        });
    }

    rerenderMap(house) {
        this.tileSprites.forEach(sprite => sprite.destroy());
        this.fogTiles.forEach(fogTile => fogTile.sprite.destroy());
        this.tileIcons.forEach(icon => icon.destroy());
        this.tileSprites = [];
        this.fogTiles = [];
        this.tileIcons = [];
        this.calculateHexSize();
        this.renderMap(house);
    }
    
    checkActionValidity(house, source, dest) {
        if (!source) {
            console.log('No source tile selected');
            return false;
        }

        if (!dest) {
            console.log('No destination tile selected');
            return false;
        }

        if (!this.isOwnedByHouse(source, house)) {
            console.log('Selected tile is not owned by the player');
            return false;
        }
        
        if (source.units < 1) {
            console.log('No units to move');
            return;
        }
        if (source === dest) {
            console.log('Cannot move units to the same tile');
            return;
        }

        if (!this.isAdjacent(source, dest)) {
            console.log('Clicked tile is not adjacent to the selected tile');
            return false;
        }

        if (dest.biome === 'deep' || dest.biome === 'shallow') {
            console.log('Cannot move units to water tiles');
            return false;
        }

        return true;
    }

    transferUnits(source, dest, units) {
        // clamp units to the maximum available
        if (source.units < units) {
            units = source.units;
        }
        source.units -= units;
        dest.units += units;

        console.log(`Transferred ${units} units from`, source, 'to', dest);

        if (source.units == 0) {
            return dest;
        }
        return source;
    }

    moveOneUnit(house, source, dest) {
        if (!this.checkActionValidity(house, source, dest)) return;
        this.handleTileReveal(source, dest);
        let tile = this.transferUnits(source, dest, 1);
        this.rerenderMap();
        
        return tile;
    }

    moveHalfUnits(house, source, dest) {
        if (!this.checkActionValidity(house, source, dest)) return;
        const unitsToMove = Math.floor(source.units / 2);
        this.handleTileReveal(source, dest);
        let tile = this.transferUnits(source, dest, unitsToMove);
        this.rerenderMap();
        
        return tile;
    }

    moveAllUnits(house, source, dest) {
        if (!this.checkActionValidity(house, source, dest)) return;
        this.handleTileReveal(source, dest);
        let tile = this.transferUnits(source, dest, source.units);
        this.rerenderMap();
        
        return tile;
    }

    handleTileReveal(source, dest) {
        if (dest.house !== source.house && dest.units == 0) {
            dest.house = source.house;
            dest.border = source.border;
            this.revealAdjacentTiles(dest.q, dest.r);

            return true;
        }
        return false;
    }

    showTileDetails(tile) {
        // Placeholder for showing tile details in the info panel
        console.log('Showing details for tile:', tile);
    }

    canPerformAction() {
        // Placeholder for checking if the user can perform this action on their turn given their action points
        return true;
    }

    isOwnedByHouse(tile, house) {
        console.log(tile.house, house);
        return tile.house === house;
    }

    isAdjacent(tile1, tile2) {
        const adjacentTiles = this.getAdjacentTiles(tile1.q, tile1.r);
        return adjacentTiles.some(adjTile => adjTile.q === tile2.q && adjTile.r === tile2.r);
    }

    getTileAt(x, y) {
        return this.mapData.find(tile => {
            const tileX = this.hexWidth * (3/4 * tile.q);
            const tileY = this.hexHeight * (tile.r + tile.q / 2);
            return Phaser.Math.Distance.Between(x, y, tileX, tileY) < this.tileSize / 2;
        });
    }

    calculateHexSize() {
        this.hexWidth = this.tileSize;
        this.hexHeight = Math.sqrt(3) / 2 * this.hexWidth;
    }

    getAdjacentTiles(q, r) {
        const directions = [
            { dq: 1, dr: 0 }, { dq: -1, dr: 0 },
            { dq: 0, dr: 1 }, { dq: 0, dr: -1 },
            { dq: 1, dr: -1 }, { dq: -1, dr: 1 }
        ];
        return directions.map(dir => ({ q: q + dir.dq, r: r + dir.dr }));
    }

    revealTile(house, q, r) {
        const fogTile = this.fogTiles.find(tile => tile.q === q && tile.r === r);
        const tile = this.mapData.find(tile => tile.q === q && tile.r === r);

        if (!tile) return;
        if (!house.revealedTiles.includes(tile)) {
            house.revealedTiles.push(tile);
        }
        if (fogTile) {
            fogTile.sprite.destroy();
            this.fogTiles = this.fogTiles.filter(tile => tile !== fogTile);
        }
    }
    
    revealAdjacentTiles(house, q, r) {
        const adjacentTiles = this.getAdjacentTiles(q, r);
        adjacentTiles.forEach(tile => {
            this.revealTile(house, tile.q, tile.r);
        });
    }
    
    revealHouseTiles(houses) {
        houses.forEach(house => {
            const castles = this.getCastleTiles();
            castles.forEach(castle => {
                if (castle.house === house.name.toLowerCase()) {
                    this.revealTile(house, castle.q, castle.r);
                    this.revealAdjacentTiles(house, castle.q, castle.r);
                }
            });
        });
    }

    revealAllTiles(house) {
        this.mapData.forEach(tile => {
            house.revealedTiles.push(tile);
        });
        this.rerenderMap();
    }

    getCastleTiles() {
        return this.mapData.filter(tile => tile.isCastle);
    }

    getTileCoordinates(q, r) {
        const x = this.hexWidth * (3/4 * q);
        const y = this.hexHeight * (r + q / 2);
        return { x, y };
    }
}