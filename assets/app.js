// initial footballers list
var footballers = ['cristiano ronaldo', 'lionel messi', 'david beckham', 'zlatan ibrahimovic', 'wayne rooney', 'marco reus', 'pele', 'diego costa'];

//create initial footballers buttons
//replace " " with "+" for address 
for (var i = 0; i < footballers.length; i++){
		var b = $('<button>');
		b.addClass('football btn btn-default')
		var footballSpace = footballers[i].replace(/ /g, "+");
		b.attr('data-name', footballSpace);
		b.text(footballers[i]);
		$('#buttonHolder').append(b);
	}


//create buttons
function createBTN (){
	$('#buttonHolder').empty();
	for (var i = 0; i < footballers.length; i++){
		var b = $('<button>');
		b.addClass('football btn btn-default')
		var footballSpace = footballers[i].replace(/ /g, "+");
		b.attr('data-name', footballSpace);
		b.text(footballers[i]);
		$('#buttonHolder').append(b);
	}
}

//on search: push new footballers to array, create new button and clear value
$('#footballSearchBTN').on('click', function(){
	if ($('#footballSearch').val() != ""){
		var footballTXT = $('#footballSearch').val().trim();
		var newFootball = footballTXT.toLowerCase();
		footballers.push(newFootball);
		createBTN();
		$('#footballSearch').val("");
        return false;
	}
});


//send request for gifs
$('#buttonHolder').on('click', '.football', function(){
	$('#gifDiv').empty();
	var footballData = $(this).data('name');
    var footballURL = "http://api.giphy.com/v1/gifs/search?q=" + footballData + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({url: footballURL, method: 'GET'}).done(function(response) {
    	var results = response.data;
//create div
    	for (var i = 0; i < results.length; i++){
    		var footballDiv = $('<div>');
    		footballDiv.addClass('footballHolder');

//get movie images
    		var footballImg = $('<img>');
    		footballImg.addClass('gifClass');
    		footballImg.attr('src', results[i].images.fixed_height.url);
    		footballImg.attr('data-still', results[i].images.fixed_height_still.url);
    		footballImg.attr('data-animate', results[i].images.fixed_height.url);
    		footballImg.attr('data-state', 'animate');
    		footballImg.attr('alt', 'movie gif');
//append elements to movie div
    		
    		footballDiv.append(footballImg);
	    	$('#gifDiv').append(footballDiv);
    	}
//warning message if no gifs exist
    	if(results.length == 0) {
    		$('#gifDiv').append("<p class='warning'>I'm Sorry. No gifs currently exist for this search</p><p class='warning'>Please try another movie<p>");
    	}
    });
//add active class to buttons
    $(this).siblings().removeClass('active1')
    $(this).addClass('active1');
  });

//pause image on click
  $('#gifDiv').on('click', '.gifClass', function(){
  	var state = $(this).attr('data-state'); 
  	if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
	});