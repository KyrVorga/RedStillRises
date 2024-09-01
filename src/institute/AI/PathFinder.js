class PathFinder {
    constructor(mapManager) {
        this.mapManager = mapManager;
    }

    heuristic(tileA, tileB) {
        return Math.abs(tileA.q - tileB.q) + Math.abs(tileA.r - tileB.r);
    }

    cost(fromTile, toTile) {
        let baseCost = 1; // Base cost for moving to an adjacent tile
        if (toTile.units > 0 && toTile.house !== fromTile.house) {
            baseCost += toTile.units * 10; // Increase cost based on enemy threat level
        }
        if (toTile.isFog) {
            baseCost += 3; // Increase cost for fog tiles
        }
        if (toTile.biome === 'mountain') {
            baseCost += 5; // Increase cost for mountain tiles
        }
        if (toTile.biome === 'hill') {
            baseCost += 2; // Increase cost for hill tiles
        }
        if (toTile.biome === 'forest') {
            baseCost += 1; // Increase cost for forest tiles
        }
        if (toTile.biome === 'swamp') {
            baseCost += 5; // Increase cost for swamp tiles
        }
        if (toTile.biome === 'tundra') {
            baseCost += 3; // Increase cost for tundra tiles
        }
        
        return baseCost;
    }

    reconstructPath(cameFrom, current) {
        const totalPath = [current];
        let currentKey = `${current.q},${current.r}`;
        while (cameFrom.has(currentKey)) {
            current = cameFrom.get(currentKey);
            currentKey = `${current.q},${current.r}`;
            totalPath.unshift(current);
        }
        return totalPath;
    }

    async findPath(fromTile, toTile) {
        if (!fromTile || !toTile) return null;
        const openSet = new PriorityQueue();
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        const startKey = `${fromTile.q},${fromTile.r}`;
        const goalKey = `${toTile.q},${toTile.r}`;

        gScore.set(startKey, 0);
        fScore.set(startKey, this.heuristic(fromTile, toTile));

        openSet.enqueue(fromTile, fScore.get(startKey));

        while (!openSet.isEmpty()) {
            const current = openSet.dequeue();
            const currentKey = `${current.q},${current.r}`;

            if (currentKey === goalKey) {
                return this.reconstructPath(cameFrom, current);
            }

            const neighbors = this.mapManager.getAdjacentTiles(current.q, current.r);
            for (const neighbor of neighbors) {
                const neighborTile = this.mapManager.getTile(neighbor.q, neighbor.r);
                if (!neighborTile || neighborTile.biome == 'shallow' || neighborTile.biome == 'deep') continue;

                const neighborKey = `${neighborTile.q},${neighborTile.r}`;
                const tentativeGScore = gScore.get(currentKey) + this.cost(current, neighborTile);

                if (!gScore.has(neighborKey) || tentativeGScore < gScore.get(neighborKey)) {
                    cameFrom.set(neighborKey, current);
                    gScore.set(neighborKey, tentativeGScore);
                    fScore.set(neighborKey, tentativeGScore + this.heuristic(neighborTile, toTile));

                    if (!openSet.elements.some(e => e.element === neighborTile)) {
                        openSet.enqueue(neighborTile, fScore.get(neighborKey));
                    }
                }
            }
        }

        return null; // No path found
    }
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift().element;
    }
}

export default PathFinder;