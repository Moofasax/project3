///////////////////// AUTH LOGIC

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAthBYx_19itvq6uZTEs5q3918PBgoNIcI",
  authDomain: "allears-cc500.firebaseapp.com",
  databaseURL: "https://allears-cc500.firebaseio.com",
  projectId: "allears-cc500",
  storageBucket: "allears-cc500.appspot.com",
  messagingSenderId: "965176498033"
};

firebase.initializeApp(config);
var songName = "";
var grooveRoomName = "";
var database = firebase.database();

//get user information
function getUserInfo(){
	var authUser = Object.keys(window.localStorage)
	  .filter(item => item.startsWith('firebase:authUser'))[0]
	var user = authUser ? JSON.parse(localStorage.getItem(authUser)) : undefined;
	return user;
}

//write the correct controls for if a user is logged in
function displayCorrectUserControls(userObj){
	if(userVar == undefined){
		$("#signUpContainer").html('<a data-toggle="modal" data-target="#signUpModal"><span class="glyphicon glyphicon-user"></span> Sign Up</a>');
		$("#loginContainer").html('<a data-toggle="modal" data-target="#loginModal"><span class="glyphicon glyphicon-log-in"></span> Login</a>');
		$("#signOutContainer").html("");
	} else {
		$("#signUpContainer").html("");
		$("#loginContainer").html("");
		$("#signOutContainer").html('<a id="signOutButton"><span class="glyphicon glyphicon-log-out"></span> Sign out</a>');
	}
}

//document load operations
$(document).ready(function(){
	//check if user is logged in.
	userVar = getUserInfo();
	displayCorrectUserControls(userVar);
	// console.log(getUserInfo());
})


///////////////////// GAME LOGIC

var WIDTH = 1100;
var HEIGHT = 580;
// This IP is hardcoded to my server, replace with your own
var socket = io.connect('localhost:8082');
var game = new Game('#arena', WIDTH, HEIGHT, socket);
var selectedTank = 1;
var tankName = '';

socket.on('addTank', function(tank){
	game.addTank(tank.id, tank.name, tank.type, tank.isLocal, tank.x, tank.y);
});

socket.on('sync', function(gameServerData){
	game.receiveData(gameServerData);
});

socket.on('killTank', function(tankData){
	game.killTank(tankData);
});

socket.on('removeTank', function(tankId){
	game.removeTank(tankId);
});

$(document).ready( function(){

	$('#join').click( function(){
		tankName = $('#tank-name').val();
		joinGame(tankName, selectedTank, socket);
	});

	$('#tank-name').keyup( function(e){
		tankName = $('#tank-name').val();
		var k = e.keyCode || e.which;
		if(k == 13){
			joinGame(tankName, selectedTank, socket);
		}
	});

	$('ul.tank-selection li').click( function(){
		$('.tank-selection li').removeClass('selected')
		$(this).addClass('selected');
		selectedTank = $(this).data('tank');
	});

});

$(window).on('beforeunload', function(){
	socket.emit('leaveGame', tankName);
});

function joinGame(tankName, tankType, socket){
	if(tankName != ''){
		$('#prompt').hide("slow", function(){
			socket.emit('joinGame', {name: tankName, type: tankType});
		});
	}
}
