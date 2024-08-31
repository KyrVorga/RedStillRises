import { Tile } from './Tile';
import { createNoise2D } from 'simplex-noise';

export class MapGenerator {
    constructor(tileSize, sideLength) {
        this.tileSize = tileSize;
        this.sideLength = sideLength;
        this.noise = new createNoise2D();
        this.secondaryNoise = new createNoise2D();
        this.frequency = 0.05; 
        this.flatBiomeFrequency = 0.1;

        this.minDistance = 5; // Example minimum distance
        this.numCastles = 13;

        this.iconPools = {
            grassland: ['grassland_1'],
            forest: ['forest_1', 'forest_2', 'forest_3'],
            farmland: ['farmland_1', 'squiggle_1', 'squiggle_2', 'squiggle_3'],
            greatwood: ['greatwood_1', 'greatwood_2', 'greatwood_3', 'greatwood_4'],
            hill: ['hill_1', 'hill_2', 'hill_3', 'hill_4', 'hill_5', 'hill_6'],
            mountain: ['mountain_1', 'mountain_2', 'mountain_3', 'mountain_4', 'mountain_5', 'mountain_6'],
            swamp: ['swamp_1', 'swamp_2', 'swamp_3', 'swamp_4'],
            tundra: ['tundra_1', 'tundra_2', 'tundra_3', 'tundra_4'],
            outpost: ['outpost_1', 'outpost_2', 'outpost_3', 'outpost_4', 'outpost_5'],
            shallow: ['squiggle_1', 'squiggle_2', 'squiggle_3'],
            deep: ['squiggle_1', 'squiggle_2', 'squiggle_3']
        };
    }

    getRandomIcon(biome) {
        const pool = this.iconPools[biome] || [];
        if (Math.random() < 0.6 || pool.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * pool.length);
        return pool[randomIndex];
    }

    generateMapData() {
        const mapData = [];
        for (let q = -this.sideLength + 1; q < this.sideLength; q++) {
            const startR = Math.max(-this.sideLength + 1, -q - this.sideLength + 1);
            const endR = Math.min(this.sideLength - 1, -q + this.sideLength - 1);
            for (let r = startR; r <= endR; r++) {
                const noiseValue = this.noise(q * this.frequency, r * this.frequency);
                let biome = Tile.determineBiome(noiseValue);

                if (biome === 'grassland') {
                    const flatNoiseValue = this.secondaryNoise(q * this.flatBiomeFrequency, r * this.flatBiomeFrequency);
                    biome = Tile.determineFlatBiome(flatNoiseValue);
                }

                const tile = new Tile(q, r, biome);
                tile.initializeResourcesAndBonuses();

                // 5% chance for non-water tiles to become outposts
                if (biome !== 'shallow' && biome !== 'deep' && Math.random() < 0.01) {
                    tile.isOutpost = true;
                    tile.icon = this.getRandomIcon('outpost');
                } else {
                    tile.icon = this.getRandomIcon(biome);
                }

                mapData.push(tile);
            }
        }
        this.generateCastles(mapData, this.minDistance, this.numCastles);
        return mapData;
    }

    getAdjacentBiomes(mapData, q, r) {
        const directions = [
            { dq: 1, dr: 0 }, { dq: -1, dr: 0 },
            { dq: 0, dr: 1 }, { dq: 0, dr: -1 },
            { dq: 1, dr: -1 }, { dq: -1, dr: 1 }
        ];
        return directions.map(dir => {
            const adjacentTile = mapData.find(tile => tile.q === q + dir.dq && tile.r === r + dir.dr);
            return adjacentTile ? adjacentTile.type : null;
        }).filter(biome => biome !== null);
    }

    isValidCastleTile(mapData, q, r) {
        const invalidBiomes = ['shallow', 'deep', 'swamp'];
        const adjacentBiomes = this.getAdjacentBiomes(mapData, q, r);
        return !adjacentBiomes.some(biome => invalidBiomes.includes(biome));
    }

    distance(tile1, tile2) {
        return Math.sqrt(Math.pow(tile1.q - tile2.q, 2) + Math.pow(tile1.r - tile2.r, 2));
    }

    findCastleLocations(mapData, minDistance, numCastles) {
        const potentialTiles = [];

        // Identify valid tiles
        for (let tile of mapData) {
            if (this.isValidCastleTile(mapData, tile.q, tile.r)) {
                potentialTiles.push(tile);
            }
        }

        // Select tiles ensuring minimum distance
        const selectedTiles = [];
        while (selectedTiles.length < numCastles && potentialTiles.length > 0) {
            const index = Math.floor(Math.random() * potentialTiles.length);
            const tile = potentialTiles.splice(index, 1)[0];

            let valid = true;
            for (let selectedTile of selectedTiles) {
                if (this.distance(tile, selectedTile) < minDistance) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                selectedTiles.push(tile);
            }
        }

        // If we couldn't find enough valid tiles, return an empty array
        if (selectedTiles.length < numCastles) {
            return [];
        }

        return selectedTiles;
    }

    generateCastles(mapData, minDistance, numCastles) {
        let castleLocations = [];

        // Retry mechanism
        while (castleLocations.length < numCastles) {
            castleLocations = this.findCastleLocations(mapData, minDistance, numCastles);
        }
        console.log(castleLocations);

        const houses = {
            apollo: { name: 'apollo', border: 'apollo_border'},
            baccus: { name: 'bacchus', border: 'bacchus_border'},
            ceres: { name: 'ceres', border: 'ceres_border'},
            diana: { name: 'diana', border: 'diana_border'},
            juno: { name: 'juno', border: 'juno_border'},
            jupiter: { name: 'jupiter', border: 'jupiter_border'},
            mars: { name: 'mars', border: 'mars_border'},
            mercury: { name: 'mercury', border: 'mercury_border'},
            minerva: { name: 'minerva', border: 'minerva_border'},
            neptune: { name: 'neptune', border: 'neptune_border'},
            pluto: { name: 'pluto', border: 'pluto_border'},
            venus: { name: 'venus', border: 'venus_border'},
            vulcan: { name: 'vulcan', border: 'vulcan_border'},
            
        }
        

        // Assign houses and mark as castle tiles
        for (let i = 0; i < castleLocations.length; i++) {
            const keys = Object.keys(houses);
            const length = keys.length;
            const houseKey = keys[i % length];
            const house = houses[houseKey].name;
            const border = houses[houseKey].border;
            const tile = castleLocations[i];
            tile.biome = 'castle';
            tile.icon = house;
            tile.units = 50;
            tile.isCastle = true;
            tile.house = house;
            tile.border = border;
        }
    }
}