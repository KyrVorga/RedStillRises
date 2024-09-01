export class Tile {
    constructor(q, r, biome, x=null, y=null, isOutpost = false, isCastle = false) {
        this.q = q;
        this.r = r;
        this.biome = biome;
        this.icon = null;
        this.isOutpost = isOutpost;
        this.isCastle = isCastle;
        this.units = 0;
        // Initialize resources and bonuses
        this.wood = 0;
        this.stone = 0;
        this.food = 0;
        this.defenseBonus = 0;
        this.movementPenalty = 1;

        this.initializeResourcesAndBonuses();
    }

    initializeResourcesAndBonuses() {
        switch (this.biome) {
            case 'forest':
                this.wood = this.randomInRange(5, 15);
                break;
            case 'tundra':
                this.wood = this.randomInRange(5, 10);
                this.food = this.randomInRange(5, 10);
                break;
            case 'greatwood':
                this.wood = this.randomInRange(5, 15);
                this.movementPenalty = 1.5;
                break;
            case 'hill':
                this.stone = this.randomInRange(5, 15);
                break;
            case 'mountain':
                this.stone = this.randomInRange(10, 25);
                this.movementPenalty = 1.5;
                break;
            case 'grassland':
                this.food = this.randomInRange(5, 15);
                break;
            case 'farmland':
                this.food = this.randomInRange(10, 25);
                break;
            case 'swamp':
                this.movementPenalty = 1.5;
                break;
        }

        if (this.isOutpost) {
            this.defenseBonus = 0.1;
        }

        if (this.isCastle) {
            this.defenseBonus = 0.2;
        }
    }

    randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    serialize() {
        return {
            q: this.q,
            r: this.r,
            biome: this.biome,
            border: this.border,
            house: this.house,
            icon: this.icon,
            isOutpost: this.isOutpost,
            isCastle: this.isCastle,
            units: this.units,
            wood: this.wood,
            stone: this.stone,
            food: this.food,
            defenseBonus: this.defenseBonus,
            movementPenalty: this.movementPenalty
        };
    }

    static deserialize(data) {
        const tile = new Tile(data.q, data.r, data.biome, null, null, data.isOutpost, data.isCastle);
        tile.icon = data.icon;
        tile.units = data.units;
        tile.wood = data.wood;
        tile.stone = data.stone;
        tile.food = data.food;
        tile.defenseBonus = data.defenseBonus;
        tile.movementPenalty = data.movementPenalty;
        tile.house = data.house;
        tile.border = data.border;
        return tile;
    }
}