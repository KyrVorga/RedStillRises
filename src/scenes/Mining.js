import { Scene } from 'phaser';

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

export class Mining extends Scene {
    constructor() {
        super({ key: 'Mining' });
        this.helium = 0;
        this.heliumTarget = 10000;
        this.isMining = false;
        this.progressBarWidth = 400;
        this.progressBarHeight = 20;

        this.isMiningSpeedUpgradeEnabled = false;
        this.miningSpeedLevel = 1;
        this.miningSpeedMaxLevel = 5;
        this.miningSpeedCosts = { 1: 3, 2: 5, 3: 10, 4: 25, 5: 50};
        this.miningSpeedValues = { 1: 5000, 2: 4000, 3: 3000, 4: 2000, 5: 1000 };
        this.miningSpeedDescription = "Decreases mining time by 1 second per level.";


        this.isHeliumStorageUpgradeEnabled = false;
        this.heliumStorageLevel = 1;
        this.heliumStorageMaxLevel = 10;
        this.heliumStorageCosts = { 1: 6, 2: 10, 3: 20, 4: 40, 5: 75, 6: 150, 7: 300, 8: 600, 9: 1000, 10: 2000 };
        this.heliumStorageValues = { 1: 10, 2: 30, 3: 75, 4: 150, 5: 250, 6: 500, 7: 1000, 8: 2500, 9: 5000, 10: 10000 };
        this.heliumStorageDescription = "Increases the maximum amount of Helium-3 you can store.";


        this.isMiningEfficiencyUpgradeEnabled = false;
        this.miningEfficiencyLevel = 1;
        this.miningEfficiencyMaxLevel = 5;
        this.miningEfficiencyCosts = { 1: 12, 2: 20, 3: 80, 4: 320, 5: 1280 };
        this.miningEfficiencyValues = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
        this.miningEfficiencyDescription = "Doubles the amount of Helium-3 mined per level.";

        this.isAddtionalMinerUpgradeEnabled = false;
        this.additionalMinerLevel = 1;
        this.additionalMinerMaxLevel = 5;
        this.additionalMinerCosts = { 1: 70, 2: 100, 3: 400, 4: 1600, 5: 3200};
        this.additionalMinerDescription = "Adds an additional miner to mine Helium per level.";

        this.upgradeContainers = {};
        this.upgradeBarContainers = {};
    }

    preload() {
        // Preload assets for the game
    }

    create() {
        
        this.cameras.main.setBackgroundColor(0x000000);

        this.add.image(512, 384, 'mining').setAlpha(0.5);

        // Load saved progress from local storage
        this.loadProgress();

        // Display the amount of helium-3
        this.heliumText = this.add.text(SCREEN_WIDTH/2, SCREEN_HEIGHT/5, 'Helium-3: ' + this.helium + ' / ' + this.GetHeliumStorage(), {
            fontFamily: "Pixelify Sans", fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
    
        // Add a button to mine helium-3
        this.mineButton = this.add.text(SCREEN_WIDTH/2, SCREEN_HEIGHT/3, 'Mine', {
                fontFamily: "Pixelify Sans", fontSize: 38, color: '#ffffff',
                stroke: '#000000', strokeThickness: 4,
                align: 'center'
            })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                if (!this.isMining) {
                    this.MineHelium();
                }
            });
    
        // Create progress bar background
        // this.progressBar = this.add.graphics();
        // this.progressBar.fillStyle(0xffffff, 1); // Set color to white
        // this.progressBar.fillRect(SCREEN_WIDTH/2 - this.progressBarWidth/2, SCREEN_HEIGHT/3 + 40, this.progressBarWidth, this.progressBarHeight);
    
        // Create progress bar fill
        this.progressBarFill = this.add.graphics();

        // Display the mining upgrade options
        if (this.isMiningSpeedUpgradeEnabled) {
            this.DisplayMiningSpeedUpgrade();
        }

        if (this.isHeliumStorageUpgradeEnabled) {
            this.DisplayHeliumStorageUpgrade();
        }

        if (this.isMiningEfficiencyUpgradeEnabled) {
            this.DisplayMiningEfficiencyUpgrade();
        }

        if (this.isAddtionalMinerUpgradeEnabled) {
            this.DisplayAdditionalMinerUpgrade();
        }

    }

