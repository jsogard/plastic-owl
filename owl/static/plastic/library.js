$(document).ready(function(){

	let LIBRARY = [];
	const STYLE = { LIST: 'LIST', GRID: 'GRID' };
	let POPPER = null;

	const Song = function(json) {
		const _ = function (content) {
			return '<span class=\'td-content\'>' + content + '</span>';
		};

		this.order = _(json.order) + '<span class="glyphicon glyphicon-play-circle" aria-hidden="true"></span>';
		this.title = _(json.title) + '<span class="glyphicon glyphicon-option-vertical float-right" aria-hidden="true"></span>';
		this.artist = _(json.artist);
		this.added = _(json.added);
		this.length = _(json.length);
	}

	// const get_song_dom_list = function(song) {

	// 	return $('<tr></tr>')
	// 		.addClass("song")
	// 		.append($('<td></td>'))
	// 		.append($('<td></td>')
	// 			.text(song.title))
	// 		.append($('<td></td>')
	// 			.text(song.artist))
	// 		.append($('<td></td>')
	// 			.text(0))
	// 		.append($('<td></td>'))
	// 		.append($('<td></td>')
	// 			.text(0))
	// 		;
	// }

	const get_song_dom_grid = function(song) {

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
			$.each(data, function(index, song) {
				LIBRARY.push(new Song(song));
			});
			// LIBRARY = data;
			populate_library_doms(STYLE.LIST);
			if(callback) callback();
		});
	};

	const populate_library_doms = function(style, sort, order) {
		
		$('table#library-table').DataTable({
			data: LIBRARY,
			columns: [
				{ data: 'order' },
				{ data: 'title' },
				{ data: 'artist' },
				{ data: 'added' },
				{ data: 'length' },
			]
		});
	}

	$('.dropdown-menu').hide();
	let SELECTED = null;

	get_all_songs(function callback() {
		const $dropdown = $('.dropdown-menu');
		let popper = null;

		const timeoutHideMenu = function() {
			const timeout = setTimeout(function() {
				$dropdown.hide();
				console.log('dropdown timeout fulfilled');
			}, 50);
			$dropdown.data('timeout', timeout);
			console.log('dropdown timeout started with id ' + timeout);
		};

		const cancelTimeout = function() {
			const timeout = $dropdown.data('timeout');
			clearTimeout(timeout);
			console.log('dropdwon timeout cancelled with id ' + timeout);
		};

		$dropdown.hover(cancelTimeout, function() { cancelTimeout(); timeoutHideMenu(); });

		$('tbody tr').click(function() {
			$('tbody tr.selected').removeClass('selected');
			$(this).addClass('selected');
			console.log('dropdonw shown, selected class put on row');
		}).mouseleave(function() {
			if($(this).hasClass('selected')) {
				cancelTimeout();
				console.log('mouse leave for selected row');
				timeoutHideMenu();
			}
		});

		$('tbody tr td span.glyphicon-option-vertical').click(function() {
			popper = new Popper($(this), $dropdown, {});
			$dropdown.show();
		});

		$('#dropdown > *').click(function() {
			console.log($(this));
			console.log('clicked the dropdown');
			if(popper) popper.destroy();
		})


		// when i click the ellipse, show the menu and set row as selected

		// when i move off of the selected row it sets a timer to fade out the menu $id

		// when i move into the menu it cancels the timer with $id

		// when i move off of the menu it starts the same timer $id


		// const mouseIn = function () {
		// 	if(POPPER) {

		// 		clearTimeout(dropdown.data('timeoutId'));
		// 		console.log('clear timeout: ' + dropdown.data('timeoutId'));
		// 	}
		// }, mouseOut = function () {
		// 	if(POPPER) {

		// 		console.log('mosueout');
		// 		let timeoutId = setTimeout(function() {
		// 			dropdown.hide();
		// 		}, 1000)
		// 		dropdown.data('timeoutId', timeoutId);
		// 		console.log('attach timeout: ' + timeoutId);
		// 	}
		// };


		// $('tbody tr').click(function() {

		// 	if(SELECTED) SELECTED.removeClass('selected');
		// 	SELECTED = $(this);
		// 	$(this).addClass('selected');
		// 	// $(this).mouseIn(mouseIn);
		// 	$(this).mouseleave(mouseOut);
		// })
		
		// $('tbody tr td:nth-child(2) span:not(.td-content)').click(function() {

		// 	POPPER = new Popper(
		// 		this,
		// 		dropdown,
		// 		{ placement: 'auto-end' });
		// 	dropdown.show();
		// });


		// $('.dropdown-menu').mouseleave(mouseOut);
		// $('.dropdown-menu').mouseenter(mouseIn);



	});


});