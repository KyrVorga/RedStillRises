import { Scene } from 'phaser';

export class MapManager {
    constructor(scene, mapData, tileSize, playerHouse) {
        this.playerManager;
        this.scene = scene;
        this.mapData = mapData;
        this.tileSize = tileSize;
        this.playerHouse = playerHouse;

        this.fogTiles = [];
        this.scaleFactor = 1;
        this.zoomFactor = 1; // Add zoom factor
        this.tileSprites = []; // Store references to tile sprites
        this.tileIcons = []; // Store references to tile icons
        this.tileBorders = []; // Store references to tile borders

        this.firstSplitMap = new Map(); // To track the first split from each tile

        this.calculateHexSize();
    }

    setPlayerManager(playerManager) {
        this.playerManager = playerManager;
    }

    changeRenderMode(mode) {
        const renderModes = ['normal', 'resource'];
        if (!renderModes.includes(mode)) return;
        this.renderMode = mode;
    }

    async renderMap() {
        const revealedTiles = new Set(this.playerHouse.revealedTiles);

        // Create tooltip if it doesn't exist
        if (!this.tooltip) {
            this.createTooltip();
        }

        // Render revealed tiles
        revealedTiles.forEach((tile) => {
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

            let tileBorder;
            if (tile.house) {
                tileBorder = this.scene.add.image(x, y, tile.border);
            } else {
                tileBorder = this.scene.add.image(x, y, 'normal_border');
            }
            this.tileBorders.push(tileBorder);

            let tileBackground;
            if (tile.house) {
                tileBackground = this.scene.add.image(x, y, biome + '_occupied');
            } else {
                tileBackground = this.scene.add.image(x, y, biome);
            }
            this.tileSprites.push(tileBackground);

            // Make the tile clickable
            tileBackground.setInteractive();
            tileBackground.on('pointerdown', (pointer) => this.playerManager.handleMapClick(pointer, tile));

            // Add hover event to show tooltip
            tileBackground.on('pointerover', () => {
                const actionCost = this.calculateActionCost(this.playerHouse, this.selectedTile, tile, 1, 'move');
                const tooltipText = `Tile: ${tile.q}, ${tile.r}\nBiome: ${tile.biome}\nAction Cost: ${actionCost}`;
                this.showTooltip(x, y - 20, tooltipText);
            });

            tileBackground.on('pointerout', () => {
                this.hideTooltip();
            });

            if (tile.units > 0) {
                const unitText = this.scene.add.text(x, y + 25, tile.units, { fontSize: '20px', fill: '#000' });
                unitText.setOrigin(0.5);
                this.tileSprites.push(unitText);
            }

            // Display the tile's icon
            if (tile.icon) {
                let icon;
                if (!tile.units > 0) {
                    icon = this.scene.add.image(x, y, tile.icon);
                } else {
                    icon = this.scene.add.image(x, y-10, tile.icon + '_small');
                }
                icon.setAlpha(0.5);
                this.tileIcons.push(icon);
            }
        });

        // Render fog tiles for adjacent spaces
        revealedTiles.forEach((tile) => {
            const adjacentTiles = this.getAdjacentTiles(tile.q, tile.r);
            adjacentTiles.forEach(adjTile => {
                const adjTileData = this.mapData.find(t => t.q === adjTile.q && t.r === adjTile.r);
                if (adjTileData && !revealedTiles.has(adjTileData)) {
                    const { x, y } = this.getTileCoordinates(adjTile.q, adjTile.r);
                    const fogTile = this.scene.add.image(x, y, 'fog');
                    this.fogTiles.push({ q: adjTile.q, r: adjTile.r, sprite: fogTile });
                }
            });
        });
    }

    async rerenderMap() {
        const time = Date.now();
        console.log('Rerendering map at:' + time);
        this.tileSprites.forEach(sprite => sprite.destroy());
        this.fogTiles.forEach(fogTile => fogTile.sprite.destroy());
        this.tileIcons.forEach(icon => icon.destroy());
        this.tileSprites = [];
        this.fogTiles = [];
        this.tileIcons = [];
        this.calculateHexSize();
        await this.renderMap();
        console.log('Rerendering completed in:' + (Date.now() - time) + 'ms');
    }
    
    checkActionValidity(house, source, dest) {
        if (!house) {
            // throw new Error('No house selected');
        }

        if (!source) {
            // console.log('No source tile selected');
            return false;
        }

        if (!dest) {
            // console.log('No destination tile selected');
            return false;
        }

        if (!this.isOwnedByHouse(source, house)) {
            // console.log('Selected tile is not owned by the player');
            return false;
        }
        
        if (source.units < 1) {
            // console.log('No units to move');
            return;
        }
        if (source === dest) {
            // console.log('Cannot move units to the same tile');
            return;
        }

        if (!this.isAdjacent(source, dest)) {
            // console.log('Clicked tile is not adjacent to the selected tile');
            return false;
        }

        if (dest.biome === 'deep' || dest.biome === 'shallow') {
            // console.log('Cannot move units to water tiles');
            return false;
        }

        return true;
    }