    update() {
        // Update the game scene
    }
    
    // Load progress from local storage
    loadProgress() {
        const savedHelium = localStorage.getItem('helium');
        if (savedHelium !== null) {
            this.helium = parseFloat(savedHelium);
            if (this.helium >= this.heliumTarget) {
                this.NextScene();
            };
        }

        const savedIsMiningSpeedUpgradeEnabled = localStorage.getItem('isMiningSpeedUpgradeEnabled');
        if (savedIsMiningSpeedUpgradeEnabled !== null) {
            this.isMiningSpeedUpgradeEnabled = savedIsMiningSpeedUpgradeEnabled === 'true';
        }

        const savedIsHeliumStorageUpgradeEnabled = localStorage.getItem('isHeliumStorageUpgradeEnabled');
        if (savedIsHeliumStorageUpgradeEnabled !== null) {
            this.isHeliumStorageUpgradeEnabled = savedIsHeliumStorageUpgradeEnabled === 'true';
        }

        const savedIsMiningEfficiencyUpgradeEnabled = localStorage.getItem('isMiningEfficiencyUpgradeEnabled');
        if (savedIsMiningEfficiencyUpgradeEnabled !== null) {
            this.isMiningEfficiencyUpgradeEnabled = savedIsMiningEfficiencyUpgradeEnabled === 'true';
        }

        const savedIsAddtionalMinerUpgradeEnabled = localStorage.getItem('isAddtionalMinerUpgradeEnabled');
        if (savedIsAddtionalMinerUpgradeEnabled !== null) {
            this.isAddtionalMinerUpgradeEnabled = savedIsAddtionalMinerUpgradeEnabled === 'true';
        }



        const savedMiningSpeedLevel = localStorage.getItem('miningSpeedLevel');
        if (savedMiningSpeedLevel !== null) {
            this.miningSpeedLevel = parseInt(savedMiningSpeedLevel);
        }

        const savedHeliumStorageLevel = localStorage.getItem('heliumStorageLevel');
        if (savedHeliumStorageLevel !== null) {
            this.heliumStorageLevel = parseInt(savedHeliumStorageLevel);
        }

        const savedMiningEfficiencyLevel = localStorage.getItem('miningEfficiencyLevel');
        if (savedMiningEfficiencyLevel !== null) {
            this.miningEfficiencyLevel = parseInt(savedMiningEfficiencyLevel);
        }

        const savedAdditionalMinerLevel = localStorage.getItem('additionalMinerLevel');
        if (savedAdditionalMinerLevel !== null) {
            this.additionalMinerLevel = parseInt(savedAdditionalMinerLevel);
        }
    }
    
    // Save progress to local storage
    saveProgress() {
        localStorage.setItem('helium', this.helium);
        localStorage.setItem('currentScene', 'Mining');

        localStorage.setItem('isMiningSpeedUpgradeEnabled', this.isMiningSpeedUpgradeEnabled);
        localStorage.setItem('isHeliumStorageUpgradeEnabled', this.isHeliumStorageUpgradeEnabled);
        localStorage.setItem('isMiningEfficiencyUpgradeEnabled', this.isMiningEfficiencyUpgradeEnabled);
        localStorage.setItem('isAddtionalMinerUpgradeEnabled', this.isAddtionalMinerUpgradeEnabled);

        localStorage.setItem('miningSpeedLevel', this.miningSpeedLevel);
        localStorage.setItem('heliumStorageLevel', this.heliumStorageLevel);
        localStorage.setItem('miningEfficiencyLevel', this.miningEfficiencyLevel);
        localStorage.setItem('additionalMinerLevel', this.additionalMinerLevel);
    }

    UpdateHeliumText() {
        this.heliumText.setText('Helium-3: ' + this.helium + ' / ' + this.GetHeliumStorage());
    }

