var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//Mouse Edit
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initCircle();
})

function Circle(x, y, r, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.draw = ()=>{
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        c.strokeStyle = '#' + this.color;
        c.stroke();
    }

    this.update = ()=>{
        if (this.x+this.r>=innerWidth || this.x-this.r<=0)
            this.dx=-this.dx;
        if (this.y+this.r>=innerHeight || this.y-this.r<=0)
            this.dy=-this.dy;
        this.x+=this.dx;
        this.y+=this.dy;

        //interactive
        if ((mouse.x - this.x <= 100 && mouse.x - this.x >=-100)&&(mouse.y - this.y <= 100 && mouse.y - this.y  >= -100)) {
            if (this.r < 60)
                this.r +=1;
        }
        else if (this.r > 0){
            this.r -=1;
        }

        this.draw();
    }
}

var colorSet = ["CFF5E7", "A0E4CB", "59C1BD", "0D4C92"];

var n = 500;

var circleArr;

function initCircle() {
    circleArr = [];
    for (var i=0; i<n; i++) {
        var x = Math.floor(Math.random()*innerWidth);
        var y = Math.floor(Math.random()*innerHeight);
        var r = 2;
        var dx = (Math.round(Math.random()) * 2 - 1)*(0.5 + Math.random()*0.5);
        var dy = (Math.round(Math.random()) * 2 - 1)*(0.5 + Math.random()*0.5);
        var color = colorSet[Math.floor(Math.random()*4)];
        circleArr.push(new Circle(x, y, r, color, dx, dy))
    }
}

initCircle();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (var i = 0; i< circleArr.length; i++) {
        circleArr[i].update();
    }
}

animate();