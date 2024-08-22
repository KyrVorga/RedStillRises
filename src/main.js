import { Boot } from './scenes/Boot';
import { Laurel } from './scenes/Laurel';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Mining } from './scenes/Mining';
import { Carving } from './scenes/Carving';
import { Institute } from './scenes/Institute';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Mining,
        Carving,
        Laurel,
        Institute
    ]
};

export default new Phaser.Game(config);
