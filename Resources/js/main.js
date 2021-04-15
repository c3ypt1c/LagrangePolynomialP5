"use strict";
/** 
 *
 *
 *
 *
 */

let points = [];
let maxPoints = 10;

var circleSize = 20;

let mouseDownOnPoint = false; //index or false
let mouseDraggedLastFrame = false; 

let LagrangeObject = null; 


function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	let recalculateLangrange = false;
	background(220);
	fill(0);

	// reset object when mouse is up
	if(!mouseIsPressed) {
		mouseDownOnPoint = false;
		mouseDraggedLastFrame = false;
	} 

	for (let point = 0; point < points.length; point++) {

		// handle mouse drags
		if(mouseIsPressed) {
			//if there is nothing on point
			if(mouseDownOnPoint === false) {
				//check distance
				if(circleSize >= Math.hypot(points[point].x-mouseX, points[point].y-mouseY)) {
					//get the index
					mouseDownOnPoint = point;
				}
			}
		}

		//update point that was dragged
		if(mouseDownOnPoint === point) {
			points[point].moveTo(mouseX, mouseY);
			recalculateLangrange = true;
		}

		points[point].render();
	}

	//decide if langrange needs to be updated
	if(points.length < 2) {
		recalculateLangrange = false;
		LagrangeObject = null;
	}

	if(recalculateLangrange) {
		LagrangeObject = new Lagrange(points);
	}

	//draw langrange
	if(LagrangeObject != null) {
		push();
		for(let i = 0; i < windowWidth; i++) {
			point(i, LagrangeObject.F(i));
		}
		pop();
	}
}

function mouseClicked() {
	// create point
	if(mouseDownOnPoint === false && points.length < maxPoints) {
		points.push(new Point(mouseX, mouseY));
	}

	// remove point if there is no movement
	if(!mouseDraggedLastFrame && mouseDownOnPoint !== false) {
		points.splice(mouseDownOnPoint, 1);
	}
}

function mouseDragged() {
	mouseDraggedLastFrame = true;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

console.log("main.js loaded");