//constants

let inputDir = {x:0, y:0};
const board = document.getElementById('board');
const foodSound = new Audio("food.mp3");
const moveSound = new Audio("move.mp3");
const gameOverSound = new Audio("gameover.mp3");
const musicSound = new Audio("music.mp3");
let speed = 2; 
let lastPaintTime = 0;
let snakeArr = [
  {x: 13, y: 15}
]
let food = {x: 6, y: 7};
//game Functions
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime-lastPaintTime)/1000 < 1/speed){
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
} 

function gameEngine(){
  //Part1: Update the snake array and food;

  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x:0, y:0};
    alert('Game Over!!💀, press any key to continue...');
    snakeArr = [{x: 13, y: 15}];
    musicSound.play();
  }
  //Part2: Render it on the screen
  //Display the snake: 

  board.innerHTML = "";
    snakeArr.forEach((e,index) =>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0){
      snakeElement.classList.add('head');
    }else{
      snakeElement.classList.add('snake');
    }
    

    board.appendChild(snakeElement);
  })
  //Display the food: 

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; // Corrected variable name
    foodElement.style.gridColumnStart = food.x; // Corrected variable name
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Main logic starts here

window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{
  inputDir = {x:0, y:1};
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrow Up");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("Arrow Down");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      console.log("Arrow Right");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      console.log("Arrow Left");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
})