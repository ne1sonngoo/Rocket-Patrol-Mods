class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.sfxShot = scene.sound.add('sfx-shot');
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
    }

    update() {
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true;
            this.sfxShot.play();
            this.isFired = true;  // Set isFired to true when rocket is fired
            this.fire(this.x, this.y);  // Call fire method
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        if (this.y < borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.scene.addTime(-5);
            this.y = game.config.height - borderUISize - borderPadding;
        }

        // If the rocket is fired, allow the player to control its movement
        if (this.isFired) {
            if (keyLEFT.isDown) {
                this.x -= 5; // Move left
            } else if (keyRIGHT.isDown) {
                this.x += 5; // Move right
            }

            // Ensure the rocket stays within the game boundaries
            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > game.config.width) {
                this.x = game.config.width;
            }
        }
    }

    fire(x, y) {
        // Fire the rocket and allow control
        this.setPosition(x, y);
        this.isFired = true;
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
