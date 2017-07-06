
/*------------------- Smart Lock Top Page ----------------------------------*/


$(document).ready(function () {

	$('#logoutButton').click(function () {
		window.location.href = '/';
	});

	$('#unlockButton').click(function () {
		$.get("/me", function (data) {
			$.get(data.unlockWebhook);
			alert('you unlocked the door');
		})

	});

	$('#lockButton').click(function () {
		$.get("/me", function (data) {
			$.get(data.lockWebhook);
			alert('you locked the door');
		});
	});

});

//----------------------------Login Page---------------------------------------
$(document).ready(function(){
	$('#createButton').click(function(){
		window.location.href = '/users/register';
	});
});


//-----------------------------Register Page-------------------------------------

$(document).ready(function(){
	$('#logRegButton').click(function(){
		window.location.href = '/users/login';
	});
}); 
