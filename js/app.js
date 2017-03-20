// Enemies our player must avoid
var Enemy = function(x, y, pace) {
    this.x = x;
    this.y = y;
    this.pace = pace;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.pace * dt;
    if (this.x > 504) {
        this.x = 0;
        this.pace = Math.random() * 460 + 10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y, pace) {
    this.x = x;
    this.y = y;
    this.pace = pace;
    this.sprite = 'images/char-princess-girl.png';
};

//reset the player's position once he reaches the water row
Player.prototype.update = function(dt) {
    if (this.y < 30) {
        playerInitialPosition(player);
        alert('You Won! :)');
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//code that keeps our player inside our canvas
Player.prototype.handleInput = function(pressedKey) {

    if ((pressedKey === 'down') && (this.y === 383)) {
        this.y += 0;
    } else if (pressedKey === 'down') {
        this.y += this.pace;
    } else if (pressedKey === 'up') {
        this.y -= this.pace;
    } else if ((pressedKey === 'left') && (this.x < 4)) {
        this.x += 0;
    } else if (pressedKey === 'left') {
        this.x -= this.pace + 20;
    } else if ((pressedKey === 'right') && (this.x > 400)) {
        this.x -= 0;
    } else if (pressedKey === 'right') {
        this.x += this.pace + 20;
    } else if (this.y > 500) {
        this.y = 383;
    }
};


//general function where the player's position is refactored and it corresponds to the middle of the grass section
function playerInitialPosition(obj) {
    obj.x = 202.5;
    obj.y = 383;
}


//fixed value for player movement on the canvas;
var tile_movement = 80;

//checking collisions between enemies and player; the first and third statements check for collision for the enemies on the top row
//while the second and 4th "else if" statements check for collisions between the rest enemies that walk along the last two rows
//the first two statements in the function check for collision in "front" of the enemies while the last two check for it
//behind the enemy(in case the player jumps too soon on a tile behind the enemy)
//code has been found and tweaked from "https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection"

Enemy.prototype.playerRespawn = function() {

    if (player.x > this.x &&
        player.x < this.x + tile_movement &&
        player.y > this.y - 5 &&
        player.y < this.y + 50) {
        playerInitialPosition(player);
    } else if (player.x > this.x &&
        player.x < this.x + tile_movement &&
        player.y > this.y - 5 &&
        player.y < this.y + 0) {
        playerInitialPosition(player);
    } else if (player.x < this.x &&
        player.x > this.x - tile_movement &&
        player.y > this.y - 5 &&
        player.y < this.y + 50) {
        playerInitialPosition(player);
    } else if (player.x < this.x &&
        player.x > this.x - tile_movement &&
        player.y > this.y - 5 &&
        player.y < this.y + 0) {
        playerInitialPosition(player);
    }
};

//instantiating our player with the position and speed(distance) of tile movement upon keypress
var player = new Player(202.5, 383, tile_movement);

//We are creating an array of exact values to position the enemies roughly in the middle of the 3 stone rows on the "y" axis, avoiding the overlapping with the rows when rendering the enemy
var enemyPosition = [60, 145, 225];

//array containing our enemy objects
var allEnemies = [instantiateEnemy(0), instantiateEnemy(1), instantiateEnemy(2)];


//function to refactor the repetitive instantiation for the enemies
function instantiateEnemy(position) {
    return new Enemy(0, enemyPosition[position], Math.random() * 450);
}

// This listens for key presses and sends the keys to our
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        //implementing the keycodes for : "W", "A", "S", "D" movement keys
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'

    };

    player.handleInput(allowedKeys[e.keyCode]);
});