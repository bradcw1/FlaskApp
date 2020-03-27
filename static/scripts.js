$(function(){

	//On button click change the content inside the paragraph tags
	$("button#test").on("click", function(){

		var $el = $("div#content > p");
		$el.text(Math.random());

	});
	//Clicking the background will change the colour of the navbar title
	$(".bg").on("click", function(){

		var red = Math.floor(Math.random() * 255);
		var green = Math.floor(Math.random() * 255);
		var blue = Math.floor(Math.random() * 255);

	$(".navbar-brand").css("color", "rgb("+red+","+green+","+blue+")");

	});

	//clicking the button named "Get Countries" will call an AJAX function. This function
	//will return the data from the API route "/countries". The resulting data will be printed to
	//the console.

	$("button#countries").on("click", function(){
		$.get("/countries", function(data){
			var parsedData = JSON.parse(data);
			console.log(parsedData);
		});

	});
});

//just a bunch of heckin AJAX calls
$.get("/countries", function(){
		console.log("countries success");
}).fail(function(){
		console.log("countries failure");
});

$.get("/countries/123", function(){
		console.log("countries success");
}).fail(function(){
		console.log("countries failure");
});

$.post("/placeholderPOST", function(){
		console.log("post success");
}).fail(function(){
		console.log("post failure");
});

$.ajax({
    url: '/placeholderDELETE',
    type: 'DELETE',
    success: function() {
        console.log("delete success")
			},
		fail: function() {
				console.log("delete failure")
		}
	});
