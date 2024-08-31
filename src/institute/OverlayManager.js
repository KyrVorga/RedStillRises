export class OverlayManager {
    constructor(scene, margin) {
        this.scene = scene;
        this.margin = margin;
        this.mode = 'default';
    }

    createOverlay() {
        const viewportWidth = this.scene.cameras.main.width;
        const viewportHeight = this.scene.cameras.main.height;
        const overlay = this.scene.add.graphics();
        overlay.fillStyle(0x333333, 1);

        overlay.fillRect(0, 0, viewportWidth, this.margin);
        overlay.fillRect(0, viewportHeight - this.margin, viewportWidth, this.margin);
        overlay.fillRect(0, this.margin, this.margin, viewportHeight - 2 * this.margin);
        overlay.fillRect(viewportWidth - this.margin, this.margin, this.margin, viewportHeight - 2 * this.margin);
        overlay.setScrollFactor(0);

        // Set the depth to a high value to ensure it stays above other elements
        overlay.setDepth(1000);

        return overlay;
    }
    
    createEndTurnButton(callback) {
        const viewportWidth = this.scene.cameras.main.width;
        const marginRight = 10;
        const marginTop = 0;
        const buttonWidth = 100;
        const buttonHeight = 40;
    
        // Create the button text
        const buttonText = this.scene.add.text(
            viewportWidth - buttonWidth / 2 - marginRight,
            buttonHeight / 2 + marginTop,
            'End Turn', 
            { fill: '#00cd0d', fontSize: '20px' }
        ).setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1001)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            console.log('Button clicked');
            callback();
        })
        .on('pointerover', () => buttonText.setStyle({ fill: '#0f0' }))
        .on('pointerout', () => buttonText.setStyle({ fill: '#00cd0d' }));
    
        this.scene.input.setTopOnly(true); // Make sure only the topmost object gets the click

        return buttonText;
    }

    createToggleViewButton(callback) {
        const viewportWidth = this.scene.cameras.main.width;
        const marginRight = 5;
        const marginTop = 50; // Adjust as needed
        const buttonSize = 40;

        // Create the eye icon
        const buttonIcon = this.scene.add.image(
            viewportWidth - buttonSize / 2 - marginRight,
            buttonSize / 2 + marginTop,
            'eye', 
            { fill: '#00cd0d' }
        ).setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1002) // Ensure the icon is above the background
        .setInteractive({ useHandCursor: true });

        // Add click event to toggle view and switch icons
        buttonIcon.on('pointerdown', () => {
            console.log('Toggle button clicked');
            callback(this.mode);

            // Switch icons
            const currentTexture = buttonIcon.texture.key;
            const newTexture = currentTexture === 'eye' ? 'eye-off' : 'eye';
            buttonIcon.setTexture(newTexture);
        });

        if (this.mode === 'default') {
            this.mode = 'resource';
        } else {
            this.mode = 'default';
        }

        return buttonIcon;
    }
}