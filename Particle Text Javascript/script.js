const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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

// To Change Opacity of Lines during mouse event, see tutorial at 54:46
// https://www.youtube.com/watch?
//   v=XGioNBHrFU4&list=TLPQMTYxMTIwMjJVYOzTrlexuA&index=3&ab_channel=Frankslaboratory






