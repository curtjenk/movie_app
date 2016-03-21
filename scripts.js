//Rob's github  https://github.com/rbunch-dc/

function showSearchResults(movieData) {
			var i = 0;
			var resultsLength = movieData.results.length;
			var movieHtml = "";
			for (i = 0; i < resultsLength; i++) {
				var title = movieData.results[i].title;
				//var overview = movieData.results[i].overview;
				var posterPath = movieData.results[i].poster_path;
				//var releaseDate = movieData.results[i].release_date;
				var uniqueId = movieData.results[i].id;

				if (posterPath) {
					movieHtml += '<div class="col-md-3 col-sm-3">';
					movieHtml += '<img data-toggle="modal" data-target="#myModal" class="img-thumbnail img-responsive img-launch-modal movie" id="' + uniqueId + '"  src="http://image.tmdb.org/t/p/w300' + posterPath + '">';
					movieHtml += '</div>';
				}
				//console.log(title + " : " + posterPath);
			}
			$('#now-playing-wrapper').html(movieHtml);
}

//create a "submit handler using jQuery"
$(document).ready(function() {
	$('#movie-search-form').submit(function() {
		var movieSearchTerm = $('#movieInput').val();
		//console.log(movieSearchTerm);
		var searchURL = 'http://api.themoviedb.org/3/search/movie?query=' + movieSearchTerm + '&api_key=fec8b5ab27b292a68294261bb21b04a5';
		//AJAX call via jQuery
		$.getJSON(searchURL, showSearchResults);

		// $.getJSON(searchURL, function(movieData) { showSearchResults(movieData);} );
		// 	// var i = 0;
			// var resultsLength = movieData.results.length;
			// var movieHtml = "";
			// for (i = 0; i < resultsLength; i++) {
			// 	var title = movieData.results[i].title;
			// 	//var overview = movieData.results[i].overview;
			// 	var posterPath = movieData.results[i].poster_path;
			// 	//var releaseDate = movieData.results[i].release_date;
			// 	var uniqueId = movieData.results[i].id;

			// 	if (posterPath) {
			// 		movieHtml += '<div class="col-md-3 col-sm-3">';
			// 		movieHtml += '<img data-toggle="modal" data-target="#myModal" class="img-thumbnail img-responsive img-launch-modal movie" id="' + uniqueId + '"  src="http://image.tmdb.org/t/p/w300' + posterPath + '">';
			// 		movieHtml += '</div>';
			// 	}
			// 	//console.log(title + " : " + posterPath);
			// }
			// $('#now-playing-wrapper').html(movieHtml);

			//console.log(movieHtml);
		// });

		event.preventDefault(); //don't let the form submit
	});

	$('#now-playing-wrapper').on('click', 'div > img', function() {

		var currImageId = $(this).attr('id');
		var infoURL = 'http://api.themoviedb.org/3/movie/' + currImageId + '?&api_key=fec8b5ab27b292a68294261bb21b04a5';
		var reviewURL = 'http://api.themoviedb.org/3/movie/' + currImageId + '/reviews?&api_key=fec8b5ab27b292a68294261bb21b04a5';

		//Get the info on the selected/clicked movie
		$.getJSON(infoURL, function(movieData) {
			console.log(movieData);
			$('.modal-title').html(movieData.title);
			var releaseDate = movieData.release_date;
			var overview = movieData.overview;
			var movieHtml = "";
			movieHtml = '<h4>Released</h4>';
			movieHtml += '<p class="indent">' + releaseDate + '</p>';
			if (overview) {
				movieHtml += '<h4>Overview</h4>';
				movieHtml += '<p class="indent">' + overview + '</p>';
			}
			$('.modal-body').html(movieHtml);
		});
		//Now retrieve movie reviews
		$.getJSON(reviewURL, function(movieData) {
			if (movieData.results.length > 0) {
				$('.modal-body').append('<h4>Reviews</h4>');
			}
			for (var i = 0; i < movieData.results.length; i++) {
				$('.modal-body').append('<p style="font: italic bold 12px/30px Georgia, serif;">' + movieData.results[i].author + '</p>');
				$('.modal-body').append('<p  class="indent">' + movieData.results[i].content + '</p>');
			}
		});
	});

});