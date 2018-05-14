// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.enemyLoop = function() {
        this.x = -100;
        const startRow = [60, 145, 230];
        this.y =  startRow[Math.floor(Math.random() * Math.floor(3))];
        this.speedRate = Math.floor(Math.random() * Math.floor(300)) + 100;
    };
    this.enemyLoop();

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) {
        this.enemyLoop();
    } else {
        this.x += this.speedRate * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;

};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    allEnemies.forEach(function(enemy) {
        if (enemy.y === this.y && this.x > (enemy.x - 75) && this.x < (enemy.x + 75)) {
            console.log('Collision!');
            this.y = 400;
        }
    }, this);
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y === 60) {
                console.log("You win!");
                this.y = 400;
            } else {
            this.y -= 85;
            }
            break;
        case 'down':
            if (this.y !== 400) {
                this.y += 85;                
            }
            break;
        case 'left':
            if (this.x !== 0) {
                this.x -= 100;                
            }
            break;
        case 'right':
            if (this.x !== 400) {
                this.x += 100;                
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

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
