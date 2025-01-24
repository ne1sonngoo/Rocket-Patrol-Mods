class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // Load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceshipfast', 'assets/spaceshipfast.png');
        this.load.image('starfield1', './assets/starfield1.png');
        this.load.image('planets', './assets/planets.png');
        this.load.image('menuBackground', './assets/menu.png'); // Add background image

        // Load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });

        // Load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav');
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav');
        this.load.audio('sfx-shot', './assets/sfx-shot.wav');
        this.load.audio('backgroundmusic', './assets/backgroundmusic.mp3');
    }
    
    create() {
        // Add background image
        this.add.image(0, 0, 'menuBackground').setOrigin(0, 0).setDisplaySize(game.config.width, game.config.height);

        // Animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });

        // Text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        };

        // Add title text
        this.add.text(
            game.config.width / 2,
            game.config.height / 2 - 125,
            'Rocket Patrol',
            { ...menuConfig, fontSize: '48px', fontStyle: 'bold' }
        ).setOrigin(0.5);

        // Add instructions text
        this.add.text(
            game.config.width / 2 - 175,
            game.config.height / 2 + 150,
            'Use \u2190\u2192 arrows to move & F to fire',
            {
                fontFamily: 'Arial',
                fontSize: '18px', 
                color: '#FF4500', 
                align: 'center',
                padding: {
                    top: 10,
                    bottom: 10,
                },
                fixedWidth: 0
            }
        ).setOrigin(0.5);

        // Add mode selection text
        this.add.text(
            game.config.width / 2 + 175,
            game.config.height / 2 + 150,
            'Press \u2190 for Novice or \u2192 for Expert',
            { ...menuConfig, fontSize: '18px', color: '#FFFF00' }
        ).setOrigin(0.5);

        // Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            };
            this.sound.play('sfx-select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            };
            this.sound.play('sfx-select');
            this.scene.start('playScene');
        }
    }
}
