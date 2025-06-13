// Jogo: Festa Campo e Cidade 🎉🌾🏙️
// Tema: Celebrando a ligação entre o campo e a cidade
// Feito com p5.js

let player;
let foods = [];
let score = 0;
let gameState = "start";
let totalItems = 0;
let maxItems = 20;

function setup() {
  createCanvas(600, 400);
  player = new Player();
  for (let i = 0; i < 5; i++) {
    foods.push(new Food());
  }
}

function draw() {
  background(135, 206, 235); // Céu azul
  drawEnvironment();

  if (gameState === "start") {
    showStartScreen();
  } else if (gameState === "play") {
    player.move();
    player.show();

    for (let food of foods) {
      if (totalItems >= maxItems) {
        gameState = "end";
        break;
      }
      food.move();
      food.show();
      if (player.hits(food)) {
        score++;
        totalItems++;
        food.respawn();
      }
    }

    fill(0);
    textSize(18);
    textAlign(LEFT);
    text("Pontos: " + score + " 🎯", 10, 20);
    text("Coletados: " + totalItems + "/" + maxItems + " 📦", 10, 40);
  } else if (gameState === "end") {
    showEndScreen();
  }
}

function keyPressed() {
  if (gameState === "start") {
    gameState = "play";
  } else if (gameState === "play" && key === 'q') {
    gameState = "end";
  } else if (gameState === "end" && key === 'r') {
    resetGame();
  }
}

function showStartScreen() {
  textAlign(CENTER);
  fill(0);
  textSize(24);
  text("🌾🏙️ Bem-vindo à Festa do Campo e da Cidade! 🎉", width / 2, height / 2 - 40);
  textSize(16);
  text("Use as setas para mover. Pegue os alimentos 🍎🥦🥖", width / 2, height / 2);
  text("Colete até 20 itens 📦. Pressione qualquer tecla para começar!", width / 2, height / 2 + 40);
}

function showEndScreen() {
  textAlign(CENTER);
  fill(0);
  textSize(24);
  text("Fim de jogo! 🛑", width / 2, height / 2 - 30);
  textSize(18);
  text("Pontuação final: " + score + " 🎯", width / 2, height / 2);
  text("Itens coletados: " + totalItems + " 📦", width / 2, height / 2 + 30);
  text("Pressione 'r' para reiniciar 🔄", width / 2, height / 2 + 60);
}

function resetGame() {
  score = 0;
  totalItems = 0;
  foods = [];
  for (let i = 0; i < 5; i++) {
    foods.push(new Food());
  }
  gameState = "start";
}

function drawEnvironment() {
  fill(34, 139, 34);
  rect(0, height * 0.7, width, height * 0.3); // campo 🌾
  fill(200);
  rect(0, 0, width, height * 0.3); // cidade 🏙️
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 30;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    if (keyIsDown(UP_ARROW)) this.y -= 5;
    if (keyIsDown(DOWN_ARROW)) this.y += 5;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show() {
    textAlign(CENTER, CENTER);
    textSize(30);
    text("📦", this.x, this.y);
  }

  hits(food) {
    let d = dist(this.x, this.y, food.x, food.y);
    return d < (this.size + food.size) / 2;
  }
}

class Food {
  constructor() {
    this.respawn();
  }

  move() {
    this.y += this.speed;
    if (this.y > height) this.respawn();
  }

  show() {
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.emoji, this.x, this.y);
  }

  respawn() {
    this.x = random(30, width - 30);
    this.y = random(-100, 0);
    this.size = 30;
    this.speed = random(0.5, 1.5); // Mais devagar
    let foodOptions = ["🍎", "🥦", "🥖"];
    this.emoji = random(foodOptions);
  }
}