    async attackTile(attacker, defender, map) {
        // Placeholder for map bonuses check
        // Placeholder for unit upgrade check
    
        const nearbyOwnedTiles = calculateNearbyOwnedTiles(attacker, map);
        const distanceFromCastle = calculateDistanceFromCastle(attacker, map);
    
        const attackerStrength = attacker.units + nearbyOwnedTiles - distanceFromCastle;
        const defenderStrength = defender.units;
    
        let attackerWins = Math.random() * (attackerStrength + defenderStrength) < attackerStrength;
    
        if (attackerWins) {
            let capturedUnits = Math.floor(Math.random() * defender.units);
            let lostUnits = Math.floor(Math.random() * attacker.units / 2);
    
            defender.units -= capturedUnits;
            attacker.units -= lostUnits;
    
            // Transfer captured units to attacker's castle
            transferUnits(defender, attackerCastle, capturedUnits);
    
            // Transfer lost units to nearby castle for buy back
            transferUnits(attacker, nearbyCastle, lostUnits);
    
            if (defender.units <= 0) {
                // Attacker takes over the tile
                defender.owner = attacker.owner;
                defender.units = attacker.units;
                attacker.units = 0;
            }
        } else {
            let lostUnits = Math.floor(Math.random() * attacker.units);
            attacker.units -= lostUnits;
    
            // Transfer lost units to nearby castle for buy back
            transferUnits(attacker, nearbyCastle, lostUnits);
        }
    }
    
    calculateNearbyOwnedTiles(unit, map) {
        // Implement logic to count nearby owned tiles
        return 0; // Placeholder
    }
    
    calculateDistanceFromCastle(unit, map) {
        // Implement logic to calculate distance from the nearest castle or outpost
        return 0; // Placeholder
    }
    
    async transferUnits(source, dest, units) {
        // clamp units to the maximum available
        if (source.units < units) {
            units = source.units;
        }
        source.units -= units;
        dest.units += units;
    
        if (source.units == 0) {
            return dest;
        }
        return source;
    }

    async moveUnits(house, source, dest, units) {
        if (!this.checkActionValidity(house, source, dest)) return;
        await this.handleTileReveal(house, source, dest);
        let tile = await this.transferUnits(source, dest, units);
        await this.rerenderMap();
        
        return tile;
    }

    async moveOneUnit(house, source, dest) {
        if (!this.checkActionValidity(house, source, dest)) return;
        await this.handleTileReveal(house, source, dest);
        let tile = await this.transferUnits(source, dest, 1);
        await this.rerenderMap();
        
        return tile;
    }

    async moveHalfUnits(house, source, dest) {
        if (!this.checkActionValidity(house, source, dest)) return;
        const unitsToMove = Math.floor(source.units / 2);
        await this.handleTileReveal(house, source, dest);
        let tile = await this.transferUnits(source, dest, unitsToMove);
        await this.rerenderMap();
        
        return tile;
    }

    async moveAllUnits(house, source, dest) {
        if (!this.checkActionValidity(house, source, dest)) return;
        await this.handleTileReveal(house, source, dest);
        let tile = await this.transferUnits(source, dest, source.units);
        await this.rerenderMap();
        
        return tile;
    }

    
    calculateActionCost(house, source, dest, units, actionType) {
        let cost = 1; // Base cost

        if (actionType === 'split') {
            const sourceKey = `${source.q},${source.r}`;
            const destKey = `${dest.q},${dest.r}`;

            if (!this.firstSplitMap.has(sourceKey)) {
                this.firstSplitMap.set(sourceKey, new Set());
            }

            const firstSplitsFromSource = this.firstSplitMap.get(sourceKey);

            if (firstSplitsFromSource.has(destKey)) {
                // Subsequent splits to the same tile cost nothing
                cost = 0;
            } else {
                // First split to this tile
                if (!dest.house) {
                    // New unclaimed tile
                    cost = 1;
                } else {
                    // Claimed tile
                    cost = 0.25;
                }
                firstSplitsFromSource.add(destKey);
            }
        } else {
            if (!dest.house) {
                // New unclaimed tile
                cost = 1;
            } else if (dest.house !== house.name.toLowerCase()) {
                // Attacking an enemy tile
                cost = 1;
            } else {
                // Moving within owned territory
                cost *= 0.75;
            }

            // Adjust cost based on biome
            if (['greatwoods', 'swamp', 'mountain'].includes(dest.biome)) {
                cost *= 1.5;
            }
        }
        return cost;
    }
    
    resetFirstSplits() {
        this.firstSplitMap.clear();
    }
    
    areTilesAdjacent(tileA, tileB) {
        const adjacentTiles = this.getAdjacentTiles(tileA.q, tileA.r);
        return adjacentTiles.some(tile => tile.q === tileB.q && tile.r === tileB.r);
    }

    async handleTileReveal(house, source, dest) {
        if (dest.house !== source.house && dest.units == 0) {
            dest.house = source.house;
            dest.border = source.border;
            await this.revealAdjacentTiles(house, dest.q, dest.r);

            return true;
        }
        return false;
    }

    showTileDetails(tile) {
        // Placeholder for showing tile details in the info panel
        console.log('Showing details for tile:', tile);
    }

    isOwnedByHouse(tile, house) {
        return tile.house === house.name.toLowerCase();
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

    async revealTile(house, q, r) {
        const tile = this.mapData.find(tile => tile.q === q && tile.r === r);
        if (!tile) return;

        if (!house.revealedTiles.includes(tile)) {
            house.revealedTiles.push(tile);
        }
    }
    
    async revealAdjacentTiles(house, q, r) {
        const adjacentTiles = this.getAdjacentTiles(q, r);
        
        for (const tile of adjacentTiles) {
            await this.revealTile(house, tile.q, tile.r);
        }
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

    getTile(q, r) {
        return this.mapData.find(tile => tile.q === q && tile.r === r);
    }

    createTooltip() {
        this.tooltip = this.scene.add.text(0, 0, '', {
            fontSize: '16px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setDepth(1003).setVisible(false);
    }

    showTooltip(x, y, text) {
        this.tooltip.setText(text);
        this.tooltip.setPosition(x, y);
        this.tooltip.setVisible(true);
    }

    hideTooltip() {
        this.tooltip.setVisible(false);
    }
}