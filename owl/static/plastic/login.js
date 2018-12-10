$(document).ready(function() {

	$('form').submit(function(event) {
		event.preventDefault();

		$.post(
			'/login',
			{
				username: $('input[name=username]').val(),
				password: $('input[name=password]').val(),
				csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
			},
			function(result) {
				console.log(result);
				window.location.replace('/'); 
			}
		);

	});

});