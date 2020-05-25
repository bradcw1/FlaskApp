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
});

//just a bunch of heckin AJAX calls
// $.get("/countries", function(){
// 		console.log("countries success");
// }).fail(function(){
// 		console.log("countries failure");
// });

// $.get("/countries/test", function(){
// 		console.log("countries success");
// }).fail(function(response){
// 		console.log(response);
// });

// $.post("/placeholderPOST", function(){
// 		console.log("post success");
// }).fail(function(){
// 		console.log("post failure");
// });

// $.ajax({
//     url: '/placeholderDELETE',
//     type: 'DELETE',
//     success: function() {
//         console.log("delete success")
// 			},
// 		fail: function() {
// 				console.log("delete failure")
// 		}
// 	});
