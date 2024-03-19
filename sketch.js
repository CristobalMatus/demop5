
let video;
let classifier;
let resultsP;
let modelo = '';

function preload() {
  classifier = ml5.imageClassifier(modelo, modelReady)
  resultsP = createP('loading model andf video...');
}


function setup() {
  createCanvas(640, 640);
  //Create the video 
  video = createCapture(VIDEO);
  video.hide();

  //STEP 2: start clasifying 
}

function draw() {
  background(0);
  image(video, 0, 0);
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {

  resultsP.html(`${results[0].label} ${nf(results[0].confidence, 0, 2)}`);
  classifyVideo();
}