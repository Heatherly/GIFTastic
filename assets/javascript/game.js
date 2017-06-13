var hp = ["Harry Potter", "Hermione Grainger", "Ronald Weasley", "Wand", "Hogwarts", "Voldemort", "Wizard", "Hippogriff", "Draco Malfoy"]

function renderButtons() {
	$("#imgBtnArea").empty();

	for (var i = 0; i < hp.length; i++) {
		var imgBtn = $("<button>");
		imgBtn.addClass("btn btn-primary hpBtn");
		imgBtn.attr("data-name", hp[i]);
		imgBtn.text(hp[i]);
		$("#imgBtnArea").append(imgBtn)
	}
}

//Add new image button
	$("#add-img").on("click", function(event) {
	event.preventDefault();
	var imgAdd = $("#img-search").val().trim();
	hp.push(imgAdd);
	renderButtons();
    document.getElementById("image-form").reset();
	});

//Call the buttons to display
renderButtons();

//when a HP button is clicked...
$(document).on("click", ".hpBtn", function() {
	$("#displayGIFs").empty();

    var hpGIF = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        hpGIF + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
        	
        	if (results.length === 0) {
        	$("#displayGIFs").html("<p><strong>No GIF results found.</strong></p>")
        	}

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gifDisplay'>");

			var rating = results[i].rating;

            var r = $("<p>").text("Rating: " + rating);
            
            var hpGIFimage = $("<img>");
            hpGIFimage.attr("src", results[i].images.fixed_height_still.url);
            hpGIFimage.attr("data-still", results[i].images.fixed_height_still.url);
            hpGIFimage.attr("data-animate", results[i].images.fixed_height.url);
            hpGIFimage.attr("data-state", "still");
            hpGIFimage.addClass("gif");
        //display ratings and GIFs
            gifDiv.prepend(hpGIFimage);
			gifDiv.prepend(r);
            $("#displayGIFs").prepend(gifDiv);
          }
    //Ability to play and stop GIFs    
    $(document).on("click", ".gif", function() {
    	var state = $(this).attr("data-state");
    	if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate"); //sets data-state to "animate"
	    } else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still"); // sets data-state to "still"
	    	}
   		});
    });
});