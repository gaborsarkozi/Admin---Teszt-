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


/*   $(document).ready(function () {
    $(window).on('scroll', function () {
        var windowHeightOnScroll = $(window).height(),
            gridTop = windowHeightOnScroll * .3,
            gridBottom = windowHeightOnScroll * .8;
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
}); */

var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // read the link on how above code works
  var findMe = document.querySelectorAll('.buying-items');
  
  window.addEventListener('scroll', function(event) {
  // add event on scroll
  findMe.forEach(element => {
      //for each .thisisatest
      if (isInViewport(element)) {
        //if in Viewport
        element.classList.add("pulse-orange-big");
      }
      else {
        element.classList.remove("pulse-orange-big");
      }
  });
  }, false);