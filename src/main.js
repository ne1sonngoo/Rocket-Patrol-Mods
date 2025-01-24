/*
Nelson Ngo
Rocket Patrol 
Hrs
For 1 pt: BGM | Increased spd after 30 secs | Randomize spaceship | movement Rocket control | new scrolling tile sprite background | added fire ui (6 pts total)
For 3 pts: Added time remaining | parallax scrolling | added new title screen (9 pts total)
For 5 pts added/subract timer when hit or miss (5 pts total)
*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)
// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT