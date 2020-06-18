$(document).ready(function() {
  $('#saveModal').modal(); 
  $('#modalMessage').modal(); 
  $('#articleModal').modal(); 

  $('.searchArticle').on("click", () => { 
    fetch("/api/search", {method: "GET"}).then(() => window.location.replace("/api/search"));
  }); 

  $('.addArticle').on("click", function(element) { 
    let headline = $(this).attr("data-headline");
    let summary = $(this).attr("data-summary");
    let url = $(this).attr("data-url");
    let imageURL = $(this).attr("data-imageURL");
    let slug = $(this).attr("data-slug");
    let modalID = $(this).attr("data-url") + "modal"

    let savedArticle = {
      headline,
      summary,
      url,
      imageURL,
      slug,
      comments: null
    };

    fetch("/api/add", { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(savedArticle)
    }).then((response) => {
      console.log(response)
      $("#modalMessage").modal('open');
      $("#modalMessage .modal-content ").html("<h4> Sucessfully Added Article </h4>");
      setTimeout(() => $("#modalMessage").modal('close'), 1500);
      $(document.getElementById(url)).css('display', 'none');
    });

  }); 

  $('.savedArticles').on("click", () => { 
    console.log("Saved Button clicked");
    $(".collection").html("");
    $("#textarea1").val("");

    fetch("/api/savedArticles", {method: "GET"}).then(response => response.json()).then((response) => {
      response.map(article => {
        let articleDiv = "<li id='" + article["_id"] + "' data-url='" + article.url + "' data-slug='" + article.slug + "' class='collection-item avatar hover modal-trigger' href='#articleModal'><img src='" + article.imageURL + "'class='circle'><span class='title'>" + article.headline + "</span><p>" + article.summary + "</P><a class='secondary-content deleteArticle'><i class='material-icons hoverRed'>delete_forever</i></a></li>";
        $(".collection").prepend(articleDiv);
        sessionStorage.setItem(article["_id"], JSON.stringify(article)) 

        $(document.getElementById(article["_id"])).on("click", function(event) { 

          let modalID = $(this).attr("id");

          let sessionArticle = JSON.parse(sessionStorage.getItem(modalID));
          $('#articleModal').modal("open");
          let title = $(this).children(".title").text();
          $('#articleID').text(title);

          $(".addComment").on("click", function() { 
            let note = $('#textarea1').val();
            let noteObject = {
              body: {
                body: note
              },
              articleID: {
                articleID: modalID
              }
            }

            fetch("/api/createNotes", { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(noteObject)
            }).then((response) => {
              location.reload();
            });
          });


          // Create fetch notes

      });
    });
  }); 
}); 
});
