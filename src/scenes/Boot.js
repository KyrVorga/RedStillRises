import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('mining', 'assets/mining.png');
    }

    create ()
    {
        // Disable right-click context menu for the entire game container
        this.input.mouse.disableContextMenu();

        // Capture the right-click event, including Shift + Right Click
        this.input.on('pointerdown', function (pointer) {
            if (pointer.rightButtonDown()) {
                pointer.event.preventDefault();  // Prevent default behavior
                // Handle right-click actions here
            }
        });

        this.scene.start('Preloader');
    }
}