    // Function to start mining and handle progress bar
    MineHelium() {
        this.isMining = true;
        this.progressBarFill.clear();

        const progressBarTween = this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: this.CalculateMiningTime(),
            ease: 'Linear',
            onUpdate: (tween) => {
                const value = tween.getValue();
                this.progressBarFill.clear();
                this.progressBarFill.fillStyle(0xFFFFFF, 1); // Set color to black
                this.progressBarFill.fillRect(SCREEN_WIDTH/2 - this.progressBarWidth/2, SCREEN_HEIGHT/3 + 40, this.progressBarWidth * (value / 100), this.progressBarHeight);
            },
            onComplete: () => {
                this.progressBarFill.clear();
                // this.progressBarFill.fillStyle(0xffffff, 1); // Reset the progress bar to white
                // this.progressBarFill.fillRect(SCREEN_WIDTH/2 - this.progressBarWidth/2, SCREEN_HEIGHT/3 + 40, this.progressBarWidth, this.progressBarHeight);

                this.helium += this.CalculateMiningReturn();
                let heliumStorage = this.GetHeliumStorage();
                if (this.helium > heliumStorage) {
                    this.helium = heliumStorage; 
                }

                this.UpdateHeliumText();

                if (this.helium >= this.heliumTarget) {
                    this.NextScene();
                }
                
                if (this.helium >= this.miningSpeedCosts[1] && !this.isMiningSpeedUpgradeEnabled) {
                    this.isMiningSpeedUpgradeEnabled = true;
                    this.DisplayMiningSpeedUpgrade();
                }

                if (this.helium >= this.heliumStorageCosts[1] && !this.isHeliumStorageUpgradeEnabled) {
                    this.isHeliumStorageUpgradeEnabled = true;
                    this.DisplayHeliumStorageUpgrade();
                }

                if (this.helium >= this.miningEfficiencyCosts[1] && !this.isMiningEfficiencyUpgradeEnabled) {
                    this.isMiningEfficiencyUpgradeEnabled = true;
                    this.DisplayMiningEfficiencyUpgrade();
                }

                if (this.helium >= this.additionalMinerCosts[0] && !this.isAddtionalMinerUpgradeEnabled) {
                    this.isAddtionalMinerUpgradeEnabled = true;
                    this.DisplayAdditionalMinerUpgrade();
                }

                this.saveProgress();
                this.isMining = false;
            }
        });
    }

    // Function to upgrade mining speed
    UpgradeMiningSpeed() {
        if (this.miningSpeedLevel >= this.miningSpeedMaxLevel) {
            return;
        }

        let cost = this.miningSpeedCosts[this.miningSpeedLevel + 1];
        if (this.helium >= cost) {
            this.helium -= cost;
            this.miningSpeedLevel++;
            
            if (this.miningSpeedLevel == this.miningSpeedMaxLevel) {
                // Destroy the existing container if it exists
                this.upgradeContainers["miningSpeed"].destroy();
                this.DisplayMiningSpeedUpgrade();
            } else {
                cost = this.miningSpeedCosts[this.miningSpeedLevel + 1];
                this.miningSpeedLevelText.setText('Level: ' + this.miningSpeedLevel);
                this.miningSpeedCostText.setText('Cost: ' + cost);
    
                // Re-render the upgrade options
                this.DisplayUpgradeOptions('miningSpeed', this.miningSpeedUpgradeBarX, this.miningSpeedUpgradeBarY, this.miningSpeedLevel, this.miningSpeedMaxLevel, this.UpgradeMiningSpeed.bind(this));
            }
        }
        this.UpdateHeliumText();
        this.saveProgress();
    }

    // Function to upgrade helium storage
    UpgradeHeliumStorage() {
        if (this.heliumStorageLevel >= this.heliumStorageMaxLevel) {
            return;
        }

        let cost = this.heliumStorageCosts[this.heliumStorageLevel + 1];
        if (this.helium >= cost) {
            this.helium -= cost;
            this.heliumStorageLevel++;
            
            if (this.heliumStorageLevel == this.heliumStorageMaxLevel) {
                // Destroy the existing container if it exists
                this.upgradeContainers["heliumStorage"].destroy();
                this.DisplayHeliumStorageUpgrade();
            } else {
                cost = this.heliumStorageCosts[this.heliumStorageLevel + 1];
                this.heliumStorageLevelText.setText('Level: ' + this.heliumStorageLevel);
                this.heliumStorageCostText.setText('Cost: ' + cost);
                
                // Re-render the upgrade options
                this.DisplayUpgradeOptions("heliumStorage", this.heliumStorageUpgradeBarX, this.heliumStorageUpgradeBarY, this.heliumStorageLevel, this.heliumStorageMaxLevel, this.UpgradeHeliumStorage.bind(this));
            }
        }
        this.UpdateHeliumText();
        this.saveProgress();
    }

    // Function to upgrade mining efficiency
    UpgradeMiningEfficiency() {
        if (this.miningEfficiencyLevel >= this.miningEfficiencyMaxLevel) {
            return;
        }

        let cost = this.miningEfficiencyCosts[this.miningEfficiencyLevel + 1];
        if (this.helium >= cost) {
            this.helium -= cost;
            this.miningEfficiencyLevel++;
            
            if (this.miningEfficiencyLevel == this.miningEfficiencyMaxLevel) {
                // Destroy the existing container if it exists
                this.upgradeContainers["miningEfficiency"].destroy();
                this.DisplayMiningEfficiencyUpgrade();
            } else {
                cost = this.miningEfficiencyCosts[this.miningEfficiencyLevel + 1];
                this.miningEfficiencyLevelText.setText('Level: ' + this.miningEfficiencyLevel);
                this.miningEfficiencyCostText.setText('Cost: ' + cost);
                
                // Re-render the upgrade options
                this.DisplayUpgradeOptions('miningEfficiency', this.miningEfficiencyUpgradeBarX, this.miningEfficiencyUpgradeBarY, this.miningEfficiencyLevel, this.miningEfficiencyMaxLevel, this.UpgradeMiningEfficiency.bind(this));
            }
        }

        this.UpdateHeliumText();
        this.saveProgress();
    }

    // Function to upgrade additional miner
    UpgradeAdditionalMiner() {
        if (this.additionalMinerLevel >= this.additionalMinerMaxLevel) {
            return;
        }

        let cost = this.additionalMinerCosts[this.additionalMinerLevel + 1];
        if (this.helium >= cost) {
            this.helium -= cost;
            this.additionalMinerLevel++;

            if (this.additionalMinerLevel == this.additionalMinerMaxLevel) {
                // Destroy the existing container if it exists
                this.upgradeContainers["additionalMiner"].destroy();
                this.DisplayAdditionalMinerUpgrade();
            } else {
                cost = this.additionalMinerCosts[this.additionalMinerLevel + 1];
                this.additionalMinerLevelText.setText('Level: ' + this.additionalMinerLevel);
                this.additionalMinerCostText.setText('Cost: ' + cost);
                
                // Re-render the upgrade options
                this.DisplayUpgradeOptions('additionalMiner', this.additionalMinerUpgradeBarX, this.additionalMinerUpgradeBarY, this.additionalMinerLevel, this.additionalMinerMaxLevel, this.UpgradeAdditionalMiner.bind(this));
            }
        }

        this.UpdateHeliumText();
        this.saveProgress();
    }

    // Function to display upgrade options inside a container
    DisplayUpgradeOptions(key, positionX, positionY, upgradeLevel, upgradeMaxLevel, upgradeFunction) {
        // Destroy the existing container if it exists
        if (this.upgradeBarContainers[key]) {
            this.upgradeBarContainers[key].destroy();
        }

        // Create a container for the upgrade display elements
        let upgradeBarContainers = this.add.container(positionX, positionY);
        this.upgradeBarContainers[key] = upgradeBarContainers; // Store the container with the unique key
        
        // Display total upgrades purchased as circles and squares
        let circleRadius = 5;
        let squareSize = 12;
        let spacing = 15;
        
        for (let i = 0; i < upgradeMaxLevel; i++) {
            if (i <= upgradeLevel - 1) {
                // Draw larger black square
                let square = this.add.rectangle(i * spacing + 5, 5, squareSize, squareSize, 0xFFFFFF);
                upgradeBarContainers.add(square);
            } else {
                // Draw small dark grey circle
                let circle = this.add.circle(i * spacing + 5, 5, circleRadius, 0xBBBBBB);
                upgradeBarContainers.add(circle);
            }
        }
        
        if (upgradeLevel < upgradeMaxLevel) {
            // Calculate the position for the plus button
            let plusButtonX = upgradeMaxLevel * spacing;
            let plusButtonY = 0;
            
            // Create the plus button to purchase the upgrade
            let plusButton = this.add.text(plusButtonX + 5, plusButtonY -6, '+',  {
                    fontFamily: "Pixelify Sans",
                    fontSize: 24,
                    color: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 2
                })
                .setInteractive()
                .on('pointerdown', () => {
                    upgradeFunction(); // Call the passed upgrade function
                });

            upgradeBarContainers.add(plusButton);
        }

        this.upgradeContainers[key].add(upgradeBarContainers);
    }

    // Function to display the mining speed upgrade options
    DisplayMiningSpeedUpgrade() {
        // Create a container for the upgrade UI
        this.upgradeContainers["miningSpeed"] = this.add.container(SCREEN_WIDTH/6, SCREEN_HEIGHT/2 - 60);

        // Display upgrade name
        this.miningSpeedText = this.add.text(0, 0, 'Upgrade: Mining Speed', {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["miningSpeed"].add(this.miningSpeedText);

        // Calculate the bottom position of the previous element
        let nextYPosition =  this.miningSpeedText.y + this.miningSpeedText.height + 10;

        // Display upgrade description
        this.miningSpeedDescriptionText = this.add.text(0, nextYPosition, this.miningSpeedDescription, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["miningSpeed"].add(this.miningSpeedDescriptionText);

        // Update the bottom position
        nextYPosition =  this.miningSpeedDescriptionText.y + this.miningSpeedDescriptionText.height + 10;

        // Display upgrade level
        this.miningSpeedLevelText = this.add.text(0,nextYPosition, 'Level: ' + this.miningSpeedLevel, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["miningSpeed"].add(this.miningSpeedLevelText);

        nextYPosition = this.miningSpeedLevelText.y + this.miningSpeedLevelText.height + 10;

        if (this.miningSpeedLevel < this.miningSpeedMaxLevel) {
            let cost = this.miningSpeedCosts[this.miningSpeedLevel + 1];
            
            // Display cost of the next upgrade
            this.miningSpeedCostText = this.add.text(0, nextYPosition, 'Cost: ' + cost, {
                fontFamily: "Pixelify Sans",
                fontSize: 24,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2,
                wordWrap: { width: 300 }
            });
            this.upgradeContainers["miningSpeed"].add(this.miningSpeedCostText);

            nextYPosition = this.miningSpeedCostText.y + this.miningSpeedCostText.height + 10;
        }

        this.miningSpeedUpgradeBarX = 4;
        this.miningSpeedUpgradeBarY = nextYPosition;

        // Display the upgrade options
        this.DisplayUpgradeOptions("miningSpeed", this.miningSpeedUpgradeBarX, this.miningSpeedUpgradeBarY, this.miningSpeedLevel, this.miningSpeedMaxLevel, this.UpgradeMiningSpeed.bind(this));
    }

    
    // Function to display the helium storage upgrade options
    DisplayHeliumStorageUpgrade() {
        // Calculate the position of the container
        let ContainerPositionY = this.upgradeContainers["miningSpeed"].getBounds().bottom  + 70;
        let ContainerPositionX = this.upgradeContainers["miningSpeed"].getBounds().left;

        // Create a container for the upgrade UI
        this.upgradeContainers["heliumStorage"] = this.add.container(ContainerPositionX, ContainerPositionY);

        // Display upgrade name
        this.heliumStorageText = this.add.text(0, 0, 'Upgrade: Helium Storage', {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["heliumStorage"].add(this.heliumStorageText);

        // Calculate the bottom position of the previous element
        let nextYPosition =  this.heliumStorageText.y + this.heliumStorageText.height + 10;

        // Display upgrade description
        this.heliumStorageDescriptionText = this.add.text(0, nextYPosition, this.heliumStorageDescription, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["heliumStorage"].add(this.heliumStorageDescriptionText);

        // Update the bottom position
        nextYPosition =  this.heliumStorageDescriptionText.y + this.heliumStorageDescriptionText.height + 10;

        // Display upgrade level
        this.heliumStorageLevelText = this.add.text(0,nextYPosition, 'Level: ' + this.heliumStorageLevel, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["heliumStorage"].add(this.heliumStorageLevelText);

        nextYPosition = this.heliumStorageLevelText.y + this.heliumStorageLevelText.height + 10;
        
        if (this.heliumStorageLevel < this.heliumStorageMaxLevel) {
            let cost = this.heliumStorageCosts[this.heliumStorageLevel + 1];
            
            // Display cost of the next upgrade
            this.heliumStorageCostText = this.add.text(0, nextYPosition, 'Cost: ' + cost, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
            this.upgradeContainers["heliumStorage"].add(this.heliumStorageCostText);

            nextYPosition = this.heliumStorageCostText.y + this.heliumStorageCostText.height + 10;
        }
        
        this.heliumStorageUpgradeBarX = 0;
        this.heliumStorageUpgradeBarY = nextYPosition;

        // Display the upgrade options
        this.DisplayUpgradeOptions("heliumStorage", this.heliumStorageUpgradeBarX, this.heliumStorageUpgradeBarY, this.heliumStorageLevel, this.heliumStorageMaxLevel, this.UpgradeHeliumStorage.bind(this));
    }

    // Function to display the mining efficiency upgrade options
    DisplayMiningEfficiencyUpgrade() {
        // Calculate the position of the container
        let ContainerPositionY = this.upgradeContainers["miningSpeed"].getBounds().top;
        let ContainerPositionX = this.upgradeContainers["miningSpeed"].getBounds().right + 100;

        // Create a container for the upgrade UI
        this.upgradeContainers["miningEfficiency"] = this.add.container(ContainerPositionX, ContainerPositionY);

        // Display upgrade name
        this.miningEfficiencyText = this.add.text(0, 0, 'Upgrade: Mining efficiency', {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["miningEfficiency"].add(this.miningEfficiencyText);

        // Calculate the bottom position of the previous element
        let nextYPosition =  this.miningEfficiencyText.y + this.miningEfficiencyText.height + 10;

        // Display upgrade description
        this.miningEfficiencyDescriptionText = this.add.text(0, nextYPosition, this.miningEfficiencyDescription, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["miningEfficiency"].add(this.miningEfficiencyDescriptionText);

        // Update the bottom position
        nextYPosition =  this.miningEfficiencyDescriptionText.y + this.miningEfficiencyDescriptionText.height + 10;

        // Display upgrade level
        this.miningEfficiencyLevelText = this.add.text(0,nextYPosition, 'Level: ' + this.miningEfficiencyLevel, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["miningEfficiency"].add(this.miningEfficiencyLevelText);

        nextYPosition = this.miningEfficiencyLevelText.y + this.miningEfficiencyLevelText.height + 10;
        
        if (this.miningEfficiencyLevel < this.miningEfficiencyMaxLevel) {
            let cost = this.miningEfficiencyCosts[this.miningEfficiencyLevel + 1];
            
            // Display cost of the next upgrade
            this.miningEfficiencyCostText = this.add.text(0, nextYPosition, 'Cost: ' + cost, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
            this.upgradeContainers["miningEfficiency"].add(this.miningEfficiencyCostText);

            nextYPosition = this.miningEfficiencyCostText.y + this.miningEfficiencyCostText.height + 10;
        }

        this.miningEfficiencyUpgradeBarX = 0;
        this.miningEfficiencyUpgradeBarY = nextYPosition;

        // Display the upgrade options
        this.DisplayUpgradeOptions("miningEfficiency", this.miningEfficiencyUpgradeBarX, this.miningEfficiencyUpgradeBarY, this.miningEfficiencyLevel, this.miningEfficiencyMaxLevel, this.UpgradeMiningEfficiency.bind(this));
    }

    // Function to display the additional miner upgrade options
    DisplayAdditionalMinerUpgrade() {
        // Calculate the position of the container
        let ContainerPositionY = this.upgradeContainers["heliumStorage"].getBounds().top;
        let ContainerPositionX = this.upgradeContainers["miningEfficiency"].getBounds().left;

        // Create a container for the upgrade UI
        this.upgradeContainers["additionalMiner"] = this.add.container(ContainerPositionX, ContainerPositionY);

        // Display upgrade name
        this.additionalMinerText = this.add.text(0, 0, 'Upgrade: Mining Team', {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["additionalMiner"].add(this.additionalMinerText);

        // Calculate the bottom position of the previous element
        let nextYPosition = this.additionalMinerText.y + this.additionalMinerText.height + 10;

        // Display upgrade description
        this.additionalMinerDescriptionText = this.add.text(0, nextYPosition, this.additionalMinerDescription, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["additionalMiner"].add(this.additionalMinerDescriptionText);

        // Update the bottom position
        nextYPosition =  this.additionalMinerDescriptionText.y + this.additionalMinerDescriptionText.height + 10;

        // Display upgrade level
        this.additionalMinerLevelText = this.add.text(0,nextYPosition, 'Level: ' + this.additionalMinerLevel, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
        this.upgradeContainers["additionalMiner"].add(this.additionalMinerLevelText);

        nextYPosition = this.additionalMinerLevelText.y + this.additionalMinerLevelText.height + 10;
        
        if (this.additionalMinerLevel < this.additionalMinerMaxLevel) {
            let cost = this.additionalMinerCosts[this.additionalMinerLevel + 1];
            
            // Display cost of the next upgrade
            this.additionalMinerCostText = this.add.text(0, nextYPosition, 'Cost: ' + cost, {
            fontFamily: "Pixelify Sans",
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 300 }
        });
            this.upgradeContainers["additionalMiner"].add(this.additionalMinerCostText);

            nextYPosition = this.additionalMinerCostText.y + this.additionalMinerCostText.height + 10;
        }

        this.additionalMinerUpgradeBarX = 0;
        this.additionalMinerUpgradeBarY = nextYPosition;

        // Display the upgrade options
        this.DisplayUpgradeOptions("additionalMiner", this.additionalMinerUpgradeBarX, this.additionalMinerUpgradeBarY, this.additionalMinerLevel, this.additionalMinerMaxLevel, this.UpgradeAdditionalMiner.bind(this));
    }

    // Base speed x (Multiplier
    CalculateMiningTime() {
        return this.miningSpeedValues[this.miningSpeedLevel];
    }

    CalculateMiningReturn() {
        let miningReturn = this.miningEfficiencyValues[this.miningEfficiencyLevel]
        for (let i = 1; i < this.additionalMinerLevel; i++) {
            miningReturn *= 2;
        }
        return miningReturn;
    }


    GetHeliumStorage() {
        return this.heliumStorageValues[this.heliumStorageLevel];
    }
    
    NextScene() {
        localStorage.removeItem('helium');
        localStorage.removeItem('isMiningSpeedUpgradeEnabled');
        localStorage.removeItem('isHeliumStorageUpgradeEnabled');
        localStorage.removeItem('isMiningEfficiencyUpgradeEnabled');
        localStorage.removeItem('isAddtionalMinerUpgradeEnabled');
        localStorage.removeItem('miningSpeedLevel');
        localStorage.removeItem('heliumStorageLevel');
        localStorage.removeItem('miningEfficiencyLevel');
        localStorage.removeItem('additionalMinerLevel');

        localStorage.setItem('currentScene', 'Laurel');
        this.scene.start('Laurel');
    }
}
