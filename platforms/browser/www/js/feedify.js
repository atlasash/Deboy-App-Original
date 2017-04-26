/* Feedify v1.1.2 by Sarah Dayan | https://sarahdayan.github.io/feedify */
(function ($) {

	$.fn.feedify = function(options) {

		var feedify = this;
		var settings = $.extend({
			container: $('#slide2'),
			offset: 0
		}, options);

		settings.container.bind('scroll touchmove load', function(e) {
		//settings.container.scroll(function(e){

			feedify.children('.feedify-item').each(function() {
				var itemHeader       = $(this).find('.feedify-item-header');
				var itemBody         = $(this).find('.feedify-item-body');
				var itemHeaderHeight = itemHeader.outerHeight();
				var viewportOffset   = $(this).position().top - settings.container.scrollTop() + settings.offset;
				var switchPoint      = '-' + ($(this).height() - itemHeaderHeight - settings.offset);

				if (viewportOffset < 0) {
					if (viewportOffset > switchPoint ? true : false) {
						$(this).addClass('fixed').removeClass('bottom');
						itemHeader.css('top', (-viewportOffset)+"px");
					}
					else {
						$(this).removeClass('fixed').addClass('bottom');
					}
					itemBody.css('paddingTop', itemHeaderHeight);
					itemHeader.css('width', feedify.width());
					return;
				}
				else{
					$(this).removeClass('fixed').removeClass('bottom');
					itemBody.css('paddingTop', '0');
					itemHeader.css('width', 'auto');
				}

			});

		});

	};

}(jQuery));
