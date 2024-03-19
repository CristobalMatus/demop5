let prevX, prevY;
let engine;
let world;
let ball;

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('canvas-container');

  engine = Matter.Engine.create();
  world = engine.world;

  // Crear una pelota en el centro de la pantalla
  ball = new Ball(width / 2, height / 2);

  // Configurar la cámara de video
  video = createCapture(VIDEO);
  video.size(width, height);

  // Inicializar el modelo de detección de manos
  handpose = ml5.handpose(video, modelReady);
  handpose.on('predict', gotPredictions);
}

function modelReady() {
  console.log('Modelo de detección de manos cargado.');
}

function gotPredictions(results) {
  if (results.length > 0) {
    let hand = results[0].landmarks[8]; // 8 representa la punta del dedo índice
    let x = hand[0];
    let y = hand[1];
    prevX = x;
    prevY = y;
    console.log('Punta del dedo índice detectada en:', x, y);
  }
}

function draw() {
  background(0);
  
  // Dibujar la pelota
  ball.show();
  
  // Controlar la pelota con la posición del dedo índice
  if (prevX !== undefined && prevY !== undefined) {
    ball.moveTo(prevX, prevY);
  }

  // Actualizar el motor de física de Matter.js
  Matter.Engine.update(engine);
}

class Ball {
  constructor(x, y) {
    this.body = Matter.Bodies.circle(x, y, 20);
    Matter.World.add(world, this.body);
    this.color = color(255);
  }

  moveTo(x, y) {
    // Mover la pelota hacia la posición del dedo índice
    Matter.Body.setPosition(this.body, { x: x, y: y });
  }

  show() {
    fill(this.color);
    noStroke();
    let pos = this.body.position;
    ellipse(pos.x, pos.y, 40);
  }
}
