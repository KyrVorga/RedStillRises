import { Scene } from 'phaser';

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

const characters = {
    alice: { name: 'Alice O\'Cryssos', folder: 'alice', side: 'left' },
    kira: { name: 'Kira cu Baro', folder: 'kira', side: 'right' },
    daniel: { name: 'Daniel O\'Nagasos', folder: 'daniel', side: 'left' },
    banic: { name: 'Banic O\'Nagasos', folder: 'banic', side: 'left' },
};

const dialogues = [
    { character: 'alice', expression: 'happy', text: 'Alice approaches the player with a warm smile, her eyes lighting up as she speaks.', style: 'Italic'},
    { character: 'alice', expression: 'nervous', text: 'Hey... you did it! I mean, of course you did.', style: 'Normal'},
    { character: 'alice', expression: 'happy', text: 'Congratulations on winning the laurel! I knew you would.', style: 'Normal'},
    { character: 'alice', expression: 'worried', text: 'Her smile falters slightly, and she glances around nervously.', style: 'Italic'},
    { character: 'alice', expression: 'worried', text: 'It must have been so hard, all that effort... I can’t even imagine.', style: 'Normal'},
    { character: 'alice', expression: 'happy', text: 'But you did it. You really did. You should be proud.', style: 'Normal'},
    { character: 'alice', expression: 'happy', text: 'Everyone’s waiting down in the township for the festivities.', style: 'Normal'},
    { character: 'alice', expression: 'nervous', text: 'Alice fidgets with her hands, her voice softening.', style: 'Italic'},
    { character: 'alice', expression: 'nervous', text: 'It’s going to be wonderful... we should, um, go down together.', style: 'Normal'},
    { character: 'kira', expression: 'neutral', text: 'The Mine Magistrate, Kira cu Baro, descends into the township, his expression a mask of righteous solemnity as he surveys the crowd.', style: 'Italic'},
    { character: 'kira', expression: 'neutral', text: 'Ah, what a splendid day of triumph... of honor... of integrity... or so the grand declarations proclaim.', style: 'Normal'},
    { character: 'kira', expression: 'happy', text: 'We gather here to extol the virtues of our tireless clans, who labor endlessly to transform this rugged rock into a beacon of... prosperity.', style: 'Normal'},
    { character: 'kira', expression: 'happy', text: 'He chuckles darkly, savoring the grandiose irony of his speech.', style: 'Italic'},
    { character: 'kira', expression: 'neutral', text: 'His demeanor shifts as he raises his hand, casting a shadow of forced gravitas over the crowd.', style: 'Italic'},
    { character: 'kira', expression: 'neutral', text: 'And now, the moment of ultimate virtue... the bestowing of the laurel.', style: 'Normal'},
    { character: 'kira', expression: 'happy', text: 'The laurel is conferred upon Gamma, as is fitting.', style: 'Normal'},
    { character: 'kira', expression: 'neutral', text: 'The laurel is a symbol of all that is righteous and true, bestowed upon the worthy.', style: 'Normal'},
    { character: 'player', expression: '', text: 'The player’s face contorts with anger, their voice rising in disbelief.', style: 'Italic'},
    { character: 'player', expression: '', text: 'What? No! We were supposed to win!', style: 'Normal'},
    { character: 'player', expression: '', text: 'This is wrong!', style: 'Normal'},
    { character: 'kira', expression: 'snarling', text: 'Kira’s eyes flash with malice, his voice low and dangerous.', style: 'Italic'},
    { character: 'kira', expression: 'snarling', text: 'You are a cheater, that is why you did not win.', style: 'Normal'},
    { character: 'kira', expression: 'neutral', text: 'No one cheats under my watch and gets away with it.', style: 'Normal'},
    { character: 'kira', expression: 'neutral', text: 'For your crimes, you will be executed.', style: 'Normal'},
    { character: 'alice', expression: 'nervous', text: 'Alice steps forward, her voice trembling as she speaks out.', style: 'Italic'},
    { character: 'alice', expression: 'angry', text: 'No! They didn’t cheat!', style: 'Normal'},
    { character: 'alice', expression: 'angry', text: 'This is a mistake—', style: 'Normal'},
    { character: 'kira', expression: 'neutral', text: 'He cuts her off sharply, his tone laced with menace.', style: 'Italic'},
    { character: 'kira', expression: 'neutral', text: 'Silence, girl.', style: 'Normal'},
    { character: 'kira', expression: 'snarling', text: 'Speak out of turn again, and you’ll join them in the pit.', style: 'Normal'},
    { character: 'system', expression: 'neutral', text: 'The grays, begin moving toward the player, their expressions grim.', style: 'Italic'},
    { character: 'kira', expression: 'neutral', text: 'His voice is cold, devoid of any emotion.', style: 'Italic'},
    { character: 'kira', expression: 'snarling', text: 'You are sentenced to be thrown into the Den, to be devoured by the pit vipers.', style: 'Normal'},
    { character: 'kira', expression: 'sad', text: 'Oh how unfortunate that the best among us must be blinded by their greed.', style: 'Normal'},
    { character: 'system', expression: '', text: 'You are is knocked out and dragged from the township.', style: 'Italic'},
    { character: 'system', expression: '', text: 'You feel groggy and disoriented. You catch snippets of a conversation as you\'re dragged away.', style: 'Italic'},
    { character: 'gray1', expression: 'neutral', text: 'The first gray’s voice is low, filled with unease.', style: 'Italic'},
    { character: 'gray1', expression: 'neutral', text: 'Something feels... off about this.', style: 'Normal'},
    { character: 'gray1', expression: 'neutral', text: 'Are we sure they cheated?', style: 'Normal'},
    { character: 'gray2', expression: 'neutral', text: 'The second gray grumbles, his patience wearing thin.', style: 'Italic'},
    { character: 'gray2', expression: 'neutral', text: 'Just throw the body in quick and get out.', style: 'Normal'},
    { character: 'gray2', expression: 'neutral', text: 'No questions.', style: 'Normal'},
    { character: 'daniel', expression: 'serious', text: 'You hear an unknown voice, as you are awoken by a red man.', style: 'Italic'},
    { character: 'daniel', expression: 'serious', text: 'Hey, wake up!', style: 'Normal'},
    { character: 'daniel', expression: 'serious', text: 'You’re safe, for now.', style: 'Normal'},
    { character: 'daniel', expression: 'serious', text: 'We’ve got to move before they come back.', style: 'Normal'},
    { character: 'player', expression: '', text: 'Still groggy, you try to sit up, confusion clouding your sense.', style: 'Italic'},
    { character: 'player', expression: '', text: 'I... I need to go back.', style: 'Normal'},
    { character: 'player', expression: '', text: 'Alice... she’ll be worried...', style: 'Normal'},
    { character: 'daniel', expression: 'pity', text: 'Daniel frowns, a hint of sadness in his eyes as he delivers a harsh truth.', style: 'Italic'},
    { character: 'daniel', expression: 'pity', text: 'You can’t go back.', style: 'Normal'},
    { character: 'daniel', expression: 'pity', text: 'You’re dead. They think you died in the pit.', style: 'Normal'},
    { character: 'daniel', expression: 'pity', text: 'If you return, they’ll just execute you again.', style: 'Normal'},
    { character: 'player', expression: '', text: 'You begin to tear up, the weight of your situation sinking in.', style: 'Italic'},
    { character: 'daniel', expression: 'serious', text: 'Daniel sighs, placing a hand on their shoulder in a gesture of comfort.', style: 'Italic'},
    { character: 'daniel', expression: 'serious', text: 'I know it’s hard, but we’ve got to go.', style: 'Normal'},
    { character: 'daniel', expression: 'serious', text: 'The grays will come back to check the pit, and if they find you missing...', style: 'Normal' }
];

