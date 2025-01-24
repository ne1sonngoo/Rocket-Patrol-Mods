class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.sfxShot = scene.sound.add('sfx-shot');
        scene.add.existing(this);
        this.moveSpeed = 2;

        // Fire text setup
        this.fireText = scene.add.text(
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            "FIRE",
            {
                fontFamily: 'Courier',
                fontSize: '28px',
                color: '#FF0000', // Red text
                align: 'center',
            }
        ).setOrigin(0.5).setVisible(false); // Initially hidden
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
            this.fireText.setVisible(true); 
            this.sfxShot.play();
            this.isFired = true;  
            this.fire(this.x, this.y);  

            this.scene.time.delayedCall(500, () => {
                this.fireText.setVisible(false); 
            });
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        if (this.y < borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.scene.addTime(-5); 
            this.y = game.config.height - borderUISize - borderPadding;
        }

        
        if (this.isFired) {
            if (keyLEFT.isDown) {
                this.x -= 5; 
            } else if (keyRIGHT.isDown) {
                this.x += 5;
            }

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
