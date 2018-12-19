/*========== CLOSE MOBILE NAV ON CLICK ==========*/

$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
});

/*========== SCROLLING TO LINKS ==========*/

$(document).ready(function(){

  $("a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){   
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
      });
    } // End if
  });

});