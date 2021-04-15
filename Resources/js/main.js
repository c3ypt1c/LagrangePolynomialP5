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

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
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
		}

		points[point].render();
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