'use strict';

/*-----------------------------------
 Quick Mobile Detection
 -----------------------------------*/

var isMobile = {
  Android: function () {
    "use strict";
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    "use strict";
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    "use strict";
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    "use strict";
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    "use strict";
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    "use strict";
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

angular.module('DirectivesModule')

  /*-----------------------------------
   Page PreLoader
   ------------------------------------*/

  .directive('loader', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $(element).delay(600).fadeOut();
      }
    };
  })

  .directive('preloader', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $(element).delay(1000).fadeOut("slow");
      }
    };
  })

  /*-----------------------------------
   Home Section Text Slider
   -----------------------------------*/

  .directive('headerText', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $(element).flexslider({
          animation: "slide",
          selector: ".text-slider .text-slides",
          slideshowSpeed: 5000,
          controlNav: false,
          directionNav: false,
          direction: "vertical",
          start: function (slider) {
            $('body').removeClass('loader');
          }
        });
      }
    };
  })

  /*-----------------------------------
   Full Screen Home Section Slider
   -----------------------------------*/

  .directive('slides', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $(element).superslides({
          animation: 'fade',
          play: 7000,
          animation_speed: 3000
        });
      }
    };
  })

  /*-----------------------------------
   Slow Zoom Header Image - NON USATO NEL TEMPLATE PARALLAX!!!
   -----------------------------------*/

  .directive('zoomContainer', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $(element).find('img').addClass("zoom-in"); // add class
        var tid = setTimeout(zoomLoop, 90000); // set timer

        function zoomLoop() {
          "use strict";
          $(".zoom-container img").fadeOut(2000, function () { // fade out
            $(".zoom-container").find('img').removeClass("zoom-in");
          });
          $(".zoom-container img").fadeIn(1500, function () { // fade in
            $(".zoom-container").find('img').addClass("zoom-in");
          });
          tid = setTimeout(zoomLoop, 90000); // reset timer
        }
      }
    };
  })

  /*-----------------------------------
   Full Screen Headers - NON USATO NEL TEMPLATE PARALLAX!!!
   -----------------------------------*/

  .directive('altHeader', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $(element).css({'height': ($(window).height()) + 'px'});
        $(window).resize(function () {
          $(element).css({'height': ($(window).height()) + 'px'});
        });
      }
    };
  })

  /*-----------------------------------
   Navigation Scroll Page
   -----------------------------------*/

  .directive('scroll', function () {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        $('.scroll').bind('click', function (event) {
          var $anchor = $(this);
          var headerH = $('#navigation').outerHeight();
          if ($($anchor.attr('href')).length != 0) {
            $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1200, 'easeInOutExpo');
            event.preventDefault();
          }
        });
      }
    };
  })

  /*-----------------------------------
   Show Navigation Bar on Scroll Down
   -----------------------------------*/

  .directive('navigation', function () {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        $(window).scroll(function () {
          /*
           var y = $(this).scrollTop();
           var z = $('#about').offset().top - 250;

           if (y >= z) {
           $(element).removeClass('hide-nav').addClass('show-nav');
           }
           else {
           $(element).removeClass('show-nav').addClass('hide-nav');
           }*/
          if ($("#navigation_menu").length != 0) {
            if ($("#navigation_menu").offset().top > 50) {
              $(element).removeClass('hide-nav').addClass('show-nav');
            } else {
              $(element).removeClass('show-nav').addClass('hide-nav');
            }
          }

        });
      }
    };
  })

  /*-----------------------------------
   Menu for mobile devices
   -----------------------------------*/

  .directive('mobileNavButton', function () {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        $(element).click(function () {
          $(".nav-menu").slideToggle("8000");
        });
        $('.nav a').click(function () {
          "use strict";
          if ($(window).width() < 960) {
            $(".nav-menu").slideToggle("2000")
          }
        });
      }
    };
  })

  /*-----------------------------------
   Slider for Testimonials
   -----------------------------------*/

  .directive('container', function () {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        $(element).flexslider({
          animation: "fade",
          selector: ".testimonial-slider .t-slide",
          controlNav: false,
          directionNav: true,
          slideshowSpeed: 8000
        });
      }
    };
  })

  /*-----------------------------------
   Parallax Sections (disabled on mobile) - ATTACCATO A UN ELEMENTO CONTAINER DEL DOM A CASACCIO!!
   -----------------------------------*/

  .directive('container', function () {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        if (!isMobile.any()) {
          $('.parallax1').parallax("50%", 0.5);
          $('.parallax2').parallax("50%", 0.5);
          $('.parallax3').parallax("50%", 0.5);
          $('.parallax4').parallax("50%", 0.5);
          $('.parallax5').parallax("50%", 0.5);
          $('.parallax6').parallax("50%", 0.5);
        }
      }
    };
  })

  /*-----------------------------------
   Fit Videos
   -----------------------------------*/

  .directive('fitVids', function () {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        $(element).fitVids();
      }
    };
  })

  /*-----------------------------------
   Isotope Portfolio -- NON FUNZIONA SBALLA LE ALTEZZE INIZIALI DELLE IMMAGINI. TODO DA RIVEDERE

   TODO AL MOMENTO NON LA USIAMO
   -----------------------------------

   .directive('portfolioItems', function () {
   return {
   restrict: 'ACE',
   link: function (scope, element, attrs) {

   var $container = $(element);

   $container.isotope({
   resizable: false,
   itemSelector: '.item'
   });

   var $optionSets = $('#options .option-set'),
   $optionLinks = $optionSets.find('a');

   $optionLinks.click(function () {
   var $this = $(this);
   if ($this.hasClass('selected')) {
   return false;
   }
   var $optionSet = $this.parents('.option-set');
   $optionSet.find('.selected').removeClass('selected');
   $this.addClass('selected');

   var options = {},
   key = $optionSet.attr('data-option-key'),
   value = $this.attr('data-option-value');
   value = value === 'false' ? false : value;
   options[key] = value;
   if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
   changeLayoutMode($this, options)
   } else {
   $container.isotope(options);
   }
   return false;
   });

   // Project Expander
   var loader = $('.item-expander');

   $('.expander').on('click', function (e) {
   e.preventDefault();
   e.stopPropagation();
   var url = $(this).attr('href');

   loader.slideUp(function () {
   $.get(url, function (data) {
   var portfolioContainer = $('#portfolio-container');
   var topPosition = portfolioContainer.offset().top;
   var bottomPosition = topPosition + portfolioContainer.height();
   $('html,body').delay(600).animate({scrollTop: topPosition}, 800);
   var container = $('#item-expander>div', loader);

   container.html(data);
   $(".fit-vids").fitVids();
   $('.project').flexslider({
   animation: "fade",
   selector: ".project-slides .slide",
   controlNav: true,
   directionNav: true,
   slideshowSpeed: 5000
   });

   //   container.fitVids();
   loader.slideDown(function () {
   if (typeof keepVideoRatio == 'function') {
   keepVideoRatio('.project-video > iframe');
   }
   }).delay(1000).animate({opacity: 1}, 200);
   });
   });
   });

   $('.close', loader).on('click', function () {
   loader.delay(300).slideUp(function () {
   var container = $('#item-expander>div', loader);
   container.html('');
   $(this).css({opacity: 0});

   });
   var portfolioContainer = $('#portfolio-container');
   var topPosition = portfolioContainer.offset().top;
   $('html,body').delay(0).animate({scrollTop: bottomPosition - 50}, 500);
   });

   }
   };
   })

   /*-----------------------------------
   PrettyPhoto -- L'HO AGGANCIATO ALLA CLASSE CONTAINER -- PERMETTE DI INGRANDIRE LE IMMAGINI -- AL MOMENTO NON SERVE
   -----------------------------------

   .directive('prettyPhoto', function () {
   return {
   restrict: 'ACE',
   link: function (scope, element, attrs) {
   $("a[data-rel^='prettyPhoto']").prettyPhoto({
   deeplinking: false,
   social_tools: false
   });
   }
   };
   })

   /*-----------------------------------
   Animated Elements
   -----------------------------------*/

  .directive('animated', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        $(element).appear(function () {
          var elem = $(this);
          var animate = elem.data('animate');
          if (!elem.hasClass('visible')) {
            var animateDelay = elem.data('animate-delay');
            if (animateDelay) {
              setTimeout(function () {
                elem.addClass(animate + " visible");
              }, animateDelay);
            } else {
              elem.addClass(animate + " visible");
            }
          }
        });
      }
    };
  })

  /*-----------------------------------
   Counter
   -----------------------------------*/

  .directive('count', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        $(element).appear(function () {
          $('.count').each(function () {
            var count = $(this).attr('data-to');
            $(this).find('.count-number').delay(6000).countTo({
              from: 50,
              to: count,
              speed: 3000,
              refreshInterval: 50
            });
          });
        });
      }
    };
  })

  /*-----------------------------------
   Tooltips
   -----------------------------------*/

  .directive('tipped', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        $('.tipped').tipper({
          direction: "top"
        });
      }
    };
  })

  /*-----------------------------------
   Accordion
   -----------------------------------*/

  .directive('accordionButton', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        //Accordion button
        $(element).click(function () {
          $('div.accordion-content').slideUp('normal');
          if ($('div.accordion-button i').hasClass('fa-arrow-circle-o-down')) {
            $('div.accordion-button i').removeClass('fa-arrow-circle-o-down').addClass('fa-arrow-circle-o-right');
          }
          $(this).find('i').toggleClass('fa-arrow-circle-o-right').toggleClass('fa-arrow-circle-o-down');
          $(this).next().slideDown('normal');

        });

        //initial state
        $("div.accordion-content").hide();
        $('div.accordion-content.active').slideDown('normal');
      }
    };
  })

  /*-----------------------------------
   Skill Bar
   -----------------------------------*/

  .directive('skillbar', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attrs) {
        $(element).appear(function () {
          $(this).find('.skillbar-bar').animate({
            width: $(this).attr('data-percent')
          }, 3000);
        });
      }
    };
  })

  /*-----------------------------------
   Google Map
   -----------------------------------*/

  .directive('googleMap', function () {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {

        // Map Coordinates
        var latlng = new google.maps.LatLng(45.0734888, 7.6756065);

        // Map Options
        var myOptions = {
          zoom: 13,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          scrollwheel: false
        };

        var map = new google.maps.Map(document.getElementById('google-map'), myOptions);

        // Marker Image
        var image = 'images/marker.png';

        //  Start Marker
        var myLatlng = new google.maps.LatLng(45.0734768, 7.6756365);

        // Marker Text
        var contentString = '<div id="map-tooltip"><h5>Our Office Location</h5><p>Come see us!</p></div>';

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Hello World!',
          icon: image
        });

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker);
        });

        // End Marker

      }
    };
  })


  /*-----------------------------------
   Full Width Video

   TODO AL MOMENTO NON USATO
   -----------------------------------

   .directive('player', function () {
   return {
   restrict: 'ACE',
   link: function (scope, element, attrs) {
   $(element).mb_YTPlayer();
   }
   };
   })

   /*-----------------------------------
   Close Button for Alert Boxes
   -----------------------------------*/

  .directive('closeAlert', function () {
    return {
      restrict: 'ACE',
      link: function (scope, element, attrs) {
        $(element).closest('.alert').fadeOut(1000);
      }
    };
  })

  /*-----------------------------------
   Bootstrap TAB
   -----------------------------------*/

  .directive('tab', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $('.nav.nav-tabs').click(function (e) {
          e.preventDefault()
          $(this).tab('show')
        });
      }
    };
  })


  /*-----------------------------------
   FlexSlider Custom for Homepage
   -----------------------------------*/

  .directive('flexslider', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $(window).load(function () {
          $('.flexslider-custom').flexslider();
        });
      }
    };
  })

