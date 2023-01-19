// init important variables
let canvas,ctx,loop;
let ball,player1;

// define canvas and context
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d');


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