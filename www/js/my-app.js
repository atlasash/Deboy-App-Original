
// Sidebar toggle
//
// -------------------
$(document).ready(function() {
  
    var overlay = $('.sidebar-overlay');

    $('.sidebar-toggle').on('click', function() {
        var sidebar = $('#sidebar');
        sidebar.toggleClass('open');
        if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')) {
            overlay.addClass('active');
        } else {
            overlay.removeClass('active');
        }
    });

    overlay.on('click', function() {
        $(this).removeClass('active');
        $('#sidebar').removeClass('open');
    });
});

// Sidebar constructor
//
// -------------------
$(document).ready(function() {

    var sidebar = $('#sidebar');
    var sidebarHeader = $('#sidebar .sidebar-header');
    var sidebarImg = sidebarHeader.css('background-image');
    var toggleButtons = $('.sidebar-toggle');

    // Hide toggle buttons on default position
    toggleButtons.css('display', 'none');
    $('body').css('display', 'table');


    // Sidebar position
    $('#sidebar-position').change(function() {
        var value = $( this ).val();
        sidebar.removeClass('sidebar-fixed-left sidebar-fixed-right sidebar-stacked').addClass(value).addClass('open');
        if (value == 'sidebar-fixed-left' || value == 'sidebar-fixed-right') {
            $('.sidebar-overlay').addClass('active');
        }
        // Show toggle buttons
        if (value != '') {
            toggleButtons.css('display', 'initial');
            $('body').css('display', 'initial');
        } else {
            // Hide toggle buttons
            toggleButtons.css('display', 'none');
            $('body').css('display', 'table');
        }
    });

    // Sidebar theme
    $('#sidebar-theme').change(function() {
        var value = $( this ).val();
        sidebar.removeClass('sidebar-default sidebar-inverse sidebar-colored sidebar-colored-inverse').addClass(value)
    });

    // Header cover
    $('#sidebar-header').change(function() {
        var value = $(this).val();

        $('.sidebar-header').removeClass('header-cover').addClass(value);

        if (value == 'header-cover') {
            sidebarHeader.css('background-image', sidebarImg)
        } else {
            sidebarHeader.css('background-image', '')
        }
    });
});

/**
 * Created by Kupletsky Sergey on 08.09.14.
 *
 * Add JQuery animation to bootstrap dropdown elements.
 */

(function($) {
    var dropdown = $('.dropdown');

    // Add slidedown animation to dropdown
    dropdown.on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // Add slideup animation to dropdown
    dropdown.on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });
})(jQuery);


(function(removeClass) {

  jQuery.fn.removeClass = function( value ) {
    if ( value && typeof value.test === "function" ) {
      for ( var i = 0, l = this.length; i < l; i++ ) {
        var elem = this[i];
        if ( elem.nodeType === 1 && elem.className ) {
          var classNames = elem.className.split( /\s+/ );

          for ( var n = classNames.length; n--; ) {
            if ( value.test(classNames[n]) ) {
              classNames.splice(n, 1);
            }
          }
          elem.className = jQuery.trim( classNames.join(" ") );
        }
      }
    } else {
      removeClass.call(this, value);
    }
    return this;
  }
})(jQuery.fn.removeClass);


