$(document).ready(function() {
	console.log('this works');
	$("#submit").click(function(event) {
		console.log("js file works");
		event.preventDefault();
	});
});