let width = 30;
let apple_idx = 0;
let dir = 1;
let cur_snake = [3, 2, 1];
let score = 0;
let speed = 0.8;
let intervelTime = 200;
let intervel = null;

for (let i = 0; i < 900; i++) {
  let div = document.createElement("div");
  div.className = "block";
  document.querySelector(".grid").appendChild(div);
}

let squares = document.querySelectorAll(".grid div");
let resetButton = document.getElementsByClassName("btnreset");

function startGame() {
  let previousScore = localStorage.getItem("score");
  if (previousScore != null && previousScore != 0) {
    document.querySelector("h4").style.display = "block";
    document.querySelector("h4").innerText =
      "Your Best Score🔥 : " + localStorage.getItem("score");
  } else {
    document.querySelector("h4").style.display = "none";
  }
  cur_snake.forEach((arr) => (squares[arr].className = "snake"));
  document.querySelector("h3").innerText = "Score : " + score;
  intervel = setInterval(() => checkMove(), intervelTime);
  foodGenerator();
}

function checkMove() {
  if (die()) {
    clearInterval(intervel);
    alert("Game Over !! \n Your Score🔥 : " + score);

    let previousScore = localStorage.getItem("score");
    if (previousScore == null || score > previousScore) {
      localStorage.setItem("score", score);
    }
    resetGame();
  } else moveSnake();
}

function moveSnake() {
  let tail = cur_snake.pop();
  squares[tail].className = "block";
  cur_snake.unshift(cur_snake[0] + dir);
  squares[cur_snake[0]].className = "snake";

  eat(tail);
}

function foodGenerator() {
  apple_idx = Math.floor(Math.random() * squares.length);

  while (squares[apple_idx].className == "snake") {
    apple_idx = Math.floor(Math.random() * squares.length);
  }

  squares[apple_idx].className = "apple";
}

function eat(tail) {
  if (Array.from(squares).indexOf(squares[cur_snake[0]]) == apple_idx) {
    squares[tail].className = "snake";
    squares[cur_snake[1]].className = "fooo";
    cur_snake.push(tail);
    score++;
    document.querySelector("h3").innerText = "Score : " + score;
    foodGenerator();
  }
}

function die() {
  for (let i = 1; i < cur_snake.length; i++) {
    if (cur_snake[i] == cur_snake[0]) {
      return true;
    }
  }

  if (
    (Array.from(squares).indexOf(squares[cur_snake[0] + 1]) % width == 0 &&
      dir == 1) ||
    (Array.from(squares).indexOf(squares[cur_snake[0]]) % width == 0 &&
      dir == -1) ||
    (Array.from(squares).indexOf(squares[cur_snake[0]]) < width &&
      dir == -width) ||
    (Array.from(squares).indexOf(squares[cur_snake[0]]) >
      squares.length - width &&
      dir == width)
  ) {
    return true;
  }
}

function handleInput(e) {
  if (e.keyCode == 37 && dir != 1) {
    dir = -1;
  } else if (e.keyCode == 38 && dir != width) {
    dir = -width;
  } else if (e.keyCode == 39 && dir != -1) {
    dir = 1;
  } else if (e.keyCode == 40 && dir != -width) {
    dir = width;
  }
}

function resetGame() {
  window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", handleInput);
});

resetButton[0].addEventListener("click", resetGame);

startGame();
