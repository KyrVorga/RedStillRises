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
        this.add.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, `Welcome ${this.name} to ${this.house}!`, {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
    }
}