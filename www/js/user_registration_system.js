// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyAo6vOjhOJCNY4H_5HduJQLfjZeZn369I0",
//     authDomain: "project2-tanks.firebaseapp.com",
//     databaseURL: "https://project2-tanks.firebaseio.com",
//     projectId: "project2-tanks",
//     storageBucket: "project2-tanks.appspot.com",
//     messagingSenderId: "354095197196"
//   };

// firebase.initializeApp(config);

// var database = firebase.database();

// //get user information
// function getUserInfo(){
//   var authUser = Object.keys(window.localStorage)
//     .filter(item => item.startsWith('firebase:authUser'))[0]
//   var user = authUser ? JSON.parse(localStorage.getItem(authUser)) : undefined;
//   return user;
// }

// //write the correct controls for if a user is logged in
// function displayCorrectUserControls(userObj){
//   if(userVar == undefined){
//     console.log('user not logged in');
//     $("#signUpContainer").html('<a data-toggle="modal" data-target="#signUpModal"><span class="glyphicon glyphicon-user"></span> Sign Up</a>');
//     $("#loginContainer").html('<a data-toggle="modal" data-target="#loginModal"><span class="glyphicon glyphicon-log-in"></span> Login</a>');
//     $("#signOutContainer").html("");
//   } else {
//     $("#signUpContainer").html("");
//     $("#loginContainer").html("");
//     $("#signOutContainer").html('<a id="signOutButton"><span class="glyphicon glyphicon-log-out"></span> Sign out</a>');
//   }
// }







//document load operations
$(document).ready(function(){
  //check if user is logged in.
  userVar = getUserInfo();
  displayCorrectUserControls(userVar);
  // console.log(getUserInfo());
})