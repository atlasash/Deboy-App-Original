
/* Feedify v1.1.2 by Sarah Dayan | https://sarahdayan.github.io/feedify */
(function ($) {

	$.fn.feedify = function(options) {

		var feedify = this;
		var settings = $.extend({
			container: $("#sticky"),
			offset: 0
		}, options);

		settings.container.bind('scroll', function(e) {

			feedify.children('.feedify-item').each(function() {
				var itemHeader       = $(this).find('.feedify-item-header');
				var itemBody         = $(this).find('.feedify-item-body');
				var itemHeaderHeight = itemHeader.outerHeight();
				var viewportOffset   = $(this).position().top - settings.container.scrollTop() + settings.offset;
				var switchPoint      = '-' + ($(this).height() - itemHeaderHeight - settings.offset);
				//var headerPoint = settings.container.scrollTop()-(settings.container.scrollTop() + switchPoint + $(this).position().top);
				//var headerPoint = settings.container.scrollTop()-(viewportOffset + switchPoint);

				if (viewportOffset < 0) {
					if (viewportOffset > switchPoint ? true : false) {
						$(this).addClass('fixed').removeClass('bottom');
						itemHeader.css('top', settings.container.scrollTop());
						$("#log").html(itemHeader.position().top);
					}
					else {
						$(this).removeClass('fixed').addClass('bottom');
						itemHeader.css('top', -switchPoint);
						//itemHeader.css('top', headerPoint);
						$("#log").html($(this).position().top);
					}
					$("#log3").html($(this).position().top);
					$("#log2").html(settings.container.scrollTop());
					itemBody.css('paddingTop', itemHeaderHeight);
					itemHeader.css('width', feedify.width());
					return;
				}
				$(this).removeClass('fixed').removeClass('bottom');
				itemBody.css('paddingTop', '0');
				itemHeader.css('width', 'auto');
			});

		});

	};

}(jQuery));