$(document).ready(function() {


  $(".menu-container ul li").click(function(e) {

    // make sure we cannot click the slider
    if ($(this).hasClass('myslider')) {
      return;
    }

    /* Add the slider movement */

    // what tab was pressed
    var whatTab = $(this).index();

    // Work out how far the slider needs to go
    //var howFar = 160 * whatTab;

    $(".myslider").css({
      //left: howFar + "px"
      transition: "all 0.3s",
      width: $(this).width() + "px" ,
      left: $(this).position().left + "px" 
    });
    
    $('.menu-container').stop().animate({
      scrollLeft: $(this).position().left - 50
    }, 300);

   go_to_main(whatTab);
  });

  // Hide Header on on scroll down
  var didScroll;
  var upscroll;
  var lastUpscroll;
  var lastScrollTop = 0;
  var delta = 1;
  var temp_menu_top = 0;
  var menuTop = 0;  
  menuTop = $(".slide_main_wrapper .swiper-slide-active").scrollTop();
  //var navbarHeight = $('header').outerHeight();

  $(".slide_main_wrapper .swiper-slide-active").scroll(function(event){
      didScroll = true;
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
      //alert("scrolling");
  });


  function hasScrolled() {

    var st = $(".slide_main_wrapper .swiper-slide-active").scrollTop();
    temp_menu_top = $(".s8 .swiper-wrapper .swiper-slide").eq(0).offset().top;
    var del = lastScrollTop - st;
    var sum = temp_menu_top + del;
    if(sum > 0){ sum=0;} 
    if(sum< - 51){sum=-51;}
    //var st = $(this).scrollTop();
    // Make sure they scroll more than delta

    /*if(Math.abs(lastScrollTop - st) <= delta)
      return;*/

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.

    if(temp_menu_top <= 0 && temp_menu_top >= -51){
      swiper8.setWrapperTranslate(sum);
    }


    if (st > lastScrollTop){
        // Scroll Down
        upscroll = 0;
        if(temp_menu_top >= -51)
        {
          /*$(".s2").removeClass("stop-swiping3");*/
        }
        else{
          //swiper8.slideTo(1);
        }
        //alert("down scroll");
    }
    else {
        // Scroll Up
        upscroll = 1;
        if(upscroll == lastUpscroll && temp_menu_top < 0)
        {
        }
        else
        {
          /*$(".s2").removeClass("stop-swiping3");*/
        }
        //alert("up scroll");
    }

    lastScrollTop = st;
    lastUpscroll = upscroll;
  }

  function hasScrolled2(del2) {

    temp_menu_top = $(".s8 .swiper-wrapper .swiper-slide").eq(0).offset().top;
    var sum = temp_menu_top + del2;
    if(sum > 0){ sum=0;} 
    if(sum< - 51){sum=-51;}
    if(temp_menu_top <= 0 && temp_menu_top >= -51){
      swiper8.setWrapperTranslate(sum);
    }
  }
  
});


var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function() {

    //to initialize main swiper
    swiper.slideTo(0);
    $(".myslider").css({
      transition: "all 0.3s",
      width: $(".menu-container ul li").eq(swiper2.activeIndex).width() + "px" ,
      left: $(".menu-container ul li").eq(swiper2.activeIndex).position().left + "px" 
    });
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

//function to perform after resize window
function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        //to reinitialize main swiper
        swiper.slideTo(1);
    }               
}

