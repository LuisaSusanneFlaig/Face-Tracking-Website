/*Original Code from https://www.codeproject.com/Articles/5276827/AI-Age-Estimation-in-the-Browser-using-face-api-an*/

const video = document.getElementById('video');
let PredictedAge;
let PredictedGender;
let PredictedGenderProbability;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(startVideo);
 
function startVideo() {
  
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  
  if (navigator.getUserMedia) {
   navigator.getUserMedia({  video: true },
      function(stream) {
         var video = document.querySelector('video');
         video.srcObject = stream;
         video.onloadedmetadata = function(e) {
           video.play();
         };
      },
      function(err) {
         console.log(err.name);
      }
   );
} else {
   document.body.innerText ="getUserMedia not supported";
   console.log("getUserMedia not supported");
  }
}
 
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  canvas.style.position = 'fixed';
  canvas.style.bottom = 0; 
  canvas.style.right = 0;
  canvas.style.zIndex = 1000000;
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const predictions = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
 
    const resizedDetections = faceapi.resizeResults(predictions, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    resizedDetections.forEach(result => {
      const { age, gender, genderProbability } = result;
      new faceapi.draw.DrawTextField(
        [
          `${faceapi.round(age, 0)} years`,
          `${gender} (${faceapi.round(genderProbability)})`
        ],
        result.detection.box.bottomRight
      ).draw(canvas);
      PredictedGender = gender;
      PredictedAge = faceapi.round(age, 0);
      PredictedGenderProbability = genderProbability;
      ChangeContent();
    });
  }, 100);
});

function ChangeContent(){
      document.getElementById('prediction').innerHTML = PredictedGender;
let elements = document.getElementsByClassName('toChange');
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = PredictedGender;
    }

let element = document.getElementById('pic02');
if(PredictedAge<40){
	/*Hier lag u.a. der Mini-Vertipper, bei dir war es "scr", muss aber eigentlich "src" sein*/
  element.src="images/pic07.jpg";
}
else{
  element.src="images/pic02.jpg";
}

element = document.getElementById('slogan');
if(PredictedAge<40){
  element.innerHTML="The island of gods awaits you with amazing waves, wild parties, beautiful resorts and populat instagram spots. Our agency helps you to find the best deals for an unforgetable time on Bali!";
}
else{
  element.innerHTML="The indonesian island on the vulcanic archipelo avaits its visitors with stunning views, exotic tasts and a rich history. Our agency wants you to get the most of it.";
}
/*Hier war nur das "let" zu viel, mit dem sagst du dem Algorithmus, dass es eine neue Variable ist, aber eigentlich übeschreibst du sie ja nur, deswegen hat er gemeckert */ 
 element = document.getElementById('text01');
if(PredictedAge<40){
  element.innerHTML="Dancing under the stars, beside the waves. Get a ticket for an unforgetable beachparty at a famous club in Bali.";
}
else{
  element.innerHTML="Tracking tours through rice teraces and to temples or volcano craters are just a few of the tours that we offer all around the island.";
}

 element = document.getElementById('pic03');
if (PredictedAge<40){
  element.src="images/pic06.jpg";
}
else{
  element.src="images/pic03.jpg";
}

 element = document.getElementById('text02');
if(PredictedAge<40){
  element.innerHTML="Join our Instagram spot tour. Awesome fotos at waterfalls and jungleswings are guaranteed.";
}
else{
  element.innerHTML="The dominant religion on Bali is Hinduism. Join a festive celebration with locals get in touch with the culture and its people.";
}

 element = document.getElementById('pic04');
if(PredictedAge<40){
  element.src="images/pic05.jpg";
}
else {
  element.src="images/pic04.jpg";
}

 element = document.getElementById('text03');
if(PredictedAge<40){
  element.innerHTML="Join a surflesson, surftrip or surfcamp at the best surfing spots around Bali. You can join with every level or experience.";
}
else{
  element.innerHTML="Bali copi is one of the tastiest coffees in the world. We over exlusive tours to the plantages where you can watch the cofee roasting process.";
}

 element = document.getElementById('ue1');
if(PredictedAge<40){
  element.innerHTML="Surfcamps";
}
else{
  element.innerHtml="Balinese Culture";
}

 element = document.getElementById('text04');
if(PredictedAge<40){
  element.innerHTML="We organize surfclassed and camps all around the island for different levels of experience.";
}
else{
  element.innerHTML="Visit famous temples, watch dances, buy traditional clothings and handmade souvenirs.";
}

 element = document.getElementById('text05');
if(PredictedAge<40){
  element.innerHTML="Waterfalls, Secret Partys, Instagram spots and much more. We offer tickets and tours for a lot of activities.";
}
else{
  element.innerHTML="Vulcano Trekking, rice teracce walks, diving tours. We offer different kinds of adventures on Bali.";
}

 element = document.getElementById('text06');
if(PredictedAge<40){
  element.innerHTML="Private pools, spa areas, bars and skateparks. You will find all ot that in our accommodations.";
}
else{
  element.innerHTML="Quiet and lush homestays with stunning views and a variety of services. From massages to private dinning.";
}

 element = document.getElementById('ue4');
if(PredictedAge<40){
  element.innerHTML="Yogacamps";
}
else{
  element.innerHTML="Cooking Workshops";
}

 element = document.getElementById('text07');
if(PredictedAge<40){
  element.innerHTML="We organize yogaclasses and camps all around the island for different levels of experiences.";

}
else{
  element.innerHTML="Learn how to cook local meals with fresh ingredients and exotic spices from a local chef cook.";
}

 element = document.getElementById('slogan');
if(PredictedAge<40){
  element.innerHTML="The island of gods awaits you with amazing waves, wild parties, beautiful resorts and popular instagram spots. Our agency helps you to find the best deals for an unforgetable time on Bali!";
}
else{
  element.innerHTML="The indonesian island on the vulcanic archipelo avaits its visitors with stunning views, exotic tasts and a rich history. Our agency wants you to get the most of it.";
}
}




