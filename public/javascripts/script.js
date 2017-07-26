$(document).ready(function() {
  mobileMenu();
  quillConfig();
  newPost();
  editPost();
  newComment();
  hideFlashMessage();
});

// responsive menu for mobile
const mobileMenu = function() {
  const $hamburgerButton = $(".right.menu.open");
  const $verticalMenu = $(".ui.vertical.menu");
  $hamburgerButton.on("click", function(event) {
    event.preventDefault();
    $verticalMenu.toggle();
  });
}

const quillConfig = function() {
  quill = new Quill(".editor", {
    modules: {
      toolbar: {
        container: [
          [{'header': [1, 2, 3, false]}],
          ['bold', 'italic', 'underline', 'strike'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{ 'align': [] }],
          [{'indent': '-1'}, {'indent': '+1'}],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          [{ 'color': [] }, { 'background': [] }],
          ['clean']
        ],
        handlers: {
          image: imageURL
        }
      }
    },
    theme: "snow"
  });
  // this enables the handler for posting images via a url
  function imageURL() {
    var range = this.quill.getSelection();
    var value = prompt('What is the image URL');
    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }
}

const newPost = function() {
  $("#new-post-form").on("submit", function() {
    const newBody = document.querySelector("input[name='post[body]']");
    newBody.value = quill.root.innerHTML;
    // body.value = JSON.stringify(quill.getContents());

    console.log("Submitted", $("#new-post-form").serialize(), $("#new-post-form").serializeArray());
    const $newData = $("#new-post-form").serialize();
  });
}

const editPost = function() {
  $("#edit-post-form").on("submit", function() {
    const editBody = document.querySelector("input[name='post[body]']");
    editBody.value = quill.root.innerHTML;
    // body.value = JSON.stringify(quill.getContents());

    console.log("Submitted", $("#edit-post-form").serialize(), $("#edit-post-form").serializeArray());
    const $editData = $("#edit-post-form").serialize();
  });
}

const newComment = function() {
  $("#comment-container").on("submit", "#comment-form", function(event) {
    event.preventDefault();
    const $url = $(this).attr("action");
    const $data = $(this).serialize();

    $.ajax({
      url: $url,
      type: 'POST',
      data: $data
    })
    .done(function(response) {
      if ($("#comment-box").length <= 0) {
        $("#comment-header").after(response);
      } else {
        $("#comment-container").children("#comment-box").last().append(response);
      }
      $("#comment-value").val("");
    })
    .fail(function() {
      console.log("error");
    });
  });
}

const hideFlashMessage = function() {
  $("#flash-message").show().delay(5000).fadeOut();
}