export class Laurel extends Scene {
    constructor() {
        super('Laurel');
        this.currentDialogueIndex = 0;
    }

    preload() {
        // Alice: angry, happy, neutral, sad, worried, nervous.
        this.load.image(`alice_angry`, `assets/alice/angry.png`);
        this.load.image(`alice_happy`, `assets/alice/happy.png`);
        this.load.image(`alice_neutral`, `assets/alice/neutral.png`);
        this.load.image(`alice_sad`, `assets/alice/sad.png`);
        this.load.image(`alice_worried`, `assets/alice/worried.png`);
        this.load.image(`alice_nervous`, `assets/alice/nervous.png`);

        // Kira: happy (cheesy), neutral, sad (fake sorrow), snarling.
        this.load.image(`kira_happy`, `assets/magistrate/happy.png`);
        this.load.image(`kira_neutral`, `assets/magistrate/neutral.png`);
        this.load.image(`kira_sad`, `assets/magistrate/sad.png`);
        this.load.image(`kira_snarling`, `assets/magistrate/snarling.png`);

        // Daniel: Happy, netural, pity, sad, serious.
        this.load.image(`daniel_happy`, `assets/daniel/happy.png`);
        this.load.image(`daniel_neutral`, `assets/daniel/neutral.png`);
        this.load.image(`daniel_pity`, `assets/daniel/pity.png`);
        this.load.image(`daniel_sad`, `assets/daniel/sad.png`);
        this.load.image(`daniel_serious`, `assets/daniel/serious.png`);

        // Banic: annoyed, happy, neutral.
        this.load.image(`banic_annoyed`, `assets/banic/annoyed.png`);
        this.load.image(`banic_happy`, `assets/banic/happy.png`);
        this.load.image(`banic_neutral`, `assets/banic/neutral.png`);


    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'mining').setAlpha(0.5);

