window.addEventListener('load', function(){
    const canvas = document.getElementById('canvasThankYou');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(ctx);
    
   class Particle {
      constructor(){

      }
      draw(){

      }
      update(){

      }
   }

   class Effect {
      constructor(context, canvasWidth, canvasHeight){
         this.context = context;
         this.canvasWidth = canvasWidth;
         this.canvasHeight = canvasHeight;
         this.textX = this.canvasWidth/2;
         this.textY = this.canvasHeight/2;
         this.fontSize = 100;
         this.lineHeight = this.fontSize * 0.8;
         this.maxTextWidth = this.canvasWidth * 0.3;

      }
      wrapText(text){
         const gradient = this.context.createLinearGradient(0, 0, canvas.width, canvas.height);
         gradient.addColorStop(0.4, 'green');
         gradient.addColorStop(0.5, 'gold');
         gradient.addColorStop(0.6, 'green');
         this.context.fillStyle = gradient;
         this.context.textAlign = 'center';
         this.context.textBaseline = 'middle';
         this.context.lineWidth = 1;
         this.context.strokeStyle = 'gold';
         this.context.font = this.fontSize + 'px Courier';

         // break text to new line
         let linesArray = [];
         let lineCounter = 0;
         let line = '';
         let words = text.split(' ');
         for (let i = 0; i < words.length; i++){
            let testLine = line + words[i] + ' ';
            if (this.context.measureText(testLine).width > this.maxTextWidth){
               line = words[i] + ' ';
               lineCounter++;
            } else {
               line = testLine;
            }
            linesArray[lineCounter] = line;
         }  
         let textHeight =  this.lineHeight * lineCounter;
         this.textY = canvas.height/2 - textHeight/2;
         linesArray.forEach((el, index) => {
            this.context.fillText(el, this.textX, this.textY);
            this.context.strokeText(el, this.textX, this.textY);
         });
         console.log(linesArray);
      }
      convertToParticales(){

      }
      render(){

      }
   }

   const effect = new Effect(ctx, canvas.width, canvas.height);
   effect.wrapText('Thanks!!! Your message has been sent!');
   console.log(effect);

   function animate(){

   }
















    /*
    //const text = 'Thank You!!! Your message has been sent!';
    //const textX = canvas.width/2;
    //const textY = canvas.height/2;
    ctx.lineWidth = 2;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.5, 'gold');
    gradient.addColorStop(0.6, 'green');
    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'gold';
    ctx.font = '80px Courier';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    //ctx.fillText(text, textX, textY);
    //ctx.strokeText(text, textX, textY);

    const maxTextWidth = canvas.width * 0.3;
    const lineHeight = 80;

    // If FONT SIZE is changed, change in fillText too.
   function wrapText(text){
      let linesArray = [];
      let lineCounter = 0;
      let line = '';
      let words = text.split(' ');
      for (let i = 0; i < words.length; i++){
         let testLine = line + words[i] + ' ';
         if (ctx.measureText(testLine).width > maxTextWidth){
            line = words[i] + ' ';
            lineCounter++;
         } else {
            line = testLine;
         }
         linesArray[lineCounter] = line;
      }  
      let textHeight =  lineHeight * lineCounter;
      let textY = canvas.height/2 - textHeight/2;
      linesArray.forEach((el, index) => {
         ctx.fillText(el, canvas.width/2, 300 + index * 100);
      });
      console.log(linesArray);
   }

    wrapText('Thanks!!! Your message has been sent!');
*/
});


/////////////////////////////////////////////////////////
/*
let particleArray = [];
adjustX = 20;
adjustY = 0;

// handle mouse
const mouse = {
   x: null,
   y: null,
   radius: 150
}

window.addEventListener('mousemove', function(event){
   mouse.x = event.x;
   mouse.y = event.y;
}); 

ctx.fillStyle = 'green';
ctx.font = '20px Courier New';
ctx.fillText('MARSHA JELLEFF', 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 300, 100);

class Particle {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 30) + 1;
   }
   draw() {
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
   }
   update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;

      if (distance < mouse.radius) {
         this.x -= directionX;
         this.y -= directionY;
      } else {
         if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx/10;
         }
         if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy/10;
         }
      }
   }
} 
console.log(textCoordinates);
function init() {
   particleArray = [];
   for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
      for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
         if (textCoordinates.data[(y * 4 * textCoordinates.width) + 
         (x * 4) + 3] > 128) {
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            particleArray.push(new Particle(positionX * 8, positionY * 8));
         }
      }
   }
}
init ();
console.log(particleArray);

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
   }
   connect();
   requestAnimationFrame(animate);
}
animate();

function connect() {
   for (let a = 0; a < particleArray.length; a++) {
      for (let b = 0; b < particleArray.length; b++) {
         let dx = particleArray[a].x - particleArray[b].x;
         let dy = particleArray[a].y - particleArray[b].y;
         let distance = Math.sqrt(dx * dx + dy * dy);

         if (distance < 17) {
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
         } 
      }
   }
}
*/

//-----------Notes------------------------------
// Speed can be changed by adjust density
// Mouse radius is under mouse const
// Change Snap back speed at update else 
// Change number of particles in init() for loop i
// Random distribution particles in init():
//    for (let i = 0; i < 1000; i++) {
//      let x = Math.random() * canvas.width;
//      let y = Math.random() * canvas.height;
//      particleArray.push(new Particle(x, y));
//   }
// Check original image for opacity on alpha rgba info:
//  if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128)
// the 4 skip through to the alphas, the 128 excludes less than 50% opacity


// Canvas is transparent, background color comes from html

// To Change SPREAD OF PARTICLES from init(): 
// particleArray.push(new Particle(positionX * 10, positionY * 10)); // change // 
//    multiplier
         
// To REPOSITION TEXT:
// adjustX and adjustY in init() and global variable declaration section
// ctx.fillText('text', x, y, maxWidth);
// ctx.strokeText('text', x, y, maxWidth);
// Size adjusted via ctx.font = '50px Arial'
// Text Wrap via: measureText("text");

// To Change Opacity of Lines during mouse event, see tutorial at 54:46
// https://www.youtube.com/watch?
//   v=XGioNBHrFU4&list=TLPQMTYxMTIwMjJVYOzTrlexuA&index=3&ab_channel=Frankslaboratory

// CANVAS SIZE:
// Canvas element has two independent sizes that need to be 
// synchronised, else distorted.
// Setting with CSS only, effects just the element size,
// which will stretch the drawing surface size and distort
// Better to set using canvas.width to set both 
// element size and drawing surface size to same value.


// 
// 
// 

// 
// 
// 

// 
