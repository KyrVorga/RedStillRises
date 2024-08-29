export class Tile {
    constructor(q, r, biome, x=null, y=null, isOutpost = false, isCastle = false) {
        this.q = q;
        this.r = r;
        this.biome = biome;
        this.isOutpost = isOutpost;
        this.isCastle = isCastle;
        this.units = 0;
    }
    
    static determineBiome(noiseValue) {
        if (noiseValue < -0.9) {
            return 'deep';
        } else if (noiseValue < -0.7) {
            return 'shallow'; 
        } else if (noiseValue < 0.5) {
            return 'grassland';  
        } else if (noiseValue < 0.8) {
            return 'hill';  
        } else {
            return 'mountain'; 
        }
    }

    static determineFlatBiome(flatNoiseValue) {
        if (flatNoiseValue < -0.9) {
            return 'swamp';
        } else if (flatNoiseValue < -0.7) {
            return 'tundra'; 
        } else if (flatNoiseValue < 0.5) {
            let random = Math.random();
            if (random < 0.8) {
                return 'grassland';
            } else {
                return 'farmland';  
            }
        } else if (flatNoiseValue < 0.8) {
            return 'forest';  
        } else {
            return 'greatwood'; 
        }
    }
}