import { Scene } from 'phaser';

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

const characters = {
    alice: { name: 'Alice', folder: 'alice' },
    bob: { name: 'Bob', folder: 'bob' }
};

const dialogues = [
    { character: 'alice', expression: 'happy', text: 'Hello, Bob!', x: 200, y: 600 },
    { character: 'bob', expression: 'neutral', text: 'Hi, Alice! How are you?', x: 800, y: 600 },
    { character: 'alice', expression: 'neutral', text: 'I am good, thanks for asking.', x: 200, y: 600 },
    { character: 'bob', expression: 'happy', text: 'Great to hear!', x: 800, y: 600 }
];

export class Laurel extends Scene {
    constructor() {
        super('Laurel');
        this.currentDialogueIndex = 0;
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        for (const key in characters) {
            const char = characters[key];
            this.load.image(`${char.folder}_happy`, `assets/${char.folder}/happy.png`);
            this.load.image(`${char.folder}_neutral`, `assets/${char.folder}/neutral.png`);
            this.load.image(`${char.folder}_angry`, `assets/${char.folder}/angry.png`);
        }
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'background').setAlpha(0.5);

        this.characterImages = {};
        for (const key in characters) {
            const char = characters[key];
            this.characterImages[key] = this.add.image(0, 0, `${char.folder}_neutral`).setVisible(false);
        }

        this.dialogueText = this.add.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 100, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: SCREEN_WIDTH - 40 }
        }).setOrigin(0.5);

        this.input.on('pointerdown', this.nextDialogue, this);

        this.loadDialogueIndex();
        this.showCurrentDialogue();
    }

    loadDialogueIndex() {
        const savedIndex = localStorage.getItem('currentDialogueIndex');
        if (savedIndex !== null) {
            this.currentDialogueIndex = parseInt(savedIndex, 10);
        }
    }

    saveDialogueIndex() {
        localStorage.setItem('currentDialogueIndex', this.currentDialogueIndex);
    }

    showCurrentDialogue() {
        if (this.currentDialogueIndex >= dialogues.length) {
            return;
        }

        const dialogue = dialogues[this.currentDialogueIndex];
        const char = characters[dialogue.character];

        for (const key in this.characterImages) {
            this.characterImages[key].setVisible(false);
        }

        const imageKey = `${char.folder}_${dialogue.expression}`;
        const characterImage = this.characterImages[dialogue.character];
        characterImage.setTexture(imageKey);
        characterImage.setPosition(dialogue.x, dialogue.y);
        characterImage.setVisible(true);

        this.dialogueText.setText(`${char.name}: ${dialogue.text}`);
    }

    nextDialogue() {
        this.currentDialogueIndex++;
        if (this.currentDialogueIndex < dialogues.length) {
            this.saveDialogueIndex();
            this.showCurrentDialogue();
        } else {
            localStorage.removeItem('currentDialogueIndex');
            localStorage.setItem('currentScene', 'Carving');
            this.scene.start('Carving');
        }
    }
}