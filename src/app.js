var socket = require("./socket_client");
var PIXI = require("pixi.js");
var GameCanvas = require("./GameCanvas");
var Player = require("./Player");

var states = {
	LOBBY: lobby,
	PLAY: play
}
var gameState = states.LOBBY;

function lobby() {
	$("#btnPlay").click(function() {
		var player = new Player();
		gameState = play;
	});
	//hide canvas and show lobby/login screen 
}

function play() {

}

function lobby() {
	//show randow dots playing in the background.... 
}