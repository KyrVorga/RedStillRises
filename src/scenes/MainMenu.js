import { Scene } from 'phaser';
import WebFont from 'webfontloader';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Load the web font using WebFont Loader
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        
        const currentScene = localStorage.getItem('currentScene');

        // Ensure the font is loaded before rendering text
        WebFont.load({
            custom: {
                families: ['Pixelify Sans'],
                urls: ['/style.css'] // Update this path to your actual font CSS file
            },
            active: () => {
                this.add.image(512, 384, 'mining');
                this.add.image(512, 380, 'logo');

                this.add.text(512, 460, 'Play', {
                    fontFamily: "Pixelify Sans", fontSize: 38, color: '#ffffff',
                    stroke: '#000000', strokeThickness: 6,
                    align: 'center'
                }).setOrigin(0.5);

                this.input.once('pointerdown', () => {
                    if (currentScene !== null) {
                        switch (currentScene) {
                            case 'Mining':
                                this.scene.start('Mining');
                                break;
                            case 'Laurel':
                                this.scene.start('Laurel');
                                break;
                            case 'Carving':
                                this.scene.start('Carving');
                                break;
                            default:
                                break;
                        }
                    } else {
                        this.scene.start('Mining');
                    }
                });
            }
        });
    }
}