//Rob's github  https://github.com/rbunch-dc/

//create a "submit handler using jQuery"
$(document).ready(function() {
	$('#movie-search-form').submit(function() {
		var movieSearchTerm = $('#movieInput').val();
		//console.log(movieSearchTerm);
		var searchURL = 'http://api.themoviedb.org/3/search/movie?query=' + movieSearchTerm + '&api_key=fec8b5ab27b292a68294261bb21b04a5';
		//AJAX call via jQuery
		$.getJSON(searchURL, function(movieData) {
			var i = 0;
			var resultsLength = movieData.results.length;
			var movieHtml = "";
			for (i = 0; i < resultsLength; i++) {
				var title = movieData.results[i].title;
				var overview = movieData.results[i].overview;
				var posterPath = movieData.results[i].poster_path;
				var releaseDate = movieData.results[i].release_date;

				if (posterPath) {
					movieHtml += '<div class="col-md-3">';
					movieHtml += '<img class="img-thumbnail img-responsive movie"  src="http://image.tmdb.org/t/p/w300' + posterPath + '">';
					movieHtml += '</div>';
				}
				console.log(title + " : " + posterPath);
			}
			$('#now-playing-wrapper').html(movieHtml);

			//console.log(movieHtml);
		});

		event.preventDefault(); //don't let the form submit
	});
});