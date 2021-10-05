/* $(document).ready(function () {
    var windowHeight = $(window).height(),
        gridTop = windowHeight * .1,
        gridBottom = windowHeight * .4;
    $(window).on('scroll', function () {
        $('.buying-items').each(function () {
            var thisTop = $(this).offset().top - $(window).scrollTop();

            if (thisTop > gridTop && (thisTop + $(this).height()) < gridBottom) {
                $(this).addClass("pulse-orange-big");
            } else {
                $(this).removeClass("pulse-orange-big");
            }
        });
    });
}); */


$(document).ready(function () {
    $(window).on('scroll', function () {
        var windowHeight = $(window).height(),
            gridTop = windowHeight * .3,
            gridBottom = windowHeight * .8;
        $('.buying-items').each(function () {
            var thisTop = $(this).offset().top - $(window).scrollTop();
            if (thisTop > gridTop && (thisTop + $(this).height()) < gridBottom) {
                $(this).addClass("pulse-orange-big");
            } else {
                $(this).removeClass("pulse-orange-big");
            }
        });
    });
    $(window).trigger('scroll');
});

