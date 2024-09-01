import { Scene } from 'phaser';

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

const characters = {
    daniel: { name: 'Daniel O\'Nagasos', folder: 'daniel', side: 'left' },
    banic: { name: 'Banic O\'Nagasos', folder: 'banic', side: 'left' },
};

const dialogues = [
    { character: 'banic', expression: 'neutral', text: 'Banic watches the player for a moment, his expression unreadable.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'I\'m Banic O\'Nagasos.', style: 'Normal', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'He gestures to Daniel, who stands nearby, serious but silent.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'And this is my nephew, Daniel. You’ve been through a lot, but there\'s more you need to understand.', style: 'Normal', x: 200, y: 600 },
    { character: 'daniel', expression: 'neutral', text: 'Hey. I brought you out of the mines. You were... in bad shape.', style: 'Normal', x: 200, y: 600 },
    { character: 'daniel', expression: 'sad', text: 'And for what it\'s worth, I am sorry that this has happened to you...', style: 'Normal', x: 200, y: 600 },

    { character: 'player', expression: '', text: 'Still reeling from the recent events, you frown, your voice tentative.', style: 'Italic', x: 200, y: 600 },
    { character: 'player', expression: '', text: 'What do you mean? What’s going on? Why did you save me?', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'Banic takes a deep breath, his gaze steady as he begins to explain.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'You’ve been living a lie, like all low-reds. You think you know your place, your worth... but you don’t. None of us do.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'He pauses, letting the weight of his words sink in before continuing.', style: 'Italic', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'You’ve been told that the work you do, the sweat and blood you pour into the mines, is for the greater good. That it\'s all for the terraforming of Mars, to make it habitable for future generations.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'Banic’s voice turns bitter, his eyes narrowing as he speaks.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'But that’s a lie. Mars... it’s already habitable. Has been for generations. The air you’re fighting to create, the soil you break your back to cultivate... it’s all a sham.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'neutral', text: 'He watches the your reaction closely, knowing this truth is hard to swallow.', style: 'Italic', x: 200, y: 600 },
    
    { character: 'player', expression: '', text: 'Your eyes widen in disbelief, Your voice shaking.', style: 'Italic', x: 200, y: 600 },
    { character: 'player', expression: '', text: 'No... that can’t be true. We’ve been told... we’ve seen the reports, the progress...', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'Banic shakes his head, his expression grim.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'Those reports are fabricated, fed to us to keep us in line. To keep us working. The truth is, Mars has been terraformed for a long time. The Golds and their kin live in cities, in comfort, while we toil underground, believing we’re saving the future.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'neutral', text: 'He steps closer, his voice lowering to a conspiratorial tone.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'We’re nothing more than slaves. Tools, used and discarded when we’re no longer needed. The Golds... they built their empire on our backs, and they’ll do anything to keep it that way.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'player', expression: '', text: 'Your voice rises, anger and confusion mixing as they try to make sense of it all.', style: 'Italic', x: 200, y: 600 },
    { character: 'player', expression: '', text: 'Then why didn’t anyone tell us? Why hasn’t anyone tried to stop this? To fight back?', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'Banic’s expression hardens, his voice filled with a quiet fury.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'Some have tried, but the Golds are ruthless. They crush any rebellion before it can take root. They control everything—the information, the resources, even the air we breathe.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'He gestures to the surroundings, the lush green landscape of Mars looming outside the window.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'Look around you. This planet, this life... it’s all a cage. And the worst part? We didn’t even know we were in one. Until now.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'neutral', text: 'Banic pauses, letting the silence settle in, heavy with the weight of their reality.', style: 'Italic', x: 200, y: 600 },
    
    { character: 'player', expression: '', text: 'Your voice, quieter now, the enormity of the situation dawning on you.', style: 'Italic', x: 200, y: 600 },
    { character: 'player', expression: '', text: 'So... what do we do? How do we fight back against something so... so huge?', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'Banic’s gaze locks onto the you, his voice steady and resolute.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'We fight smart. We don’t just challenge them head-on; that would be suicide. We infiltrate, we deceive, and we strike from within. That’s where you come in.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'neutral', text: 'He steps closer, his tone intensifying.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'You have to become one of them. A Gold. Live among them, rise through their ranks, and when the time is right... you change things. From the inside.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'neutral', text: 'He lets that sink in, knowing it’s no small task he’s asking for.', style: 'Italic', x: 200, y: 600 },
    
    { character: 'player', expression: '', text: 'You hesitates, your voice barely above a whisper.', style: 'Italic', x: 200, y: 600 },
    { character: 'player', expression: '', text: 'Become a Gold? But how... how could I ever do that? How could I betray everything I am?', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'neutral', text: 'Banic’s voice softens, a rare moment of empathy shining through.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'You wouldn’t be betraying who you are... you’d be honoring it. By doing this, you’d be giving our people a chance. A chance they never had before.', style: 'Normal', x: 200, y: 600 },
    
    { character: 'banic', expression: 'serious', text: 'He meets the your eyes, his voice resolute.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'You won\t be alone in this, there are others who have gone before you, and paved a way.', style: 'Normal', x: 200, y: 600 },
    { character: 'banic', expression: 'serious', text: 'The question is... are you willing to take that chance?', style: 'Normal', x: 200, y: 600 },
    { character: 'player', expression: '', text: 'You look at Banic, then at Daniel, your resolve hardening.', style: 'Italic', x: 200, y: 600 },
    { character: 'player', expression: '', text: 'I am.', style: 'Normal', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'Banic nods, a flicker of pride in his eyes.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'Then let us begin.', style: 'Normal', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'Banic gestures to the carving tools on the table, a silent invitation to join them.', style: 'Italic', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'It’s time to carve your path. First I am going to ask you various questions, this will help us know what kind of gold to shape you into.', style: 'Normal', x: 200, y: 600 },
    { character: 'banic', expression: 'neutral', text: 'Are you ready? Once this is done, and you\'ve been trained up, you\'ll be sent to the Mars institute', style: 'Italic', x: 200, y: 600 },
    { character: 'player', expression: '', text: 'You nods, determination in your eyes.', style: 'Italic', x: 200, y: 600 },      
];




export class Carving extends Scene
{
    constructor ()
    {
        super('Carving');
        this.currentDialogueIndex = 0;
        this.currentQuestionIndex = null;
        this.answers = {};
        this.pointerdownListener = null;
    }

    preload() {
        // Daniel: Happy, netural, pity, sad, serious.
        this.load.image(`daniel_happy`, `assets/daniel/happy.png`);
        this.load.image(`daniel_neutral`, `assets/daniel/neutral.png`);
        this.load.image(`daniel_pity`, `assets/daniel/pity.png`);
        this.load.image(`daniel_sad`, `assets/daniel/sad.png`);
        this.load.image(`daniel_serious`, `assets/daniel/serious.png`);

        // Banic: annoyed, happy, neutral.
        this.load.image(`banic_serious`, `assets/banic/serious.png`);
        this.load.image(`banic_happy`, `assets/banic/happy.png`);
        this.load.image(`banic_neutral`, `assets/banic/neutral.png`);
    }
    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'city').setAlpha(0.5);

        this.characterImages = {};
        for (const key in characters) {
            const char = characters[key];
            this.characterImages[key] = this.add.image(0, 0, `${char.folder}_neutral`).setVisible(false);
        }

        this.dialogueText = this.add.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 100, '', {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: SCREEN_WIDTH - 40 }
        }).setOrigin(0.5);

        this.loadIndices();
        if (this.currentQuestionIndex != null) {
            this.scene.start('CarvingQuestions');
        } else {
            this.pointerdownListener = this.input.on('pointerdown', this.nextDialogue, this);
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
        
        for (const key in this.characterImages) {
            this.characterImages[key].destroy();
        }
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
    
        const portraitLessCharacters = ['system', 'player'];
    
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
        } else {
            console.log(dialogue)
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
            // clear local storage
            localStorage.removeItem('currentDialogueIndex');
            
            // Set the next scene
            localStorage.setItem('currentQuestionIndex', 0);
            localStorage.setItem('currentScene', 'CarvingQuestions');
            this.scene.start('CarvingQuestions');
        }
    }
}