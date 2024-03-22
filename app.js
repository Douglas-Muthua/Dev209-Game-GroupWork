// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 828;
canvas.height = 508;
document.body.appendChild(canvas);


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/field.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/wizard.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/snake.png";

//mana image
var manaReady = false;
var manaImage = new Image();
manaImage.onload = function () {
    manaReady = true;
};
manaImage.src = "images/orb.png";



//========================done creating image objects
var soundhit = "sound/hit.wav"; //Game Over sound efx
var pickup = "sound/pickup.wav"; //Game Over sound efx
//Assign audio to soundEfx
var soundEfx = document.getElementById("soundEfx");
var soundEfx2 = document.getElementById("soundEfx2");

// Game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var monster = {
// for this version, the monster does not move, so just and x and y
    speed: 100,
    x: 0,
    y: 0,
    direction_timestamp : 0,
    direction_interval : .5,
    direction : 0

};

var mana ={
    x: 0,
    y: 0

};

var manaCollected =0
var monstersCaught = 0;
var lives =5;


//======================  done with other variables 

// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function monster_movement(monster,delta){
    let get_time = Date.now();
    if(get_time>monster.direction_timestamp + (monster.direction_interval * 1000)){
        // monster.y = delta * (monster.speed  + (Math.random() * (canvas.height - 96)));
        // monster.x =delta * (monster.speed  + (Math.random() * (canvas.width - 96)));


        monster.direction_timestamp = get_time;
        monster.direction = Math.random() * 360;




    }

   
        // monster.y = delta * (monster.speed  + ((canvas.height - 96)));
        // monster.x =delta * (monster.speed  + ( (canvas.width - 96)));
        monster.y += delta * -1 * (monster.speed * Math.sin(deg_to_rad(monster.direction)))
        monster.x += delta * (monster.speed * Math.cos(deg_to_rad(monster.direction)))



        if(monster.y <0 || monster.y > canvas.height || monster.x<0 || monster.x > canvas.width ){
            reset_monster();
        }
        
        



   


}

function deg_to_rad(deg){
return deg * (Math.PI/180)
}

// Update game objects
var update = function (modifier) {
    // monster.y -= monster.speed * Math.floor(Math.random()*10);
    // monster.y += monster.speed * Math.floor(Math.random()*);
    // monster.x -= monster.speed * Math.floor(Math.random()*10);
    // monster.x += monster.speed * Math.floor(Math.random()*10);
    monster_movement(monster,modifier);

    
    // monster.x= math.random() * canvas.width;

    if (38 in keysDown && hero.y > +0) { //  holding up key
        hero.y -= hero.speed * modifier;
        
    }
    if (40 in keysDown && hero.y < canvas.height - ( 32+ 0)) { //  holding down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > (+0)) { // holding left key
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown && hero.x < canvas.width - ( 32+ 0)) { // holding right key
        hero.x += hero.speed * modifier;
    }
    

        // Are they touching?
        if (
            hero.x <= (monster.x + 32)
            && monster.x <= (hero.x + 32)
            && hero.y <= (monster.y + 32)
            && monster.y <= (hero.y + 32)
            
        ) {
            //play when touch
            soundEfx.src = soundhit ;
            soundEfx.play();

            ++monstersCaught; 
            --lives;      // keep track of our “score”
            console.log('got em');
            reset();       // start a new cycle
        }




        if (
            hero.x <= (mana.x + 32)
            && mana.x <= (hero.x + 32)
            && hero.y <= (mana.y + 32)
            && mana.y <= (hero.y + 32)
            
        ) {
            //play when touch
            soundEfx2.src = pickup ;
            soundEfx2.play();

            ++manaCollected;       // keep track of our “score”
            console.log('got em');
            reset();       // start a new cycle
        }
        // monster.x += math.random * monster.speed
        // monster.y += math.random * monster.speed
};





// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        //console.log('here2');
        ctx.drawImage(bgImage, 0, 0);
    }
    
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
        
    }

    if (manaReady) {
        ctx.drawImage(manaImage, mana.x, mana.y);
        
    }

        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("mana collected: " + manaCollected, 32, 32);

        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText("Lives: " + lives, 800, 32);
    

}

// The main game loop
var main = function () {
    
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);

    if ( lives === 0){
        window.alert("you lose");
        lives = 5;
        

        // reset();
        // main();
        console.log(hero);

        

     }
};



// Reset the game when the player catches a monster
var reset = function () {
    hero.x = (canvas.width - ( 32));
    hero.y = (canvas.height - ( 32));

//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge 32 + hedge 32 + char 32 = 96
     mana.x = 32 + (Math.random() * (canvas.width - 96));
     mana.y = 32 + (Math.random() * (canvas.height - 96));
    reset_monster();
};

function reset_monster(){
    monster.x = 32 + (Math.random() * (canvas.width - 96));
    monster.y = 32 + (Math.random() * (canvas.height - 96));
}


// function lose(){
//         if ( lives === 0){
//         window.alert("you lose");
//         lives = 5;
//         // reset();
//         // main();
//         update(delta / 1000);
        
//         }
//}


// Let's play this game!
var then = Date.now();
reset();
main();  // call the main game loop.
