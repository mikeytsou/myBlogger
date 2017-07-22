$(document).ready(function() {
  quillConfig();
  newPost();
  editPost();
});

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