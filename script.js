//constants

let inputDir = {x:0, y:0};
const board = document.getElementById('board');
const sc = document.getElementById('scoreBox');
const hi = document.getElementById('hiscoreBox');

const foodSound = new Audio("food.mp3");
const moveSound = new Audio("move.mp3");
const gameOverSound = new Audio("gameover.mp3");
const musicSound = new Audio("music.mp3");

let speed = 4; 
let lastPaintTime = 0;
let snakeArr = [
  {x: 13, y: 15}
]
let food = {x: 6, y: 7};
let score = 0; 
let hiscore = 0;

//game Functions

function main(ctime){
  
  window.requestAnimationFrame(main);
  if((ctime-lastPaintTime)/1000 < 1/speed){
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
} 

function isCollide(snake){
  for(i = 1 ; i < snakeArr.length ; i++){
    if(snake[i].x === snake[0].x && (snake[i].y === snake[0].y )){
      return true;
    }
  }

  if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y <= 0 || snake[0].y >= 18){
    return true;
  }
  return false;
}

function gameEngine(){
  musicSound.play();
  //Part1: Update the snake array and food;
  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x:0, y:0};
    alert('Game Over!!💀, press any key to continue...');
    snakeArr = [{x: 13, y: 15}];
    musicSound.play();
    score = 0;
  }
  //scoreupdate
  sc.innerHTML = `Score: ${score}`;

 let hiscore = localStorage.getItem("hiscore");
 if(hiscore === null){
  let hiscoreVal = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
 }else{
    hiscoreVal = JSON.parse(hiscore);
    hi.innerHTML = `Hi score: ${hiscoreVal}`;
 }
  
 
  
  //if snake eats the food

  if(snakeArr[0].x == food.x && snakeArr[0].y == food.y){
    score+=1;
    if (score>hiscoreVal){
      hiscoreVal = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
    }
    foodSound.play()
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = { x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random()) };

  }

  // Moving the snake: 
  for(i=snakeArr.length-2 ; i>=0 ; i--){
    snakeArr[i+1] = {...snakeArr[i]};
  }
  snakeArr[0].x = snakeArr[0].x + inputDir.x;
  snakeArr[0].y = snakeArr[0].y + inputDir.y;

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
  if (e.key === "Alt" || e.key === "Tab") {
    return; // Ignore Alt and Tab keys
  }
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