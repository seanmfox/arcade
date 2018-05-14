// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.enemyLoop = function() {
        this.x = -100;
        const startRow = [60, 145, 230];
        this.y =  startRow[Math.floor(Math.random() * Math.floor(3))];
        this.speedRate = Math.floor(Math.random() * Math.floor(300)) + 100;
    };
    this.enemyLoop();
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// Control speed of enemies and reset if edge of screen reached
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

// Player object structure
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.wins = 0;
    this.winGame = function() {
        this.wins += 1;
        this.y = 400;
    };
};

// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
// Determine if player collided with enemies
    allEnemies.forEach(function(enemy) {
        if (enemy.y === this.y && this.x > (enemy.x - 75) && this.x < (enemy.x + 75)) {
            this.y = 400;
            this.wins = 0;
        }
    }, this);
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update player position based on key input
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y === 60) {
                this.winGame();
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

// Instantiate objects
const player = new Player();
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Listener for key press
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});