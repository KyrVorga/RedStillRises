import { Scene } from 'phaser';

export class MapManager {
    constructor(scene, mapData, tileSize, playerHouse, houses) {
        this.playerManager;
        this.scene = scene;
        this.mapData = mapData;
        this.tileSize = tileSize;
        this.playerHouse = playerHouse;
        this.houses = houses;
        console.log('MapManager initialized with player house:', playerHouse);

        this.fogTiles = [];
        this.scaleFactor = 1;
        this.zoomFactor = 1; // Add zoom factor
        this.tileSprites = []; // Store references to tile sprites
        this.tileIcons = []; // Store references to tile icons
        this.tileBorders = []; // Store references to tile borders

        this.firstSplitMap = new Map(); // To track the first split from each tile

        this.calculateHexSize();
    }

    getMapData() {
        return this.mapData;
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
        console.log('Rendering map');
        const revealedTiles = new Set(this.playerHouse.revealedTiles.map(tile => `${tile.q},${tile.r}`)); 
        
        // Create tooltip if it doesn't exist
        if (!this.tooltip) {
            this.createTooltip();
        }
    
        // Render revealed tiles
        revealedTiles.forEach((tileKey) => {
            const [q, r] = tileKey.split(',').map(Number);
            const tile = this.mapData.find(t => t.q === q && t.r === r);
            if (!tile) return;
    
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
                tileBackground = this.scene.add.image(x, y, tile.biome + '_occupied');
            } else {
                tileBackground = this.scene.add.image(x, y, tile.biome);
            }
    
            this.tileSprites.push(tileBackground);
    
            // Make the tile clickable
            tileBackground.setInteractive();
            tileBackground.on('pointerdown', (pointer) => this.playerManager.handleMapClick(pointer, tile));
    
            // Add hover event to show tooltip
            tileBackground.on('pointerover', () => {
                const actionCost = this.calculateActionCost(this.playerHouse, this.selectedTile, tile, 1, 'move');
                const tooltipText = `Tile: ${tile.q}, ${tile.r}\nBiome: ${tile.biome}\nUnits: ${tile.units}\nAction Cost: ${actionCost}`;
                this.showTooltip(x, y - 20, tooltipText);
            });
    
            tileBackground.on('pointerout', () => {
                this.hideTooltip();
            });
    
            if (tile.units > 0) {
                const unitText = this.scene.add.text(x, y + 25, tile.units, { fontSize: '20px', fill: '#000' });
                unitText.setOrigin(0.5);
                unitText.tile = tile; // Associate the text with the tile
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
                icon.tile = tile; // Associate the icon with the tile
                this.tileIcons.push(icon);
            }
            
        });
    
        // Render fog tiles for adjacent spaces
        revealedTiles.forEach((tileKey) => {
            const [q, r] = tileKey.split(',').map(Number);
            const adjacentTiles = this.getAdjacentTiles(q, r);
        
            adjacentTiles.forEach(adjTile => {
                const adjTileData = this.mapData.find(t => t.q === adjTile.q && t.r === adjTile.r);
                const tileExists = this.playerHouse.revealedTiles.some(t => t.q === adjTile.q && t.r === adjTile.r);
                if (adjTileData && !tileExists) {
                    const { x, y } = this.getTileCoordinates(adjTile.q, adjTile.r);
                    const fogTile = this.scene.add.image(x, y, 'fog');
                    fogTile.tile = adjTile; // Associate the fog tile with the tile
                    this.fogTiles.push(fogTile);
                }
            });
        });
    
