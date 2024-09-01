import Phaser from "phaser";

export class Tooltip extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text) {
        super(scene, x, y);
        this.background = scene.add.rectangle(0, 0, 150, 50, 0x000000, 0.7);
        this.text = scene.add.text(0, 0, text, { fontSize: '16px', fill: '#fff' });
        this.text.setOrigin(0.5);
        this.add(this.background);
        this.add(this.text);
        this.setVisible(false);
        scene.add.existing(this);
    }

    show(x, y, text) {
        this.setPosition(x, y);
        this.text.setText(text);
        this.setVisible(true);
    }

    hide() {
        this.setVisible(false);
    }
}