// Initialize your app
var myApp = new Framework7({
    material: true,
    materialRipple: true
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    //dynamicNavbar: true,
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

var offset = 0;
var offset_current = 0;
var scroller = 0;
var soffset = 0;
var clone_set = 0;
var state = '1';
var slide_main_state = '0';
var slide_main_state_new ='0';
var st_active = 0;

//TOP MENU EXTRA
var swiper8 = myApp.swiper('.s8', { /* Options here */
  initialSlide: 0,
  direction: 'vertical',
  slidesPerView: 'auto',
  noSwipingClass: 'stop-swiping3',
  resistanceRatio: .00000000000001,
  watchSlidesProgress : true,
  followFinger: true,
  onProgress: function(swiper8, progress){
    $("#prog").html(swiper8.slides[0].progress);
    $("#prog2").html(swiper8.slides[1].progress);

    if(swiper8.slides[0].progress < 0){
      var wh = $(window).height();
      var hwrapper = $(".slide_main_wrapper .swiper-slide-active")[0].scrollHeight;
      if(hwrapper > wh){
        //swiper8.params.followFinger = false;
        //swiper8.params.watchSlidesProgress = false;
        $(".s2").addClass("stop-swiping3");
      }
    }

    if(swiper8.slides[1].progress > 0){
      var wh = $(window).height();
      var hwrapper = $(".slide_main_wrapper .swiper-slide-active")[0].scrollHeight;
      if(hwrapper > wh){
        //swiper8.params.followFinger = false;
        //swiper8.params.watchSlidesProgress = false;
        $(".s2").addClass("stop-swiping3");
      }
    }
  }//end onProgress
});


$('#btn1').click(function(){
  //swiper8.setWrapperTranslate(-500);
  alert($(".s8 .swiper-wrapper .swiper-slide").eq(0).offset().top);
});

//swiper6.params.control = {swiper5,swipe7};

var swiper4 = myApp.swiper('.s4', { /* Options here */
  initialSlide: 0
});

//MAIN DISPLAY SWIPER CLONE
var swiper3 = myApp.swiper('.s3', { /* Options here */
  initialSlide: 0
});

//MAIN DISPLAY SWIPER
var swiper2 = myApp.swiper('.s2', { /* Options here */
  slideDuplicateClass : 'my-slide-duplicate',
  watchSlidesProgress : false,
  speed: 300,
  initialSlide: 0,
  noSwipingClass: 'stop-swiping2',
  resistanceRatio: .00000000000001,
  onProgress: function(swiper2, progress){

    //$("#tracker").html(swiper.slides[2].progress);
    /*if(swiper2.slides[0].progress < 0){
      state = '1';
      swiper2.params.followFinger = false;
      swiper2.params.watchSlidesProgress = false;
      slide_to_main(0);
    }

    if(swiper2.slides[4].progress > 0){
      state = '1';
      swiper2.params.followFinger = false;
      swiper2.params.watchSlidesProgress = false;
      slide_to_main(4);
    }*/


    //var cur_width = $(".menu-container ul li").eq(slide_main_state).width();
    $(".menu-container ul li span.active").removeClass("active");
    $(".menu-container ul li.button span").eq(swiper2.activeIndex).addClass("active");

    var cur_width = $(".myslider").width();    
    if(slide_main_state > 0){
      var prev_width = $(".menu-container ul li").eq(slide_main_state-1).width();
      var prev_pos = $(".menu-container ul li").eq(slide_main_state-1).position().left ;       
    }
    else{
      var prev_width = 0;
    }

    if(slide_main_state < 4){
      var next_width = $(".menu-container ul li").eq(slide_main_state+1).width();
      var next_pos = $(".menu-container ul li").eq(slide_main_state+1).position().left ;     
    }
    else{
      var next_width = 0; 
    }


    if(swiper2.slides[slide_main_state].progress < 0 && swiper2.slides[slide_main_state].progress != 1){
      if(prev_width != 0){
        var temp_offset = prev_width - cur_width;
        $(".myslider").css({
          //left: howFar + "px"
          transition: "all 0s",
          width: cur_width + temp_offset*Math.abs(swiper2.slides[slide_main_state].progress) + "px",
          left: prev_pos + prev_width*(1-Math.abs(swiper2.slides[slide_main_state].progress)) + "px" 
        });

    $('.menu-container').stop().animate({
      scrollLeft: prev_pos + prev_width*(1-Math.abs(swiper2.slides[slide_main_state].progress)) - 50
    }, 0);


      }   
    }
    else{
      if(next_width != 0  && swiper2.slides[slide_main_state].progress != 1  && swiper2.slides[slide_main_state].progress != 0){
        var temp_offset = next_width - cur_width;
        $(".myslider").css({
          //left: howFar + "px"
          transition: "all 0s",
          width: cur_width + temp_offset*Math.abs(swiper2.slides[slide_main_state].progress) + "px",
          left: next_pos - next_width*(1-Math.abs(swiper2.slides[slide_main_state].progress)) + "px" 
        });

    $('.menu-container').stop().animate({
      scrollLeft: next_pos - next_width*(1-Math.abs(swiper2.slides[slide_main_state].progress)) - 50
    }, 0);

      }   
    }


  }//end onProgress
});

//MAIN DISPLAY SWIPER CONTAINER
var swiper = myApp.swiper('.s1',{

  watchSlidesProgress : true,
  slidesPerView: 'auto',
  speed: 150,
  initialSlide: 0,
  noSwipingClass: 'stop-swiping',
  onInit: function(swiper){
    //swiper.slideTo(1);
  },
  onProgress: function(swiper, progress){

    //$("#tracker").html(swiper.slides[2].progress);
    if(swiper.slides[0].progress < 0){
      state = '0';
      swiper.params.followFinger = false;
      swiper.params.watchSlidesProgress = false;
      slide_to_menu(0);
    }

    if(swiper.slides[1].progress > 0){
      state = '1';
      swiper.params.followFinger = false;
      swiper.params.watchSlidesProgress = false;
      slide_to_menu(1);
    }

    if(state == '0'){
      /*for (var i = 0; i < swiper2.slides.length; i++){
        swiper2.slides[i].style.opacity = 0.25+0.75*swiper.slides[0].progress;
      }
      swiper3.slides[0].style.opacity = 0.25+0.75*swiper.slides[0].progress;*/
      //var opa = 0.25+0.75*swiper.slides[0].progress;
      $(".overlay").show();
      var opa = 0.5-0.5*swiper.slides[0].progress;
      $(".overlay").css('opacity', opa);

      /********* ROTATE MENU ************/
      var menu_icon = document.getElementById('menu_icon');
      es = menu_icon.style;
      es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'rotate('+180*swiper.slides[0].progress+'deg)';

      if(clone_set < 1){
        var clone_text = $(".slide_main_wrapper .swiper-slide-active").html();
        $(".clone-slide").html(clone_text);
        var s = $(".slide_main_wrapper .swiper-slide-active").scrollTop();
        $(".clone-wrapper").show();
        $(".clone-slide").scrollTop(s);
        clone_set=1;
      }

      $(".slide_main_wrapper").css('opacity', '0');
    }
    if(state == '1'){
      /*for (var j = 0; j < swiper2.slides.length; j++){
        swiper2.slides[j].style.opacity = 0.25+0.75*swiper.slides[0].progress;
      }
      swiper3.slides[0].style.opacity = 0.25+0.75*swiper.slides[0].progress;*/
      //var opa = 0.25+0.75*swiper.slides[0].progress;
      $(".overlay").show();
      var opa = 0.5-0.5*swiper.slides[0].progress;
      $(".overlay").css('opacity', opa);

      /********* ROTATE MENU ************/
      var menu_icon = document.getElementById('menu_icon');
      es = menu_icon.style;
      es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'rotate('+180*swiper.slides[0].progress+'deg)';

      if(clone_set < 1){
        var clone_text = $(".slide_main_wrapper .swiper-slide-active").html();
        $(".clone-slide").html(clone_text);
        var s = $(".slide_main_wrapper .swiper-slide-active").scrollTop();
        $(".clone-wrapper").show();
        $(".clone-slide").scrollTop(s);
        clone_set=1;
      }

      $(".slide_main_wrapper").css('opacity', '0');
      //$(".tabs").css('z-index', '0');
      $(".menu-container").css('z-index', '1');
    }

  }
});

swiper8.on('onTransitionEnd', function () {

  swiper8.params.followFinger = true;
  swiper8.params.watchSlidesProgress = true;
  var wh = $(window).height();
  var hwrapper = $(".slide_main_wrapper .swiper-slide-active")[0].scrollHeight;
  if(hwrapper > wh){
    $(".s2").addClass("stop-swiping3");    
  }
  swiper2.reInit();
  swiper8.reInit();
});

swiper2.on('onTouchStart', function () {

  swiper2.params.followFinger = true;
  swiper2.params.watchSlidesProgress = true;
});

swiper2.on('onTouchEnd', function () {

  if($(".s8 .swiper-wrapper .swiper-slide").eq(0).offset().top > - 26){
    swiper8.slideTo(0);
  }
  else{
    swiper8.slideTo(1);
  } 

  swiper2.params.followFinger = false;
  swiper2.params.watchSlidesProgress = false;
  if(slide_main_state == "0"){
    $(".myslider").css({
      //left: howFar + "px"
      transition: "all 0.3s",
      left: "0px" 
    });

  } 
  if(slide_main_state == "4"){
    $(".myslider").css({
      //left: howFar + "px"
      transition: "all 0.3s",
      left: $(".menu-container ul li").eq(4).position().left 
    });
  } 
});

swiper8.on('onTouchMove', function () {
  //menuTop = $(".s8 .swiper-wrapper .swiper-slide").eq(0).offset().top;
});

swiper2.on('onTransitionStart', function (){

  $(".myslider").css({
    //left: howFar + "px"
    transition: "all 0.3s",
    width: $(".menu-container ul li").eq(swiper2.activeIndex).width() + "px" ,
    left: $(".menu-container ul li").eq(swiper2.activeIndex).position().left + "px" 
  });
  $(".s2").removeClass("stop-swiping3");
  swiper2.params.followFinger = false;
  swiper2.params.watchSlidesProgress = false;

  $('.menu-container').stop().animate({
    scrollLeft: $(".menu-container ul li").eq(swiper2.activeIndex).position().left - 50
  }, 300);

  $(".menu-container ul li span.active").removeClass("active");
  $(".menu-container ul li.button span").eq(swiper2.activeIndex).addClass("active");
});

swiper2.on('onTransitionEnd', function () {

  $(".s2").removeClass("stop-swiping3");
  swiper.params.followFinger = true;
  swiper.params.watchSlidesProgress = true;
  swiper2.params.followFinger = true;
  swiper2.params.watchSlidesProgress = true;
  slide_main_state = swiper2.activeIndex;

  //$(".menu-container ul li").eq(swiper2.activeIndex).click();

  //$('.tabopen').removeClass('tabopen');
  //$("#tab"+slide_main_state).addClass('tabopen');
});

swiper.once('onTouchStart', function () {
  disableNext();
});

swiper.on('onTouchEnd', function () {
  //alert(swiper.activeIndex);
  swiper.params.followFinger = true;
  swiper.params.watchSlidesProgress = true;
  if(swiper.activeIndex == '0'){
    swiper.slideTo(0); 
  }
  else{
    swiper.slideTo(1);
    $(".slide_main_wrapper").css('opacity', '1');
  }
});

swiper.on('onTransitionEnd', function () {
  //alert(swiper.activeIndex);
  clone_set=0;
  swiper.params.followFinger = true;
  swiper.params.watchSlidesProgress = true;

  if(swiper.activeIndex == '0'){
    state = "0";
    $(".slide_main_wrapper").removeClass("stop-swiping");
    $(".slide_main_wrapper").addClass("stop-swiping2");
    //$(".tabs").css('z-index', '0');
    $(".menu-container").css('z-index', '1');
    enableNext();

  }
  else{
    state = '1';
    $(".clone-wrapper").hide();
    $(".overlay").hide();
    $(".slide_main_wrapper").css('opacity', '1');
    $(".slide_main_wrapper").removeClass("stop-swiping2");
    $(".slide_main_wrapper").addClass("stop-swiping");
    //$(".tabs").css('z-index', '9');
    $(".menu-container").css('z-index', '9');
    disableNext();
  }
});

function change_state(){
   slide_main_state = swiper2.activeIndex;
} 

function disableNext(){
  //setTimeout(function(){

  if(swiper.activeIndex == '1'){ 
    //swiper.params.allowSwipeToNext = false;
    //swiper.params.allowSwipeToPrev = true;
    swiper.params.followFinger = true;
    swiper.params.watchSlidesProgress = true;
    //And reinit
    swiper.reInit();
  }
  if(swiper.activeIndex == '2'){
    swiper.slideTo(1); 
    //swiper.params.allowSwipeToNext = false;
    //swiper.params.allowSwipeToPrev = true;
    swiper.params.followFinger = true;
    swiper.params.watchSlidesProgress = true;
    //And reinit
    swiper.reInit();
  }
  if(swiper.activeIndex == '3'){
    swiper.slideTo(1); 
    //swiper.params.allowSwipeToNext = false;
    //swiper.params.allowSwipeToPrev = true;
    swiper.params.followFinger = true;
    swiper.params.watchSlidesProgress = true;
    //And reinit
    swiper.reInit();
  }

      //}, 20);
}

function enableNext(){

  //setTimeout(function(){
        //swiper.params.allowSwipeToNext = true;
        //swiper.params.allowSwipeToPrev = false;
  swiper.params.followFinger = true;
  swiper.params.watchSlidesProgress = true;
  //And reinit
  swiper.reInit();
      //}, 20);
}

function slide_to_menu(slide_num){
  swiper.params.followFinger = true;
  swiper.params.watchSlidesProgress = true;
  swiper.reInit();

  /*setTimeout(function(){ 
    swiper.slideTo(slide); 
  }, 350);*/
  swiper.slideTo(slide);
}

function slide_to_main(slide_num){
  swiper2.params.followFinger = true;
  swiper2.params.watchSlidesProgress = true;
  swiper2.reInit();

  /*setTimeout(function(){ 
    swiper.slideTo(slide); 
  }, 350);*/
  swiper2.slideTo(slide);
}

function go_to_main(num){
  swiper2.slideTo(num); 
}
