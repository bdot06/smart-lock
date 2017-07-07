
/*------------------- Smart Lock Top Page ----------------------------------*/


$(document).ready(function () {
	var buttonCount = 0;

	$('#logoutButton').click(function () {
		window.location.href = '/';
	});

	$('#unlockButton').click(function () {
		$.get("/me", function (data) {
			if (buttonCount == 0) {
				$.get(data.unlockWebhook, function () {
					buttonCount = buttonCount + 1;
					alert('you unlocked the door');					
				});
			} else {
				alert('the door is already unlocked');
			}
		})

	});

	$('#lockButton').click(function () {
		if (buttonCount == 1) {
			$.get("/me", function (data) {
				$.get(data.lockWebhook);
				alert('you locked the door');
				buttonCount = 0;
			});
		} else {
			alert('the door is already locked');
		}

	});

});

//----------------------------Login Page---------------------------------------
$(document).ready(function () {
	$('#createButton').click(function () {
		window.location.href = '/users/register';
	});
});


//-----------------------------Register Page-------------------------------------

$(document).ready(function () {
	$('#logRegButton').click(function () {
		window.location.href = '/users/login';
	});
}); 
