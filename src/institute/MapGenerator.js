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

                mapData.push(new Tile(q, r, biome));
            }
        }
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

    getAdjacentTiles(q, r) {
        const directions = [
            { dq: 1, dr: 0 }, { dq: -1, dr: 0 },
            { dq: 0, dr: 1 }, { dq: 0, dr: -1 },
            { dq: 1, dr: -1 }, { dq: -1, dr: 1 }
        ];
        return directions.map(dir => ({ q: q + dir.dq, r: r + dir.dr }));
    }
}