// init important variables
let canvas,ctx,loop;
let ball,player1,score;

// define canvas and context
canvas = document.getElementById('game-area')
ctx = canvas.getContext('2d');

// init score

score = 0;

function drawScore() {
    ctx.font = "42px Verdana";
    ctx.fillStyle = "#FFF";
    ctx.fillText(`${score}`, 550, 50);
  }

// red square -> placeholder for player1

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

// middle line

ctx.beginPath();
ctx.moveTo(636,0);
ctx.setLineDash([15, 13]);
ctx.lineTo(640,720);
ctx.lineWidth = 7;
ctx.strokeStyle = '#FFF';
ctx.stroke();
ctx.closePath();

function startGame() {
    console.log('Game is starting! ');
    let start = document.getElementById('game-start')
    let game = document.getElementById('game-area')
    let over = document.getElementById('game-over')
    //diplay none for start game screen
    //display "" for game-area
    start.style.display = 'none'
    game.style.display = 'block'
    over.style.display = 'none'
    // print score
    drawScore();
    // function to start the game
    start();
}

loop = setInterval(() => {
    update();
    render();
}, 1000/60);

function init (){

}

function update() {
    console.log('this will update')
}

function render(){
    console.log('rendering')
}

function stopGame() {
    console.log('Game is stopped!');

    start.style.display = 'none'
    game.style.display = 'none'
    over.style.display = 'block'

    document.getElementById('game-area').style.display = 'none';
    document.getElementById('game-over').style.display = '';
    //display none for game area
    //display "" for game over screen

    // reset values here
    // clear interval
}