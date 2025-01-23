class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, randomDirection) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.randomDirection = randomDirection;  // Correctly assign the random direction
    }

    update() {
        // Move in the random direction based on randomDirection value
        if (this.randomDirection === 0) {
            this.x -= this.moveSpeed; // Move left
        } else {
            this.x += this.moveSpeed; // Move right
        }

        // Reset ship if it goes off screen
        if (this.x < 0 || this.x > game.config.width) {
            this.reset();
        }
    }
    
    reset() {
        // Reset the position to the opposite side of the screen
        if (this.randomDirection === 0) {
            this.x = game.config.width;
        } else {
            this.x = 0;
        }
    }
}
