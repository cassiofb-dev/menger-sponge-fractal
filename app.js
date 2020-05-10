let width = screen.width, height = screen.height;
let clicked = 0, s = 1;

// Box class

function Box(x, y, z, r) {
	this.pos = createVector(x, y, z);
	this.r = r;

	this.generate = function() {
	let boxes = [];
	for (let x = -1; x < 2; x++) {
		for (let y = -1; y < 2; y++) {
			for (let z = -1; z < 2; z++) {
				let sum = abs(x) + abs(y) + abs(z);
				if (sum > 1) {
					let newR = this.r / 3;
					let b = new Box(
						this.pos.x + x * newR,
						this.pos.y + y * newR,
						this.pos.z + z * newR,
						newR
					);
					boxes.push(b);
				}
			}
		}
	}
	return boxes;
	};

	this.show = function() {
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		box(this.r);
		pop();
	};
}

let sponge = [];

// Processing functions

function setup() {
	createCanvas(width, height, WEBGL);
	normalMaterial();
	let b = new Box(0, 0, 0, (width < height) ? width / 3 : height / 3);
	sponge.push(b);
}

function draw() {
	background(50);
	rotateX(-map(mouseY, 0, height, -PI, PI));
	rotateY(map(mouseX, 0 , width, -PI, PI));
	scale(s);

	for (let i = 0; i < sponge.length; i++) {
		sponge[i].show();
	}
}

// Processing Event functions

function mousePressed() {
	if(clicked > 2) return;
	clicked ++;
	let next = [];
	
	for (let i = 0; i < sponge.length; i++) {
		let b = sponge[i];
		let newBoxes = b.generate();
		next = next.concat(newBoxes);
	}
	sponge = next;
}

function mouseWheel(){
	s *= (event.delta > 0) ? 0.9 : 1.1;
	return false;
}