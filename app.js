// Get the canvas element and its 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// canvas.width = 512;
// canvas.height = 480;
document.body.appendChild(canvas);
// add image links
var backgroundImage = 'images/background.png';
var heroImage = 'images/hero.png';
var monstersImage = 'images/monster.png';
var audioFile = '';


// Set initial hero position
let heroX = 50;
let heroY = canvas.height / 2;

// Set monster variables
let monsterSpeed = 1;
let monsterSize = 20;
let monsters = [];
// Load images and audio
const background = new Image();
background.src = backgroundImage;

const hero = new Image();
herosrc = heroImage;

const monsters = new Image();
monsters.src = monstersImage;

const gameAudio = new Audio(audioFile);
// Set up keyboard input
let keys = {};
window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
});

// Function to create a new monster
function createMonster(x, y, dx, dy) {
    monsters.push({ x, y, dx, dy });
}

// Function to update game objects
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move hero based on keyboard input
    if (keys[38] && heroY > 0) { // Up arrow
        heroY -= 5;
    }
    if (keys[40] && heroY < canvas.height - 30) { // Down arrow
        heroY += 5;
    }

    // Draw hero
    ctx.fillStyle = 'blue';
    ctx.fillRect(heroX, heroY, 20, 30);

    // Move and draw monsters
    for (let i = 0; i < monsters.length; i++) {
        monsters[i].x += monsters[i].dx * monsterSpeed;
        monsters[i].y += monsters[i].dy * monsterSpeed;

        // Draw monster
        ctx.fillStyle = 'red';
        ctx.fillRect(monsters[i].x, monsters[i].y, monsterSize, monsterSize);
    }

    // Request next frame
    requestAnimationFrame(update);
}

// Create monsters coming from all four directions
createMonster(0, canvas.height / 2, 1, 0); // From left to right
createMonster(canvas.width, canvas.height / 2, -1, 0); // From right to left
createMonster(canvas.width / 2, 0, 0, 1); // From top to bottom
createMonster(canvas.width / 2, canvas.height, 0, -1); // From bottom to top

// Start the game loop
update();
