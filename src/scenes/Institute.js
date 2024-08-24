import { Scene } from 'phaser';

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

export class Institute extends Scene {
    constructor() {
        super('Institute');
    }

    init(data) {
        this.house = data.house;
        this.name = data.name;
    }

    create() {
        // capatilize the first letter of the house
        this.house = this.house.charAt(0).toUpperCase() + this.house.slice(1);

        this.add.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, `Welcome ${this.name} to House ${this.house}!`, {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
    }
}