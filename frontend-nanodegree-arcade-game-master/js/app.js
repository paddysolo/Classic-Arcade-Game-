// Enemies our player must avoid
var Enemy = function(x, y, roachVelocity) {

    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.roachVelocity = roachVelocity;

    // The image/sprite for our enemies, uses
    // a helper  to easily load images
    this.sprite = 'images/enemy-bug.png';

};

//this Update the enemy's position
Enemy.prototype.update = function(dt) {
    // movement is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.roachVelocity * dt;
    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.roachVelocity = 100 + Math.floor(Math.random() * 222);
    };

    // this Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    }

};

//this  Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// player class
var Player = function(x, y) {
    // Variables for the player to move along x and y axis 
    this.x = x;
    this.y = y;

    //The image of the player is added to the playing field 
    this.player = 'images/char-boy.png';

};

//this Updates the player position
// Player.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};



// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function(keyPress) {

    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    // Enables user on right arrow key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    // Enables user on up arrow key to move upwards on the y axis by 83
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // Enables user on down arrow key to move downwards on the y axis by 83
    // Also enables user not to go off the game tiles on the bottom side
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);
    };
};


var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [63, 147, 230];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});


// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});