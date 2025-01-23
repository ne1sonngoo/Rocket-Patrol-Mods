/*
Nelson Ngo
Rocket Patrol 
Hrs
For 1 pt: BGM | Increased spd after 30 secs | Randomize spaceship | movement Rocket control | Added time remaining (5 pts total)
For 5 pts added/subract timer when hit or miss
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