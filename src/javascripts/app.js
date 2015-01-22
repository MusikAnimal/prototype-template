;(function($){

  app = Sammy('body', function() {
    // for(var i=0; i<pageCount; i++) {
    //   this.get('#/section-'+i, scrollToPage.bind(this,i));
    // }
    this.get('#/page-1');
    this.get('#/page-2');
    this.get('#/page-3');
    this.get('#/page-4');

    this.get('/');

    this.after(function(context) {
      var hash = document.location.hash;
      currentPos = hash ? -(hash.slice(-1) - 1) : 0;
      if(hash) {
        scrollToPage(currentPos);
      }
    });
  });
  
  function scrollPage(direction) {
    var newScrollY = currentPos + direction;

    if(newScrollY > 0 || newScrollY < -pageCount + 1) {
      return false;
    }

    currentPos = newScrollY;

    app.setLocation('#/page-'+(-currentPos + 1));
  }

  function scrollToPage(pos) {
    $(".section-container").css(
      "transform", "translateY(" + pos * 100 + "%)",
      "-webkit-transform", "translateY(" + pos * 100 + "%)"
    );
  }

  function scrollPane(direction) {
    $paneWrapper = $("section.page-"+(currentPos + 1)).find(".pane-wrapper");
    var pane = $paneWrapper.data("pane");
    var paneLength = $paneWrapper.find("pane").length;
    $paneWrapper.css(
      "transform", "translateX(" + (pane = pane + direction) * 100 + "%)",
      "-webkit-transform", "translateX(" + pane * 100 + "%)"
    ).data("pane",pane);
  }

  $(function() {
    pageCount = $("section").length;
    currentPos = 0;

    app.run();

    $(".next-page").on("click", function() {
      scrollPage(-1);
    });
    
    var hammertime = new Hammer($("body")[0]);

    hammertime.get('swipe').set({
      direction: Hammer.DIRECTION_ALL
    });

    hammertime.on('swipe', function(ev) {
      if(ev.direction === Hammer.DIRECTION_UP) {
        scrollPage(-1);
      } else if(ev.direction === Hammer.DIRECTION_DOWN) {
        scrollPage(1);
      } else if(ev.direction === Hammer.DIRECTION_LEFT) {
        scrollPane(-1);
      } else if(ev.direction === Hammer.DIRECTION_RIGHT) {
        scrollPane(1);
      }
    });

  });
})(jQuery);
