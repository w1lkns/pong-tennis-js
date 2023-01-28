// init important variables
let loop;
let highscore = 10;
let fps = 1000/60;

// define canvas and context
window.onload = function(){
canvas = document.getElementById('game-area')
ctx = canvas.getContext('2d');
}

function startPlaying(){
    init();

    loop = setInterval(() => {
    update();
    render();
        }, fps);
}
// add sound effects

let soundBallPlayer = new Audio('./../media/hitplayersound.mp3');
let soundBallWall = new Audio('./../media/soundBallWall.mp3');
let soundBallPoint = new Audio('./../media/soundBallScore.mp3');



function checkScore(){
    if(player1.score >= highscore){
        let winner1 = document.getElementById('winner')
        winner1.innerHTML = "Player 1 Wins"
        stopGame();
    } else if (player2.score >= highscore){
        let winner2 = document.getElementById('winner')
        winner2.innerHTML = "Player 2 Wins"
        stopGame();
    }
}

function drawScorePlayer1() {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "#FFF";
    ctx.fillText(`${player1.score}`, (canvas.width/2) - 130, 120);
  }

function drawScorePlayer2() {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "#FFF";
    ctx.fillText(`${player2.score}`, (canvas.width/2) + 60, 120);
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

function startGame() {
    let start = document.getElementById('game-start');
    let game = document.getElementById('game-area');
    let over = document.getElementById('game-over');
    
    start.style.display = 'none'
    game.style.display = 'block'
    over.style.display = 'none'
    
    // function to start the game
    startPlaying();
}

function init (){
    player1 = {
        width:20,
        height:100,
        x:10,
        y:(canvas.height / 2)-50,
        speed: 10,
        color: '#fff',
        score: 0,
    }
    player2 = {
        width:20,
        height:100,
        offset:45,
        x:canvas.width - 30,
        y:(canvas.height / 2)-50,
        speed: 10,
        color: '#fff',
        score: 0,
    }
    ball = {
        size:18,
        x:(canvas.width / 2),
        y:(canvas.height / 2),
        xv:7,
        yv:7,
        color: '#fff',
    }
}

function update() {
    moveBall(); 
    move();
    movePlayer(player2); 
    hitPlayer(player1);
    hitPlayer(player2);
    checkScore();
} 

function render(){
    drawRect(0,0,canvas.width,canvas.height,'black')
    drawNet();
    drawScorePlayer1();
    drawScorePlayer2();
    drawRect(player1.x,player1.y,player1.width,player1.height,player1.color);
    drawRect(player2.x,player2.y,player2.width,player2.height,player2.color);
    drawCircle(ball.x,ball.y,ball.size,ball.color)
}

function stopGame() {
    let start = document.getElementById('game-start')
    let game = document.getElementById('game-area')
    let over = document.getElementById('game-over')

    start.style.display = 'none'
    game.style.display = 'none'
    over.style.display = 'block'

    clearInterval(loop);
}

// collisions
function hitPlayer(player){
    let aLeftOfB = (player.x + player.width) < (ball.x);
    let aRightOfB = (player.x) > (ball.x + ball.size);
    let aAboveB = (player.y) > (ball.y + ball.size)
    let aBelowB = (player.y + player.height) < (ball.y);

    // check if any of the above collisions are true
    let collide = !(aLeftOfB || aRightOfB || aAboveB || aBelowB)

    if (collide){
        ball.xv = -ball.xv;
        ball.yv = deltaY(player) * 0.25;
        soundBallPlayer.play();
    }
}