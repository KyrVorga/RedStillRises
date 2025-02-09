import { OverlayManager } from './OverlayManager';

export class PlayerManager {
    constructor(scene, mapManager, house) {
        this.scene = scene;
        this.mapManager = mapManager;
        this.selectedTile = null;
        this.house = house;

        // Add keyboard manager
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.ctrlKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        this.altKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
        
        this.endTurnButton = null;
        this.endTurnResolve = null;

        this.locked = true;

        // Initialize OverlayManager
        this.overlayManager = new OverlayManager(this.scene, 40); // Adjust margin as needed
        this.overlay = this.overlayManager.createOverlay();
        this.overlayManager.createToggleViewButton(this.changeRenderMode.bind(this));
        this.overlayManager.showHelpModal();
    }

    changeRenderMode(mode) {
        this.mapManager.changeRenderMode(mode);
    }

    async notifyTurn(house) {
        if (house === this.house.name) {
            await this.mapManager.rerenderMap();
            this.overlayManager.updateResources(this.house.resources.food, this.house.resources.wood, this.house.resources.stone, this.house.actionPoints);
            this.unlockControls();

            // Create the "End Turn" button
            this.endTurnButton = this.overlayManager.createEndTurnButton(this.endTurn.bind(this));
            
            // Return a promise that will be resolved when the player ends their turn
            return new Promise((resolve) => {
                this.endTurnResolve = resolve;
            });
        } else {
            this.lockControls();
        }
    }
    
    
    
    endTurn() {
        if (this.endTurnButton) {
            this.endTurnButton.destroy();
            this.endTurnButton = null;
        }

        if (this.endTurnResolve) {
            this.endTurnResolve();
            this.endTurnResolve = null;
        }
        this.house.resetActionPoints();
        this.overlayManager.updateResources(this.house.resources.food, this.house.resources.wood, this.house.resources.stone, this.house.actionPoints);
        this.lockControls();
    }

    setTurnManager(turnManager) {
        this.turnManager = turnManager;
    }

    lockControls() {
        this.locked = true;
    }

    unlockControls() {
        this.locked = false;
    }

    async handleMapClick(pointer, clickedTile) {
        // console.log('Param Tile:', tile);
        // const worldPoint = pointer.positionToCamera(this.scene.cameras.main);
        // const clickedTile = await this.mapManager.getTileAt(worldPoint.x, worldPoint.y);
        // console.log('Clicked Tile:', clickedTile);
        if (!clickedTile) return;
    
        if (pointer.leftButtonDown()) {
            // Left-click: Select the clicked tile and show details in the info panel
            this.selectedTile = clickedTile;
            this.mapManager.showTileDetails(clickedTile);
        } else if (pointer.rightButtonDown()) {
            if (this.locked) return;
            if (!this.selectedTile) {
                this.overlayManager.displayMessage('Select a tile first');
                return;
            }
            let actionCost;
            if (this.ctrlKey.isDown) {
                actionCost = await this.mapManager.calculateActionCost(this.house, this.selectedTile, clickedTile, 1, 'split');
            } else if (this.altKey.isDown) {
                const unitsToMove = Math.floor(this.selectedTile.units / 2);
                actionCost = await this.mapManager.calculateActionCost(this.house, this.selectedTile, clickedTile, unitsToMove, 'split');
            } else {
                actionCost = await this.mapManager.calculateActionCost(this.house, this.selectedTile, clickedTile, this.selectedTile.units, 'all');
            }
    
            if (!this.house.canPerformAction(actionCost)) {
                this.overlayManager.displayMessage('Not enough action points');
                return;
            }
    
            let newTile = null;
            if (this.ctrlKey.isDown) {
                newTile = await this.mapManager.moveOneUnit(this.house, this.selectedTile, clickedTile);
            } else if (this.altKey.isDown) {
                newTile = await this.mapManager.moveHalfUnits(this.house, this.selectedTile, clickedTile);
            } else {
                newTile = await this.mapManager.moveAllUnits(this.house, this.selectedTile, clickedTile);
            }
    
            if (newTile) {
                this.house.actionPoints -= actionCost;
                this.selectedTile = newTile;
                this.overlayManager.updateResources(this.house.food, this.house.wood, this.house.stone, this.house.actionPoints);
            } else {
                this.overlayManager.displayMessage('Invalid move');
            }
        }
    }
}