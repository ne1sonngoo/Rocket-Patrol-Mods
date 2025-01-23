class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Initialize tile sprite background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // Create green UI background and borders
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // Initialize Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // Add spaceships (x3) with random movement direction
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30, Phaser.Math.Between(0, 1)).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20, Phaser.Math.Between(0, 1)).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10, Phaser.Math.Between(0, 1)).setOrigin(0, 0);

        // Define input keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Background music
        this.music = this.sound.add('backgroundmusic', { loop: true, volume: 0.1 });
        this.music.play();

        // Initialize score
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: { top: 5, bottom: 5 },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // Game over flag
        this.gameOver = false;

        // Game timer
        this.timeLeft = game.settings.gameTimer / 1000; // Convert milliseconds to seconds
        this.timerText = this.add.text(game.config.width - 175, borderUISize + borderPadding * 2, `Time: ${this.timeLeft}`, {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: { top: 5, bottom: 5 }
        });

        // Timer event to update the time
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Timer to increase speed after 30 seconds
        this.timeElapsed = 0;
        this.speedIncreaseTime = 30000; // 30 seconds
    }

    update(time, delta) {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.music.stop();
            this.scene.restart();
        }

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver) {
            this.p1Rocket.update();

            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

            // Increase speed after 30 seconds
            this.timeElapsed += delta;
            if (this.timeElapsed >= this.speedIncreaseTime) {
                this.ship01.increaseSpeed(1);
                this.ship02.increaseSpeed(1); 
                this.ship03.increaseSpeed(1); 
                this.timeElapsed = 0; // Reset the timer
            }
        }

        // Check for collisions with ships and adjust the timer accordingly
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.addTime(5); // Add 5 seconds for hitting spaceship
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.addTime(5); // Add 5 seconds for hitting spaceship
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.addTime(5); // Add 5 seconds for hitting spaceship
        }
    }

    // This function updates the timer every second
    updateTimer() {
        this.timeLeft -= 1; // Subtract 1 second every loop
        this.timerText.setText(`Time: ${this.timeLeft}`);

        // Check if time's up and game over
        if (this.timeLeft <= 0) {
            this.gameOverHandler();
        }
    }

    // Add or subtract time from the timer
    addTime(seconds) {
        this.timeLeft += seconds;
        this.timerText.setText(`Time: ${this.timeLeft}`);
    }
    

    // Handle game over when the time runs out
    gameOverHandler() {
        this.gameOver = true;
        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', {
            fontFamily: 'Courier',
            fontSize: '32px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: { top: 5, bottom: 5 }
        }).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: { top: 5, bottom: 5 }
        }).setOrigin(0.5);
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); // Play explosion animation
        boom.on('animationcomplete', () => { // Callback after animation completes
            ship.reset(); // Reset ship position
            ship.alpha = 1; // Make ship visible again
            boom.destroy(); // Remove explosion sprite
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx-explosion');
    }
}
