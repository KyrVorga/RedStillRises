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
        this.tileBorders = []; // Store references to tile borders
        this.selectedTile = null; // Track the selected tile

        // Add keyboard manager
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.ctrlKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.altKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);

        this.calculateHexSize();
        this.renderMap();
    }

    renderMap() {
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

            if (tile.owner) {
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
            tileSprite.on('pointerdown', (pointer) => this.handleMapClick(pointer, tile));

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

            if (!tile.revealed) {
                const fogTile = this.scene.add.image(x, y, 'fog');
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


    handleMapClick(pointer, clickedTile) {
        const worldPoint = pointer.positionToCamera(this.scene.cameras.main);

        console.log(pointer.ctrlKey)
        if (pointer.leftButtonDown()) {
            // Left-click: Select the clicked tile and show details in the info panel
            this.selectedTile = clickedTile;
            console.log('Tile selected:', clickedTile);
            // Placeholder for showing details in the info panel
            this.showTileDetails(clickedTile);
        } else if (pointer.rightButtonDown()) {
            // Right-click: Move units to the clicked tile
            if (!this.selectedTile) {
                console.log('No tile selected to move units from');
                return;
            }

            // Check if the selected tile is owned by the player's house
            if (!this.isOwnedByPlayer(this.selectedTile)) {
                console.log('Selected tile is not owned by the player');
                return;
            }

            // Check if the clicked tile is adjacent to the selected tile
            if (!this.isAdjacent(this.selectedTile, clickedTile)) {
                console.log('Clicked tile is not adjacent to the selected tile');
                return;
            }

            // Check if the tile is not a water tile
            if (clickedTile.biome === 'deep' || clickedTile.biome === 'shallow') {
                console.log('Cannot move units to water tiles');
                return;
            }

            // Placeholder for checking if the user can perform this action on their turn given their action points
            if (!this.canPerformAction()) {
                console.log('Not enough action points');
                return;
            }

            let willReveal;
            if (clickedTile.owner !== this.selectedTile.owner && clickedTile.units == 0) {
                clickedTile.owner = this.selectedTile.owner;
                clickedTile.border = this.selectedTile.border;

                willReveal = true;
            }

            if (this.ctrlKey.isDown) {
                // Move one unit to the clicked tile
                this.transferUnits(this.selectedTile, clickedTile, 1);
            } else if (this.altKey.isDown) {
                // Move half the units to the clicked tile
                const unitsToMove = Math.floor(this.selectedTile.units / 2);
                this.transferUnits(this.selectedTile, clickedTile, unitsToMove);
            } else {
                // Move all units to the clicked tile and update the border
                this.transferUnits(this.selectedTile, clickedTile, this.selectedTile.units);
            }


            if (this.selectedTile.units == 0) {
                this.selectedTile = clickedTile;
            }
            
            if (willReveal) {
                this.revealAdjacentTiles(clickedTile.q, clickedTile.r);
            } 
            this.rerenderMap();
            
        }
    }

    transferUnits(fromTile, toTile, units) {
        if (fromTile.units < units) {
            units = fromTile.units;
        }
        fromTile.units -= units;
        toTile.units += units;
        console.log(`Transferred ${units} units from`, fromTile, 'to', toTile);
    }

    showTileDetails(tile) {
        // Placeholder for showing tile details in the info panel
        console.log('Showing details for tile:', tile);
    }

    canPerformAction() {
        // Placeholder for checking if the user can perform this action on their turn given their action points
        return true;
    }

    isOwnedByPlayer(tile) {
        // Placeholder for checking if the tile is owned by the player's house
        // Replace 'playerHouse' with the actual player's house identifier
        return tile.owner === 'diana';
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

    revealTile(q, r) {
        const fogTile = this.fogTiles.find(tile => tile.q === q && tile.r === r);
        const tile = this.mapData.find(tile => tile.q === q && tile.r === r);
        tile.revealed = true;
        if (fogTile) {
            fogTile.sprite.destroy();
            this.fogTiles = this.fogTiles.filter(tile => tile !== fogTile);
        }
    }

    getAdjacentTiles(q, r) {
        const directions = [
            { dq: 1, dr: 0 }, { dq: -1, dr: 0 },
            { dq: 0, dr: 1 }, { dq: 0, dr: -1 },
            { dq: 1, dr: -1 }, { dq: -1, dr: 1 }
        ];
        return directions.map(dir => ({ q: q + dir.dq, r: r + dir.dr }));
    }

    revealAdjacentTiles(q, r) {
        const adjacentTiles = this.getAdjacentTiles(q, r);
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

    revealPlayerHouseTile(house) {
        const playerHouse = this.mapData.find(tile => tile.icon === house);
        this.revealTile(playerHouse.q, playerHouse.r);
        this.revealAdjacentTiles(playerHouse.q, playerHouse.r);
        return playerHouse;
    }
}