        this.dialogueText = this.add.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 100, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: SCREEN_WIDTH / 2 }
        }).setOrigin(0.5)
        .setDepth(1);

        this.characterImages = {};

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
    
        // Hide all character images
        for (const key in this.characterImages) {
            if (this.characterImages[key]) {
                this.characterImages[key].setVisible(false);
            }
        }
    
        const portraitLessCharacters = ['system', 'player', 'gray1', 'gray2'];
    
        // Set character image if expression is provided and character is not system, player, gray1, or gray2
        if (dialogue.expression && !portraitLessCharacters.includes(dialogue.character)) {
            const imageKey = `${char.folder}_${dialogue.expression}`;
            let imageX = 200; // Default to left side
            if (char.side === 'right') {
                imageX = SCREEN_WIDTH -200; // Move to right side
            }
            if (!this.characterImages[dialogue.character]) {
                this.characterImages[dialogue.character] = this.add.image(imageX, 600, imageKey);
            } else {
                this.characterImages[dialogue.character].setTexture(imageKey);
                this.characterImages[dialogue.character].setPosition(imageX, 600);
            }
            this.characterImages[dialogue.character].setVisible(true);
        }
    
        // Apply text style
        let fontStyle = 'Normal';
        if (dialogue.style) {
            fontStyle = dialogue.style;
        }
    
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: SCREEN_WIDTH / 2 },
            fontStyle: fontStyle.toLowerCase()
        };
    
        this.dialogueText.setStyle(textStyle);
    
        // Set dialogue text
        let dialogueText = '';
        if (dialogue.character === 'player') {
            dialogueText = `You: ${dialogue.text}`;
        } else if (dialogue.character === 'system') {
            dialogueText = dialogue.text;
        } else if (dialogue.character === 'gray1') {
            dialogueText = `Gray 1: ${dialogue.text}`;
        } else if (dialogue.character === 'gray2') {
            dialogueText = `Gray 2: ${dialogue.text}`;
        } else {
            dialogueText = `${char.name}: ${dialogue.text}`;
        }
    
        this.dialogueText.setText(dialogueText);
        let x = SCREEN_WIDTH / 2;
        // Position the text based on the character's side
        if (portraitLessCharacters.includes(dialogue.character)) {
            this.dialogueText.setX(x);
            this.dialogueText.setOrigin(0.5);
        } else {
            if (char.side === 'left') {
                this.dialogueText.setX(x - 100);
                this.dialogueText.setOrigin(0, 0.5);
            } else if (char.side === 'right') {
                this.dialogueText.setX(x + 100);
                this.dialogueText.setOrigin(1, 0.5);
            }
        }
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