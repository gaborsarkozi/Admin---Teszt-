$(document).ready(function(){
    $('.floatingButton').on('click',
        function(e){
            e.preventDefault();
            $(this).toggleClass('open');
            if($(this).children('.fa').hasClass('fa-plus'))
            {
                $(this).children('.fa').removeClass('fa-plus');
                $(this).children('.fa').addClass('fa-close');
            } 
            else if ($(this).children('.fa').hasClass('fa-close')) 
            {
                $(this).children('.fa').removeClass('fa-close');
                $(this).children('.fa').addClass('fa-plus');
            }
            $('.floatingMenu').stop().slideToggle();
        }
    );
    $(this).on('click', function(e) {
        var container = $(".floatingButton");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && $('.floatingButtonWrap').has(e.target).length === 0) 
        {
            if(container.hasClass('open'))
            {
                container.removeClass('open');
            }
            if (container.children('.fa').hasClass('fa-close')) 
            {
                container.children('.fa').removeClass('fa-close');
                container.children('.fa').addClass('fa-plus');
            }
            $('.floatingMenu').hide();
        }
    });
});


var imgChange = document.querySelector(".popout img");

$(".popout .btn").click(function() {


	$(this).toggleClass("");
	$(this).closest(".popout").find(".panel").toggleClass("active");
    imgChange.setAttribute("src", "logo_small_succes.png");
    
});
$(document).click(function() {
	$(".popout .panel").removeClass("active");
	$(".popout .btn").removeClass("active");
    imgChange.setAttribute("src", "logo_small.png");
});
$(".popout .panel").click(function(event) {
	event.stopPropagation();
});
$(".popout .btn").click(function(event) {
	event.stopPropagation();
});

$(".card-header .close").click(function() {
	$(".popout .panel").removeClass("active");
    $(".popout .btn").removeClass("active");
    imgChange.setAttribute("src", "logo_small.png");
});

/* var imgChange = document.querySelector(".popout img");

$(".popout .btn").click(function() {


	$(this).toggleClass("active");
	$(this).closest(".popout").find(".panel").toggleClass("active");
    $(".popout-2 .btn").addClass("d-none");
    
    imgChange.setAttribute("src", "logo_small_succes.png");
    
});
$(document).click(function() {
	$(".popout .panel").removeClass("active");
	$(".popout .btn").removeClass("active");
    $(".popout-2 .btn").removeClass("d-none");
});
$(".popout .panel").click(function(event) {
	event.stopPropagation();
});
$(".popout .btn").click(function(event) {
	event.stopPropagation();
});

$(".card-header .close").click(function() {
	$(".popout .panel").removeClass("active");
    $(".popout .btn").removeClass("active");
    $(".popout-2 .btn").removeClass("d-none");
}); */

/* KETTŐ */ 

$(".popout-2 .btn").click(function() {
	$(this).toggleClass("active");
	$(this).closest(".popout-2").find(".panel").toggleClass("active");
});
$(document).click(function() {
	$(".popout-2 .panel").removeClass("active");
	$(".popout-2 .btn").removeClass("active");
});
$(".popout-2 .panel").click(function(event) {
	event.stopPropagation();
});
$(".popout-2 .btn").click(function(event) {
	event.stopPropagation();
});


$(".card-header .close").click(function() {
	$(".popout-2 .panel").removeClass("active");
    $(".popout-2 .btn").removeClass("active");
});


function kovetkezoLepesFv() {
    var element = document.getElementById("kovetkezoLepes");
    element.classList.remove("d-none");
    var element = document.getElementById("elozoLepes");
    element.classList.add("d-none");
  }


  function visszaLepesFv() {
    var element = document.getElementById("elozoLepes");
    element.classList.remove("d-none");
    var element = document.getElementById("kovetkezoLepes");
    element.classList.add("d-none");
  }