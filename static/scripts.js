console.log("Hello world!");

$(function(){

	//On button click change the content inside the paragraph tags
	$("button#test").on("click", function(){

		var $el = $("div#content > p");
		$el.text(Math.random());

	});

	$(".bg").on("click", function(){

		var red = Math.floor(Math.random() * 255);
		var green = Math.floor(Math.random() * 255);
		var blue = Math.floor(Math.random() * 255);

	$(".navbar-brand").css("color", "rgb("+red+","+green+","+blue+")");
	});

});
