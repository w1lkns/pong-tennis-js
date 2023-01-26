// init important variables
let loop;
let highscore,scorePlayer1,scorePlayer2;
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

// init score

scorePlayer1 = 0;
scorePlayer2 = 0;
highscore = 10;

function drawScorePlayer1() {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "#FFF";
    ctx.fillText(`${scorePlayer1}`, (canvas.width/2) - 130, 120);
  }

  function drawScorePlayer2() {
    ctx.font = "100px Verdana";
    ctx.fillStyle = "#FFF";
    ctx.fillText(`${scorePlayer2}`, (canvas.width/2) + 60, 120);
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
    }
    player2 = {
        width:20,
        height:100,
        offset:70,
        x:canvas.width - 30,
        y:(canvas.height / 2)-50,
        speed: 10,
        color: '#fff',
    }
    ball = {
        size:18,
        x:(canvas.width / 2),
        y:(canvas.height / 2),
        xv:10,
        yv:10,
        color: '#fff',
    }
}

function update() {
    moveBall(); 
    move();
    movePlayer(player2); 
    hitPlayer(player1);
    hitPlayer(player2);
    
    // stopGame after 10 points - Will uncomment when finish
    if (scorePlayer1 == highscore){
        let winner1 = document.getElementById('winner')
        winner1.innerHTML = "Player 1 Wins"
        stopGame();
       
    } else if (scorePlayer2 == highscore){
        let winner2 = document.getElementById('winner')
        winner2.innerHTML = "Player 2 Wins"
        stopGame();
    }
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

    scorePlayer1 = 0;
    scorePlayer2 = 0;
    ball.xv = 8;
    ball.yv = 8;
}

// collisions

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
    }
}