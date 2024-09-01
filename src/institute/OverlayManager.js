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
            fill: '#ffffff'
        }).setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1001);
    
        // Add text to display player's resources
        // this.foodText = this.scene.add.text(viewportWidth / 7, viewportHeight - this.margin / 2, "Food: 0", {
        //     fontSize: '18px',
        //     fill: '#ffffff'
        // }).setOrigin(0.5)
        // .setScrollFactor(0)
        // .setDepth(1001);
    
        // this.woodText = this.scene.add.text(2 * viewportWidth / 7, viewportHeight - this.margin / 2, "Wood: 0", {
        //     fontSize: '18px',
        //     fill: '#ffffff'
        // }).setOrigin(0.5)
        // .setScrollFactor(0)
        // .setDepth(1001);
    
        // this.stoneText = this.scene.add.text(3 * viewportWidth / 7, viewportHeight - this.margin / 2, "Stone: 0", {
        //     fontSize: '18px',
        //     fill: '#ffffff'
        // }).setOrigin(0.5)
        // .setScrollFactor(0)
        // .setDepth(1001);
    
        // Add text to display player's action points
        this.actionPointsText = this.scene.add.text(4 * viewportWidth / 6, viewportHeight - this.margin / 2, "Action Points: 0", {
            fontSize: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1001);
    
        // // Add an "Upgrades" button at the bottom right corner
        // this.upgradesButton = this.scene.add.text(viewportWidth - this.margin / 2, viewportHeight - this.margin / 2, "Upgrades", {
        //     fontSize: '18px',
        //     fill: '#ffffff',
        //     backgroundColor: '#000000'
        // }).setOrigin(1, 0.5)
        // .setScrollFactor(0)
        // .setDepth(1001)
        // .setInteractive({ useHandCursor: true });
    
        // Add a small chatbox at the bottom left corner above the overlay
        this.chatBox = this.scene.add.text(this.margin, viewportHeight - this.margin, "System Messages", {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            wordWrap: { width: 200 }
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
        const viewportWidth = this.scene.cameras.main.width;
        const viewportHeight = this.scene.cameras.main.height;
    
        // Create opaque background
        const background = this.scene.add.graphics();
        background.fillStyle(0x000000, 1); // Fully opaque background
        background.fillRect(0, 0, viewportWidth, viewportHeight);
        background.setScrollFactor(0);
        background.setDepth(2000);
    
        // Create modal container
        const modal = this.scene.add.container(viewportWidth / 2, viewportHeight / 2);
        modal.setDepth(2000);
    
        // Create modal background
        const modalBackground = this.scene.add.graphics();
        modalBackground.fillStyle(0xffffff, 1);
        modalBackground.fillRect(0, 0, 400, 300);
        modal.add(modalBackground);
    
        // Add modal content
        const content = [
            "How the game works: ...",
            "The goal: ...",
            "About tiles: ...",
            "How to move: ...",
            "What the buttons do: ..."
        ];
    
        content.forEach((text, index) => {
            const textElement = this.scene.add.text(20, 20 + index * 40, text, { fill: '#000', fontSize: '16px' });
            textElement.setDepth(2001); // Ensure text is above the modal background
            modal.add(textElement);
        });
    
        // Add close button

        const closeButton = this.scene.add.image(
            200, 140, 'close'
        ).setOrigin(0.5)
        .on('pointerdown', () => {
            background.destroy();
            modal.destroy();
        })
        .setInteractive({ useHandCursor: true })
        .setDepth(2001); 
        modal.add(closeButton);
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