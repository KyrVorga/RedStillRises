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
    
        // Add text to display whose turn it is
        this.turnText = this.scene.add.text(viewportWidth / 2, this.margin / 2, "Player's Turn", {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Pixelify Sans'
        }).setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1001);
    
        // Add text to display player's action points
        this.actionPointsText = this.scene.add.text(4 * viewportWidth / 6, viewportHeight - this.margin / 2, "Action Points: 0", {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Pixelify Sans'
        }).setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1001);
    
        // Add a small chatbox at the bottom left corner above the overlay
        this.chatBox = this.scene.add.text(this.margin, viewportHeight - this.margin, "System Messages", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            wordWrap: { width: 200 },
            fontFamily: 'Pixelify Sans'
        }).setOrigin(0, 1)
        .setScrollFactor(0)
        .setDepth(1001);
    
        this.createHelpButton();
    
        return overlay;
    }

    createHelpButton() {
        const viewportWidth = this.scene.cameras.main.width;
        const marginRight = 0;
        const marginTop = 100;
        const buttonSize = 40;

        // Create the eye icon
        const button = this.scene.add.image(
            viewportWidth - buttonSize / 2 - marginRight,
            buttonSize / 2 + marginTop,
            'help'
        ).setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1001) // Ensure the icon is above the background
        .setInteractive({ useHandCursor: true });

        button.on('pointerdown', () => {
            console.log('Info button clicked');
            this.showHelpModal();
        });

        return button;
    }    

    displayMessage(message) {
        this.chatBox.setVisible(true);
        this.chatBox.setText(message);
        setTimeout(() => {
            this.chatBox.setVisible(false);
        }, 5000);
    }

    updateResources(food, wood, stone, actionPoints) {
        // this.foodText.setText(`Food: ${food}`);
        // this.woodText.setText(`Wood: ${wood}`);
        // this.stoneText.setText(`Stone: ${stone}`);
        // this.actionPointsText.setText(`Action Points: ${actionPoints}`);
    }

    updateTurnText(text) {
        this.turnText.setText(text);
    }

    showHelpModal() {
        const modal = document.getElementById("helpModal");
        const closeButton = document.getElementsByClassName("close")[0];

        modal.style.display = "flex";

        closeButton.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
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
            { fill: '#00cd0d', fontSize: '20px', fontFamily: 'Pixelify Sans' }
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
        // const viewportWidth = this.scene.cameras.main.width;
        // const marginRight = 0;
        // const marginTop = 50; // Adjust as needed
        // const buttonSize = 40;

        // // Create the eye icon
        // const buttonIcon = this.scene.add.image(
        //     viewportWidth - buttonSize / 2 - marginRight,
        //     buttonSize / 2 + marginTop,
        //     'eye', 
        //     { fill: '#00cd0d' }
        // ).setOrigin(0.5)
        // .setScrollFactor(0)
        // .setDepth(1002) // Ensure the icon is above the background
        // .setInteractive({ useHandCursor: true });

        // // Add click event to toggle view and switch icons
        // buttonIcon.on('pointerdown', () => {
        //     console.log('Toggle button clicked');
        //     callback(this.mode);

        //     // Switch icons
        //     const currentTexture = buttonIcon.texture.key;
        //     const newTexture = currentTexture === 'eye' ? 'eye-off' : 'eye';
        //     buttonIcon.setTexture(newTexture);
        // });

        // if (this.mode === 'default') {
        //     this.mode = 'resource';
        // } else {
        //     this.mode = 'default';
        // }

        // return buttonIcon;
    }
}