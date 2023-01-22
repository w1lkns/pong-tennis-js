// init important variables
let loop;
let player1;
let ball,score;
let fps = 1000/60;

// define canvas and context
window.onload = function(){
canvas = document.getElementById('game-area')
ctx = canvas.getContext('2d');

init();

loop = setInterval(() => {
    update();
    render();
}, fps);
}

// init score

score = 0;

if (score == 10) stopGame();

function drawScore() {
    ctx.font = "42px Verdana";
    ctx.fillStyle = "#FFF";
    ctx.fillText(`${score}`, 550, 50);
  }

// converting movement into function
let up = false;
let down = false;

function move(){
    if(up) {
        if (player1.y > 10){
        player1.y -= player1.speed;
        } else {
            return;
        }
	}
	if(down) {
        if ((player1.y + player1.height) < canvas.height - 10){
		player1.y += player1.speed;	
        } else {
            return;
        }
	}

    document.onkeydown = function(e) {
        if(e.key == 'ArrowUp') up = true;
        if(e.key == 'ArrowDown') down = true;
    }
    
    document.onkeyup = function(e) {
        if(e.key == 'ArrowUp') up = false;
        if(e.key == 'ArrowDown') down = false;
    }

}

// middle line - refactored as a function
function drawNet(){
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2,0);
    ctx.setLineDash([15, 13]);
    ctx.lineTo(canvas.width / 2,canvas.height);
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#FFF';
    ctx.stroke();
    ctx.closePath();
}
// drawing rectangles refactored as function
function drawRect(x,y,width,height,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
    ctx.fill()
}

// drawing circle

function drawCircle(x,y,size,color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x,y,size,0,Math.PI * 2)
    ctx.fill();
}

/*function startGame() {
    console.warning('Game is starting! ');
    let start = document.getElementById('game-start')
    let game = document.getElementById('game-area')
    let over = document.getElementById('game-over')
    //diplay none for start game screen
    //display "" for game-area
    start.style.display = 'none'
    game.style.display = 'block'
    over.style.display = 'none'
    // print score
    
    // function to start the game
    start();
}*/



function init (){
    player1 = {
        width:15,
        height:100,
        offset:35,
        x:10,
        y:(canvas.height / 2)-50,
        speed: 10,
        color: '#fff',
    }
    ball = {
        size:18,
        x:(canvas.width / 2),
        y:(canvas.height / 2),
        xv:8,
        yv:8,
        color: '#fff',
    }
}

function update() {
    moveBall(); 
    move();
    //movePlayer(player1); 
    hitPlayer(player1);
} 

function render(){
    drawRect(0,0,canvas.width,canvas.height,'black')
    drawNet();
    drawScore();
    drawRect(player1.x,player1.y,player1.width,player1.height,player1.color);
    drawCircle(ball.x,ball.y,ball.size,ball.color)
}

function stopGame() {
    let start = document.getElementById('game-start')
    let game = document.getElementById('game-area')
    let over = document.getElementById('game-over')

    start.style.display = 'none'
    game.style.display = 'none'
    over.style.display = 'block'

    //document.getElementById('game-area').style.display = 'none';
    //document.getElementById('game-over').style.display = '';
    //display none for game area
    //display "" for game over screen

    // reset values here
    // clear interval
}

// Ball movement
function moveBall(){
    ball.x = ball.x + ball.xv;
    ball.y = ball.y + ball.yv;
    // lose point
    if (ball.x <= 0){
        ball.x = (canvas.width/2);
        ball.y = (canvas.height/2);
        ball.xv, ball.yv = 8;
    }
    // bounce top bottom
    if (ball.y >= canvas.height || ball.y <= 0){
        ball.yv = -ball.yv;
    }
    // bounce right
    if (ball.x > canvas.width){
        ball.xv = -ball.xv;
    }
}

// player Move - use for computer
function movePlayer(player){
    let centerY = player.y + player.height / 2;
    if (centerY < ball.y - player.offset){
        player.y += 10;
    } 
    else if (centerY > ball.y + player.offset){
        player.y -=10;
    } 
}

// makes the bounce from the player a bit harder to predict

function deltaY(player){
    return ball.y - (player.y + player.height / 2)
}

function hitPlayer(player){
    let aLeftOfB = (player.x + player.width) < (ball.x);
    let aRightOfB = (player.x) > (ball.x + ball.size);
    let aAboveB = (player.y) > (ball.y + ball.size)
    let aBelowB = (player.y + player.height) < (ball.y);

    // check if any of the above collisions are true
    let collide = !(aLeftOfB || aRightOfB || aAboveB || aBelowB)

    // 
    if (collide){
        ball.xv = -ball.xv;
        ball.yv = deltaY(player) * 0.25;
        //add to score when ball hit
        score++;
    }
}