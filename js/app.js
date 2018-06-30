// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -50;
        this.speed = 115 + Math.floor(Math.random() * 222);
    }
    // Set Collision
    if (player.x < this.x + 80 && player.x + 80 > this.x && 
        player.y < this.y + 60 && 60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires a render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-cat-girl.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    // When player crossed
    if (this.y < 0) {
        setTimeout(function() {
            alert('You win!');
        }, 300)
        setTimeout(function() {
            player.x = 202;
            player.y = 405;         
        }, 500);

    }
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyLocation = [63, 147, 230, 313];
//  Position enemies and start at random speed
enemyLocation.forEach(function(y) {
    enemy = new Enemy(0, y, 115 + Math.floor(Math.random() * 222));
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
var player = new Player(202, 405);

// This listens for key presses and sends the keys to 
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
