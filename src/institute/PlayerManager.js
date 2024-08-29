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

        this.locked = true;
    }

    notifyTurn(house) {
        if (house === this.house.name) {
            console.log('Player turn:', house);
            this.resetActionPoints();
            this.unlockControls();
        } else {
            this.lockControls();
        }
    }

    lockControls() {
        this.locked = true;
    }

    unlockControls() {
        this.locked = false;
    }

    resetActionPoints() {
        // Placeholder for resetting action points
        console.log('Resetting action points');
    }

    canPerformAction() {
        // Placeholder for checking if the user can perform this action on their turn given their action points
        return true;
    }

    handleMapClick(pointer) {
        if (this.locked) return;
        console.log(this.house)

        const worldPoint = pointer.positionToCamera(this.scene.cameras.main);
        const clickedTile = this.mapManager.getTileAt(worldPoint.x, worldPoint.y);

        if (!clickedTile) return;

        if (pointer.leftButtonDown()) {
            // Left-click: Select the clicked tile and show details in the info panel
            this.selectedTile = clickedTile;
            this.mapManager.showTileDetails(clickedTile);
        } else if (pointer.rightButtonDown()) {
            if (!this.canPerformAction()) {
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
                this.selectedTile = newTile;
            }
        }
        console.log(this.house)
    }
}