        this.scene.saveProgress();
    }

    async rerenderMap() {
        let time = Date.now();
        console.log('Rerendering map started');
        this.tileSprites.forEach(sprite => sprite.destroy());
        this.fogTiles.forEach(fogTile => fogTile.destroy());
        this.tileIcons.forEach(icon => icon.destroy());
        this.tileBorders.forEach(border => border.destroy());
        
        this.tileSprites = [];
        this.fogTiles = [];
        this.tileIcons = [];
        this.tileBorders = [];
        
        this.calculateHexSize();
        await this.renderMap();
        console.log('Rerendering map finished in', Date.now() - time, 'ms');
    }
    
    checkActionValidity(house, source, dest) {
        if (!house) {
            this.scene.displayMessage('No house selected');
            return false;
        }
    
        if (!source) {
            this.scene.displayMessage('No source tile selected');
            return false;
        }
    
        if (!dest) {
            this.scene.displayMessage('No destination tile selected');
            return false;
        }
    
        if (!this.isOwnedByHouse(source, house)) {
            this.scene.displayMessage('Selected tile is not owned by the player');
            return false;
        }
        
        if (source.units < 1) {
            this.scene.displayMessage('No units to move');
            return false;
        }
    
        if (source === dest) {
            this.scene.displayMessage('Cannot move units to the same tile');
            return false;
        }
    
        if (!this.isAdjacent(source, dest)) {
            this.scene.displayMessage('Clicked tile is not adjacent to the selected tile');
            return false;
        }
    
        if (dest.biome === 'deep' || dest.biome === 'shallow') {
            this.scene.displayMessage('Cannot move units to water tiles');
            return false;
        }
    
        return true;
    }

    async attackTile(attacker, defender) {
        // Placeholder for map bonuses check
        // Placeholder for unit upgrade check
    
        const attackerNearbyOwnedTiles = await this.calculateNearbyOwnedTiles(attacker);
        const attackerDistanceFromCastle = await this.calculateDistanceFromCastle(attacker);
    
        const defenderNearbyOwnedTiles = await this.calculateNearbyOwnedTiles(defender);
        const defenderDistanceFromCastle = await this.calculateDistanceFromCastle(defender);

        let attackerReturnLocation = await this.findNearestCastleOrOutpost(attacker);
        let defenderReturnLocation = await this.findNearestCastleOrOutpost(defender);
        console.log('Attacker return location:', attackerReturnLocation);
        console.log('Defender return location:', defenderReturnLocation);

        if (!attackerReturnLocation) {
            attackerReturnLocation = this.mapData.find(tile => tile.house === attacker.house);
        }

        if (!defenderReturnLocation) {
            defenderReturnLocation = this.mapData.find(tile => tile.house === defender.house);
        }
    
        const attackerStrength = attacker.units + attackerNearbyOwnedTiles - attackerDistanceFromCastle;
        const defenderStrength = defender.units + defenderNearbyOwnedTiles - defenderDistanceFromCastle;
        console.log('Attacker strength:', attackerStrength);
        console.log('Defender strength:', defenderStrength);
    
        const result = this.calculateInstantVictory(attackerStrength, defenderStrength);

        if (result === 'attacker') {
            this.instantVictory(attacker, defender);
        } else if (result === 'defender') {
            this.instantVictory(defender, attacker);
        } else {
            // Not an instant victory, proceed with battle
            const battleResult = this.battle(attackerStrength, defenderStrength);
            if (battleResult === 'attacker') {
                this.attackerWins(attacker, defender, attackerReturnLocation, defenderReturnLocation);
            } else if (battleResult === 'defender') {
                this.defenderWins(attacker, defender, attackerReturnLocation, defenderReturnLocation);
            } else {
                // Draw, return units to their castles if they can
                if (attackerReturnLocation) {
                    this.transferLostUnits(attacker, attackerReturnLocation, attacker.units);
                }
                if (defenderReturnLocation) {
                    this.transferLostUnits(defender, defenderReturnLocation, defender.units);
                }
            }
        }
    }


    battle(attackerStrength, defenderStrength) {
        const attackerRoll = roll();

        const defenderRoll = roll();

        const attackerTotal = attackerStrength + attackerRoll;
        const defenderTotal = defenderStrength + defenderRoll;

        if (attackerTotal > defenderTotal) {
            return 'attacker';
        } else if (defenderTotal > attackerTotal) {
            return 'defender';
        } else {
            return 'draw';
        }
    }


    calculateInstantVictory(attackerStrength, defenderStrength) {
        const instantWinThreshold = 3;
        
        // If one side has 3 times the strength of the other, it's an instant win
        if (attackerStrength >= defenderStrength * instantWinThreshold) {
            return 'attacker';
        } else if (defenderStrength >= attackerStrength * instantWinThreshold) {
            return 'defender';
        } else {
            return null;
        }
    }

    instantVictory(source, dest) {
        // Update the house unit counts
        const attackerHouse = this.houses.find(house => house.name.toLowerCase() === source.house);
        const defenderHouse = this.houses.find(house => house.name.toLowerCase() === dest.house);

        defenderHouse.removeUnits(dest.units);
        attackerHouse.addUnits(dest.units);
    
        // Attacker wins instantly, their units move to the defending tile and they own the tile
        // No defenders escape
        dest.units += source.units;
        dest.house = source.house;
        dest.border = source.border;

        source.units = 0;
    }
    
    defenderWins(attacker, defender, attackerReturnLocation, defenderReturnLocation) {
        console.log('Defender wins');
        // Roll for defender's units that go back to the castle
        const defenderRoll = roll();
        const unitsToReturn = Math.min(defenderRoll, defender.units);
    
        // Transfer expended defender units back to the return location
        this.transferLostUnits(attacker, defenderReturnLocation, unitsToReturn);
    
        const attackerHouse = this.houses.find(house => house.name.toLowerCase() === attacker.house);
        const defenderHouse = this.houses.find(house => house.name.toLowerCase() === defender.house);
    
        // Attacker rolls for units kept
        const attackerRoll = roll();
        let unitsToKeep = 0;
        if (attackerRoll < attacker.units) {
            // Some units are kept
            unitsToKeep = attackerRoll;
        }
    
        // Transfer the kept units back to the attacker's castle
        this.transferLostUnits(attacker, attackerReturnLocation, unitsToKeep);
    
        // Transfer the remaining units to the defender's castle
        const attackerUnitsLost = defender.units - unitsToKeep;
        this.transferLostUnits(attacker, defenderReturnLocation, attackerUnitsLost);

        defenderHouse.addUnits(attackerUnitsLost);
        attackerHouse.removeUnits(attackerUnitsLost);
    }
    
    attackerWins(attacker, defender, attackerReturnLocation, defenderReturnLocation) {
        console.log('Attacker wins');
        // Roll for attacker's units that go back to the castle
        const attackerRoll = roll();
        const unitsToReturn = Math.min(attackerRoll, attacker.units);
    
        // Transfer expended attacker units back to the return location
        this.transferLostUnits(attacker, attackerReturnLocation, unitsToReturn);
    
        const attackerHouse = this.houses.find(house => house.name.toLowerCase() === attacker.house);
        const defenderHouse = this.houses.find(house => house.name.toLowerCase() === defender.house);
        console.log('Attacker house:', attackerHouse);
        console.log('Defender house:', defenderHouse);
    
        // Defender rolls for units kept
        const defenderRoll = roll();
        let unitsToKeep = 0;
        if (defenderRoll < defender.units) {
            // Some units are kept
            unitsToKeep = defenderRoll;
        }
    
        // Transfer the kept units back to the defender's castle
        this.transferLostUnits(defender, defenderReturnLocation, unitsToKeep);
    
        // Transfer the remaining units to the attacker's castle
        const defenderUnitsLost = defender.units - unitsToKeep;
        this.transferLostUnits(defender, attackerReturnLocation, defenderUnitsLost);

        attackerHouse.addUnits(defenderUnitsLost);
        defenderHouse.removeUnits(defenderUnitsLost);
    }

    async calculateNearbyOwnedTiles(unit) {
        // Implement logic to count nearby owned tiles
        const ownedTiles = this.mapData.filter(tile => tile.house === unit.house);
        
        const nearbyOwnedTiles = ownedTiles.filter(tile => {
            const distance = Math.abs(tile.q - unit.q) + Math.abs(tile.r - unit.r) + Math.abs(tile.q + tile.r - unit.q - unit.r);
            return distance <= 1;
        });

        const count = nearbyOwnedTiles.length;
        return count;
    }
    
    async calculateDistanceFromCastle(unit) {
        // Implement logic to calculate distance from the nearest castle or outpost
        const castelAndOutpostTiles = this.mapData.filter(tile => tile.house == unit.house && (tile.isCastle || tile.isOutpost));

        let minDistance = Infinity;
        for (const tile of castelAndOutpostTiles) {
            const distance = Math.abs(tile.q - unit.q) + Math.abs(tile.r - unit.r) + Math.abs(tile.q + tile.r - unit.q - unit.r);
            console.log('Distance from castle:', distance);
            minDistance = Math.min(minDistance, distance);
        }

        return minDistance;
    }

    async findNearestCastleOrOutpost(unit) {
        // Implement logic to find the nearest castle or outpost
        const castelAndOutpostTiles = this.mapData.filter(tile => tile.house == unit.house && (tile.isCastle || tile.isOutpost));

        let minDistance = Infinity;
        let nearestTile = null;
        for (const tile of castelAndOutpostTiles) {
            const distance = Math.abs(tile.q - unit.q) + Math.abs(tile.r - unit.r) + Math.abs(tile.q + tile.r - unit.q - unit.r);
            if (distance < minDistance) {
                minDistance = distance;
                nearestTile = tile;
            }
        }

        return nearestTile;
    }
    
    async transferUnits(source, dest, units) {
        // clamp units to the maximum available
        if (source.units < units) {
            units = source.units;
        }
        
        if (dest.house && dest.house !== source.house) {
            // If the destination tile has enemy units, perform an attack
            await this.attackTile(source, dest);
        } else {
            source.units -= units;
            dest.units += units;
        }

        if (source.units == 0) {
            return dest;
        }
        return source;
    }

    async transferLostUnits(source, dest, units) {
            source.units -= units;
            dest.units += units;
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

            // Update the corresponding tile in mapData
            const mapTile = this.mapData.find(tile => tile.q === dest.q && tile.r === dest.r);
            if (mapTile) {
                mapTile.house = dest.house;
                mapTile.border = dest.border;
            }
    
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
    
        const tileExists = house.revealedTiles.some(revealedTile => revealedTile.q === q && revealedTile.r === r);
        if (!tileExists) {
            house.revealedTiles.push({ q, r });
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
            const tileExists = house.revealedTiles.some(revealedTile => revealedTile.q === tile.q && revealedTile.r === tile.r);
            if (!tileExists) {
                house.revealedTiles.push({ q: tile.q, r: tile.r });
            }
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
        }).setDepth(100).setVisible(false);
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

function roll() {
    return Math.floor(Math.random() * 6) + 1;
}