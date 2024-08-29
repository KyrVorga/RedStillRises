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
        // this.overlayManager = new OverlayManager(this.scene, 10); // Adjust margin as needed
        // this.overlay = this.overlayManager.createOverlay();
    }

    async notifyTurn(house) {
        if (house === this.house.name) {
            this.house.resetActionPoints();
            await this.mapManager.rerenderMap(this.house);
            this.unlockControls();

            // Create the "End Turn" button
            this.createEndTurnButton();
            
            // Return a promise that will be resolved when the player ends their turn
            return new Promise((resolve) => {
                this.endTurnResolve = resolve;
            });
        } else {
            this.lockControls();
        }
    }
    
    createEndTurnButton() {
        const viewportWidth = this.scene.cameras.main.width;
        const margin = 10;
        const buttonWidth = 100;
        const buttonHeight = 40;
    
        // Create a container for the button elements
        const buttonContainer = this.scene.add.container();
        buttonContainer.setScrollFactor(0);
        buttonContainer.setDepth(1000); // Ensure the button is on the topmost layer
    
        // Create a background rectangle for the button
        const buttonBackground = this.scene.add.graphics();
        buttonBackground.fillStyle(0x000000, 1);
        buttonBackground.fillRect(viewportWidth - buttonWidth - margin, margin, buttonWidth, buttonHeight);
        // Add the background to the container
        buttonContainer.add(buttonBackground);
    
        // Create a transparent hit area over the button
        const hitArea = new Phaser.Geom.Rectangle(
            viewportWidth - buttonWidth - margin,
            margin,
            buttonWidth,
            buttonHeight
        );
    
        // Create the button text
        const buttonText = this.scene.add.text(
            viewportWidth - buttonWidth / 2 - margin,
            margin + buttonHeight / 2, 
            'End Turn', 
            { fill: '#0f0', fontSize: '20px' }
        ).setOrigin(0.5);
    
        // Set the interactive hit area to match the background
        buttonText.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        
        // Attach the click event
        buttonText.on('pointerdown', () => {
            console.log('Button clicked');
            this.endTurn();
        });
    
        // Add the text to the container
        buttonContainer.add(buttonText);
    
        this.endTurnButton = buttonContainer;
        console.log('End turn button created', this.endTurnButton);
    
        // Debugging: Check if the button is interactive
        console.log('Button is interactive:', buttonText.input.enabled);
    
        // Debugging: Check for overlapping elements
        this.scene.input.on('pointerdown', (pointer, gameObjects) => {
            console.log('Pointer down on:', gameObjects);
            gameObjects.forEach(gameObject => {
                console.log('GameObject:', gameObject.type, gameObject);
            });
        });
        buttonText.setInteractive({ useHandCursor: true }).setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        this.scene.input.setTopOnly(true); // Make sure only the topmost object gets the click

    }
    
    
    
    endTurn() {
        console.log('Ending turn');
        if (this.endTurnButton) {
            this.endTurnButton.destroy();
            this.endTurnButton = null;
        }

        if (this.endTurnResolve) {
            this.endTurnResolve();
            this.endTurnResolve = null;
        }
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

    handleMapClick(pointer) {
        if (this.locked) return;

        const worldPoint = pointer.positionToCamera(this.scene.cameras.main);
        const clickedTile = this.mapManager.getTileAt(worldPoint.x, worldPoint.y);

        if (!clickedTile) return;

        if (pointer.leftButtonDown()) {
            // Left-click: Select the clicked tile and show details in the info panel
            this.selectedTile = clickedTile;
            this.mapManager.showTileDetails(clickedTile);
        } else if (pointer.rightButtonDown()) {
            let actionCost;
            if (this.ctrlKey.isDown) {
                actionCost = this.mapManager.calculateActionCost(this.house, this.selectedTile, clickedTile, 1, 'split');
            } else if (this.altKey.isDown) {
                const unitsToMove = Math.floor(this.selectedTile.units / 2);
                actionCost = this.mapManager.calculateActionCost(this.house, this.selectedTile, clickedTile, unitsToMove, 'split');
            } else {
                actionCost = this.mapManager.calculateActionCost(this.house, this.selectedTile, clickedTile, this.selectedTile.units, 'all');
            }

            if (!this.house.canPerformAction(actionCost)) {
                console.log('Not enough action points');
                return;
            }

            let newTile;
            if (this.ctrlKey.isDown) {
                newTile = this.mapManager.moveOneUnit(this.house, this.selectedTile, clickedTile);
            } else if (this.altKey.isDown) {
                newTile = this.mapManager.moveHalfUnits(this.house, this.selectedTile, clickedTile);
            } else {
                newTile = this.mapManager.moveAllUnits(this.house, this.selectedTile, clickedTile);
            }

            if (newTile) {
                this.house.actionPoints -= actionCost;
                this.selectedTile = newTile;
            }
        }
    }
}