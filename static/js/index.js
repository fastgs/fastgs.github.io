window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 10000,
      // duration: 10000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    bulmaSlider.attach();

    $('.tabs-widget').each(function() {
      const containerElement = $(this);
      tabsWidget = new TabsWidget(containerElement);
    });

    document.getElementsByTagName("html")[0].style.visibility = "visible";

  })

class TabsWidget {
  constructor(container) {
    this.container = container;
    this.activeIndex = 0;
    this.listItems = container.children('.tabs').children('ul').children('li');
    let self = this;
    this.listItems.click(function (e) {
      let index = $(this).index();
      self.update($(this), index);
    })

    this.update(this.listItems[this.activeIndex], this.activeIndex);
  }

  update(element, targetIndex) {
    this.activeIndex = targetIndex;
    const tabs = this.container.children('.tabs');
    const tabsContent = this.container.children('.tabs-content');
    this.listItems.each(function () {
      if ($(this).index() == targetIndex) {
        $(this).addClass('is-active');
      } else {
        $(this).removeClass('is-active');
      }
    });
    tabsContent.children().each(function () {
      if ($(this).index() == targetIndex) {
        $(this).show();
        $(this).find('*').each(function () {
          if ($(this).is(':visible')) {
            $(this).trigger('tab:show');
          }
        })
      } else {
        $(this).hide();
        $(this).find('*').trigger('tab:hide');
      }
    });
  }
}
