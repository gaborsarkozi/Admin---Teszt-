$(function(){
	
	let tourOptions = {
		options : {
			
			darkLayerPersistence : true,
			
		},
		tips    : [ {
			title       : '<span class="tour-title-icon">🤘🏼</span>Here we go!',
			description : 'Test the Product Tour JS now, click on the `Next` link to proceed to the next tip and see it in action.',
			image       : "assets/images/tour-1.png",
			selector    : '.heading-icon',
			x           : 50,
			y           : 100,
			offx        : -11,
			offy        : -48,
			position    : 'top',
			onSelected  : false
		}, {
			title       : '<span class="tour-title-icon">👈🏼</span>To the left',
			description : 'You can choose where to place the tour tip, this is a `left` tip.',
			image       : "assets/images/tour-2.png",
			selector    : '.heading-text h1',
			x           : 0,
			y           : 0,
			offx        : -20,
			offy        : 25,
			position    : 'left',
			onSelected  : false
		}, {
			title       : '<span class="tour-title-icon">👉🏼</span>And now to the right',
			description : 'This is a `right` tip, you can set it to the `top` or `bottom` of your element as well.',
			image       : "assets/images/tour-3.png",
			selector    : '.heading-text h1',
			x           : 30,
			y           : 0,
			offx        : -20,
			offy        : 25,
			position    : 'right',
			onSelected  : false
		}, {
			title       : '<span class="tour-title-icon">⌨️</span>You can control it with the keyboard too',
			description : 'Give it a shot! `arrow left` to go to the previous tip, `arrow right` to move to the next one',
			image       : "assets/images/tour-4.jpg",
			selector    : '.heading-text h1',
			x           : 0,
			y           : 0,
			offx        : 57,
			offy        : 50,
			position    : 'bottom',
			onSelected  : false
		}, {
			title       : '<span class="tour-title-icon">🔬</span>Discover more',
			description : 'Here you can access some more info about the features, how to use it and the author.',
			image       : "assets/images/tour-5.png",
			selector    : '.demo-header-menu-item:nth-child(1)',
			x           : 50,
			y           : 20,
			offx        : 0,
			offy        : 0,
			position    : 'top',
			onSelected  : false,
		}, {
			title       : '<span class="tour-title-icon">⌛️️</span>Ok, I\'m done, how to close it?',
			description : 'You can press the `esc` key or click the `x` button (top right) in any moment. Where you are at the last tip there is the `Okay!` button too. Here you can re-start it too :)',
			image       : "assets/images/tour-6.png",
			selector    : '.heading-tour-start',
			x           : 50,
			y           : 100,
			offx        : 0,
			offy        : 0,
			position    : 'bottom',
			onSelected  : () => $('.heading-tour-start').addClass('show')
		} ]
	};
	
	let tour = window.ProductTourJS;
	tour.init(tourOptions);
	
	if ( !window.location.hash ) {
		setTimeout(() =>{
			
			tour.start();
			$(window).one('on-product-tour-js-exit', () => $('.heading-tour-start').addClass('show'));
			
		}, 500);
	} else {
		$('.heading-tour-start').addClass('show');
	}
	
	window.onbeforeunload = function(){
		window.scrollTo(0, 0);
	}
	
});

