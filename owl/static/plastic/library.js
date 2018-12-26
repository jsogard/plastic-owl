$(document).ready(function(){

	let TABLE = null;
	let LIBRARY = [];
	const STYLE = { LIST: 'LIST', GRID: 'GRID' };
	let POPPER = null;

	const Song = function(json) {
		const _ = function (content) {
			return '<span class=\'td-content\'>' + content + '</span>';
		};

		const play_button = '<span class="glyphicon glyphicon-play-circle play-button" aria-hidden="true"></span>';
		const ellipsis = '<span class="glyphicon glyphicon-option-vertical float-right ellipsis" aria-hidden="true"></span>';

		this.order = _(json.order) + play_button;
		this.title = _(json.title) + ellipsis;
		this.artist = _(json.artist);
		this.added = _(json.added);
		this.length = _(json.length);
	}

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
		
		TABLE = $('table#library-table').DataTable({
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

	const play_now = function(callback) {
		callback({ successful: true, message: 'Succeeded to play now' })
	}

	const play_next = function(callback) {
		callback({ successful: false, message: 'Failed to play next' })
	}

	const add_queue = function(callback) {
		callback({ successful: false, message: 'Failed to add to queue' })
	}

	const dropdown_functionality = function($dropdown) {
		let popper = null;
		let $selectedRow = null;

		const timeoutHideMenu = function() {
			const timeout = setTimeout(function() {
				if(popper) $dropdown.hide();
				console.log('dropdown timeout fulfilled');
			}, 500);
			$dropdown.data('timeout', timeout);
		};

		const cancelTimeout = function() {
			const timeout = $dropdown.data('timeout');
			clearTimeout(timeout);
		};

		$('tbody').on('click', 'span.ellipsis', function() {
			// display dropdown on ellipsis click
			popper = new Popper($(this), $dropdown, {});
			$dropdown.show();
		}).on('mouseenter', 'tr', function() {
			// set mouseover row as selected
			$selectedRow = $(this);
			$selectedRow.addClass('selected');
		}).on('mouseleave', 'tr.selected', function() {
			// remove selected row
			$(this).removeClass('selected');
			cancelTimeout();
			timeoutHideMenu();
		});

		$dropdown.on('mouseenter', function() {
			cancelTimeout();
		}).on('mouseleave', function() {
			cancelTimeout();
			timeoutHideMenu();
		})
		.on('click', '.dropdown-item', function() {
			if(popper) $dropdown.hide();
			const data = TABLE.row($selectedRow).data();
			let result = null;

			const callback = function(data) {
				const $toast = $('<div></div>')
						.addClass('alert')
						.addClass(data.successful ? 'alert-success' : 'alert-danger')
						.append(data.message);
				$('#toaster').append($toast);
				setTimeout(function() {
					$toast.fadeOut('slow');
				}, 7000)
			}

			switch($(this).attr('id')){
				case 'play-next':
					result = play_next(callback);
					break;
				case 'play-now':
					result = play_now(callback);
					break;
				case 'add-queue':
					result = add_queue(callback);
					break;
			}


		})

		// $dropdown.hover(cancelTimeout, function() { cancelTimeout(); timeoutHideMenu(); });
	}

	$('.dropdown-menu').hide();

	get_all_songs(function callback() {
		const $dropdown = $('.dropdown-menu');
		
		dropdown_functionality($dropdown);
		

		// $('tbody').on('click', 'tr', function() {
		// 	var data = TABLE.row(this).data();
		// 	alert($(data['title']).text());
		// }).on('click', 'span', function() {

		// })



	});


});