/******************************************************************************************************************************
 COMMING SOON PAGE
 *******************************************************************************************************************************/


  .directive('comingSoon', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
          /**
           * Set your date here  (YEAR, MONTH (0 for January/11 for December), DAY, HOUR, MINUTE, SECOND)
           * according to the GMT+0 Timezone
           **/
          var launch = new Date(2015, 8, 14, 11, 0);
          /**
           * The script
           **/
          //var message = $('#message');
          var days = $('#days');
          var hours = $('#hours');
          var minutes = $('#minutes');
          var seconds = $('#seconds');

          setDate();
          function setDate() {
            var now = new Date();
            if (launch < now) {
              days.html('<h1>0</H1><p>Day</p>');
              hours.html('<h1>0</h1><p>Hour</p>');
              minutes.html('<h1>0</h1><p>Minute</p>');
              seconds.html('<h1>0</h1><p>Second</p>');
              //message.html('OUR SITE IS NOT READY YET...');
            }
            else {
              var s = -now.getTimezoneOffset() * 60 + (launch.getTime() - now.getTime()) / 1000;
              var d = Math.floor(s / 86400);
              days.html('<h1>' + d + '</h1><p>Day' + (d > 1 ? 's' : ''), '</p>');
              s -= d * 86400;

              var h = Math.floor(s / 3600);
              hours.html('<h1>' + h + '</h1><p>Hour' + (h > 1 ? 's' : ''), '</p>');
              s -= h * 3600;

              var m = Math.floor(s / 60);
              minutes.html('<h1>' + m + '</h1><p>Minute' + (m > 1 ? 's' : ''), '</p>');

              s = Math.floor(s - m * 60);
              seconds.html('<h1>' + s + '</h1><p>Second' + (s > 1 ? 's' : ''), '</p>');
              setTimeout(setDate, 1000);

              //message.html('OUR SITE IS NOT READY YET, BUT WE ARE COMING SOON');
            }
          }
      }
    };
  });





