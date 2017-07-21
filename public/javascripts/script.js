$(document).ready(function() {
  tinyMCE();
  // newPost();
});

const tinyMCE = function() {
  tinymce.init({
    selector: 'textarea',
    plugins: ['preview link image lists'],
    menubar: false,
    branding: false,
    forced_root_block: ""
  });
}


const newPost = function() {
  const $newPost = $("#new-post-button");

  $.ajax({
    url: '/posts/new',
    type: 'GET'
  })
  .done(function(data) {
    $newPost.one("click", function(event) {
      event.preventDefault();
      $("#main-container").append(data);
    })
  })
  .fail(function() {
    console.log("error");
  });
}