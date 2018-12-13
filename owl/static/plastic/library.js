$(document).ready(function(){

	let library = [];

	const get_song_dom = function(song) {

		return $('<div></div>')
			.addClass("col-3")
			.addClass("song")
			.append($('<img/>')
				.attr({'src': 'https://via.placeholder.com/200x150'})
				.addClass('img-thumbnail'))
			.append($('<h5></h5>')
				.text(song.title))
			.append($('<p></p>')
				.text(song.artist));
	};

	const get_all_songs = function(callback) {

		$.getJSON('api/songs', function(data) {
			library = data;
			populate_library_doms();
			if(callback) callback();
		});
	};

	const populate_library_doms = function() {
		const $content = $('div#content');

		$.each(library, function(index, song) {
			$content.append(get_song_dom(song));
		});
	}

	get_all_songs();

});