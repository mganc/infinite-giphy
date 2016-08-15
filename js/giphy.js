$( document ).ready(function() {
    var $form = $("#search");

    $form.on("submit", function(e) {
      e.preventDefault();
      // remove previously added images for new giphy searches
      var images = document.getElementsByTagName('img');
      var l = images.length;
      for (var i = 0; i < l; i++) {
          images[0].parentNode.removeChild(images[0]);
      }

      // grab keyword value
      var $keyword = $("#keyword").val();

    $.ajax({
      type: "get",
      dataType: "json",
      url: "http://api.giphy.com/v1/gifs/search?q=" + $keyword + "&limit=100&api_key=dc6zaTOxFJmzC"
      }).done(function(res){
      for (i = 0; i < 10; i++) {
          var newImg = "<img src=" + res.data[i].images.fixed_height.url + ">";
          $("body").append(newImg);
        };

        // scroll function
        $(window).on('scroll', function() {
          if($(window).scrollTop() + $(window).height() >= $(document).height()){
            for (i = 10; i < res.data.length; i++) {
                var newImg = "<img src=" + res.data[i].images.fixed_height.url + ">";
                $("body").append(newImg);
              };
          }
        });

        // toggle image class
        $("img").on("click", function(){
          $(this).toggleClass('big');
        })

        // clear input
            $("#keyword").val('');
        }).fail(function(res) {
          console.log("oh nos, an error!");
        })
  })

});
