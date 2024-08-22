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

const questions = [
    {
        id: 'q2',
        text: 'What is your favorite color?',
        options: [
            { text: 'Red', value: '1' },
            { text: 'Blue', value: '2' },
            { text: 'Yellow', value: '3' },
            { text: 'Green', value: '4' }
        ]
    }
];


export class Carving extends Scene
{
    constructor ()
    {
        super('Carving');
        this.currentDialogueIndex = 0;
        this.currentQuestionIndex = null;
        this.answers = {};
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

        this.loadIndices();
        if (this.currentQuestionIndex != null) {
            this.startQuestions();
        } else {
            this.showCurrentDialogue();
        }
    }

    loadIndices() {
        const savedDialogueIndex = localStorage.getItem('currentDialogueIndex');
        if (savedDialogueIndex !== null) {
            this.currentDialogueIndex = parseInt(savedDialogueIndex, 10);
        }

        const savedQuestionIndex = localStorage.getItem('currentQuestionIndex');
        if (savedQuestionIndex !== null) {
            this.currentQuestionIndex = parseInt(savedQuestionIndex, 10);
        }
    }

    saveDialogueIndex() {
        localStorage.setItem('currentDialogueIndex', this.currentDialogueIndex);
    }

    clearDialouge() {
        this.dialogueText.destroy();
        localStorage.removeItem('currentDialogueIndex');
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
            this.currentQuestionIndex = 0;
            this.startQuestions();
        }
    }


    startQuestions() {
        this.clearDialouge();
        this.saveQuestionIndex();
        this.showQuestion();
    }

    saveQuestionIndex() {
        localStorage.setItem('currentQuestionIndex', this.currentQuestionIndex);
    }

    saveAnswers() {
        localStorage.setItem('answers', JSON.stringify(this.answers));
    }

    showQuestion() {
        if (this.currentQuestionIndex == null) {
            this.currentQuestionIndex = 0;
        }
        else if (this.currentQuestionIndex >= questions.length) {
            this.finishQuestions();
            return;
        }

        const question = questions[this.currentQuestionIndex];
        this.dialogueText.setText(question.text);

        // Clear previous options
        if (this.optionButtons) {
            this.optionButtons.forEach(button => button.destroy());
        }

        this.optionButtons = question.options.map((option, index) => {
            return this.add.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 200 + index * 40, option.text, {
                fontFamily: 'Arial',
                fontSize: 24,
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
                this.answers[question.id] = option.value;
                this.saveAnswers();
                this.currentQuestionIndex++;
                this.saveQuestionIndex();
                this.showQuestion();
            });
        });
    }

    finishQuestions() {
        const house = this.determineHouse();
        const name = this.answers['name'];
        this.scene.start('Institute', { house, name });
    }

    determineHouse() {
        // Logic to determine house based on answers
    }
}
