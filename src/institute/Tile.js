export class Tile {
    constructor(q, r, biome = 'grassland', revealed = false) {
        this.q = q;
        this.r = r;
        this.biome = biome;
        this.revealed = revealed;
    }
    
    static determineBiome(noiseValue, adjacentBiomes) {
        if (noiseValue > 0.7) {
            return 'mountain';
        } else if (noiseValue > 0.5) {
            return 'hill';
        } else if (noiseValue > 0.3) {
            return 'forest';
        } else if (noiseValue > 0.1) {
            return 'great_woods';
        } else {
            return 'grassland';
        }
    }
}