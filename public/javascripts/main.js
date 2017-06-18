/*------------------- Smart Lock Top Page ----------------------------------*/


$(document).ready(function () {

	$('#logoutButton').click(function () {
		window.location.href = '/';
	});

	$('#unlockButton').click(function () {
		$.get("https://triggers.losant.com/webhooks/113bNMbmlJFkX8dxQ1eqtoxn5OY8", function () {
			alert('you unlocked the door');
		})

	});

	$('#lockButton').click(function () {
		$.get("https://triggers.losant.com/webhooks/q1NLymxr3kh1K34EMYWMFZnVVj2P", function () {
			alert('you locked the door');
		})
	});

});


/*------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
/*-------------------------Registration Page---------------*/
$(document).ready(function () {
	$("#logRegButton").click(function () {

		window.location.href = '/';

	});
});



$(document).ready(function () {
	$("#regButton").click(function (e) {
		e.preventDefault();
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
			$('#regForm').click(function () {
				alert("Registration Successful!");
				$.ajax({
					url: "https://api.mongolab.com/api/1/databases/sltusers/collections/users?apiKey=SbA39GpJFSD38Cr4CL3jX_EefyxW2Rw0",
					data: JSON.stringify({
						"email": email,
						"password": password,
						"verified": verified
					}),
					type: "POST",
					contentType: "application/json",
					success: function (data) {
						window.location.href = '/'
					},
					error: function (xhr, status, err) {
						console.log(err);
					}
				});
			});
		};


	});


});


/*-------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------*/
/*-------------------login Page-------------------------------*/

$(document).ready(function () {
	$("#loginButton").click(function (e) {
		e.preventDefault();
		var email = $('#emailBox').val();
		var password = $('#passwordBox').val();

		$.ajax({
			url: "https://api.mongolab.com/api/1/databases/sltusers/collections/users?apiKey=SbA39GpJFSD38Cr4CL3jX_EefyxW2Rw0",
			data: email,
			type: "GET",
			contentType: "application/json",
			success: function (data) {
				console.log(data)
				if (email == data.email) {
					console.log("true");
				} else {
					console.log("false");
				}
			},
			error: function (xhr, status, err) {
				console.log(err);
			}
		});


	});

	$("#createButton").click(function () {
		window.location.href = 'register';
	});
});
