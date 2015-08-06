$(document).ready(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $("#previous").hide();
  $("#next").hide();
  var current = 0;
  var arr = [];

  function render(){
    $("#images").empty();
    if (current < arr.length) {
      var imageURL = arr[current].images.standard_resolution.url;
      var caption = arr[current].caption.text;
      var numComments = arr[current].comments.count;
      var numLikes = arr[current].likes.count;
      var url = arr[current].link;
      $("<a href='"+url+"' target='_blank'><img src='"+imageURL+"'></img></a>").appendTo("#images"),
      $("<p><b>Captions: </b>'"+caption+"'</p>").appendTo("#images"),
      $("<p><b>Number of comments: </b'"+numComments+"'</p>").appendTo("#images"),
      $("<p><b>Number of likes: </b>'"+numLikes+"'</p>").appendTo("#images");   
    }  
  }

  $("#instagram").on("submit", function(e) {
    e.preventDefault();
    var tag = $("#tag").val();
    $.ajax({
      url:"https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=6b57da6cc49c4e2ca5af262214decb93",
      method: "GET",
      dataType: 'jsonp',
      success: function(data){
        arr = data.data;
        console.log(arr);
        current = 0;
        render();
        //$.ajax({
        //   url:"https://api.instagram.com/v1/media/{media-id}}/comments?access_token=6b57da6cc49c4e2ca5af262214decb93",
        //   method: "GET",
        //   dataType: 'jsonp',
        //   success: function(data){
        //     data.data.forEach(function(row){
        //       var comments
        //       var comment =$("<p>'"+comments+"'</p>").appendTo("images");
        //     })
        //   }
        // })
      },
        complete: function(){
          $("#previous").show(),
          $("#next").show()
        }

    });
      
  });

  $("#next").on("click", function() {
    current++;  
    render();
  });

  $("#previous").on("click", function() {
    current--;
    render();
  });


});