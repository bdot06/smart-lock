/*------------------- Smart Lock Top Page ----------------------------------*/


$(document).ready(function() {

$('#logoutButton').click(function(){
	window.location.href = '/';
});

$('#unlockButton').click(function() {
  $.get("https://triggers.losant.com/webhooks/113bNMbmlJFkX8dxQ1eqtoxn5OY8");
  alert('you unlocked the door');

});

$('#lockButton').click(function() {
  $.get("https://triggers.losant.com/webhooks/q1NLymxr3kh1K34EMYWMFZnVVj2P");
  alert('you locked the door');

});

});


/*------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
/*-------------------------Registration Page---------------*/
$(document).ready(function() {
$("#logRegButton").click(function() 
{

window.location.href = '/';

});
});



$(document).ready(function() {
$("#regButton").click(function() 

{
var loggedIn = false;
var email = $('#emailRegBox').val();
var password = $('#passwordRegBox').val();
var verified = $('#verifyBox').val();

/*-------------make sure all fields are filled out and passwords match---------*/
if (email == '' || password == '' || verified == '') {
alert("Please fill all fields.");
} else if (!(password).match(verified)) {
alert("Your passwords don't match.");
} else {

/*-------------If everything matches go to login page----------------*/
$('#regForm').click(function(){
alert("Registration Successful!");
sessionStorage.setItem('email', email);
sessionStorage.setItem('password' , password);
window.location.href = '/';
});
};


});


});


/*-------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------*/
/*-------------------login Page-------------------------------*/

$(document).ready(function(){
$("#loginButton").click(function() 
{
var emailLog = $('#emailBox').val();
var passwordLog = $('#passwordBox').val();
var email = sessionStorage.getItem('email');
var password = sessionStorage.getItem('password');

	if ((emailLog == email) && (passwordLog == password)) 
	{
		window.location.href = 'lockTop'
		alert("Login Successful.");
	} else {
		alert("Login Unsuccessful.");
	};
});

$("#createButton").click(function()
{
	window.location.href = 'register';
});
});
