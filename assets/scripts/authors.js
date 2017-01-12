$( document ).ready(function() {
  getAuthors()
  .then(cleanBookData);
});

function getAuthors(){
  return $.get(`${SERVER_URL}/authors`)
}
function cleanBookData(authors){
  console.log(authors);
  let source = $('#author-template').html();
  let template = Handlebars.compile(source);
  let context = {authors};
  let html = template(context);
  $('#author-append').html(html);
  addDelete();
}

function addDelete(){
  $('.delete-author-button').on('click',function(event){
    let authorID = {
      id:$(this).data('id')
    };
    $.ajax({
      url: `${SERVER_URL}/authors`,
      method: "DELETE",
      data: authorID,
      dataType: "json",
      success: function() {
          window.location.replace(`${CLIENT_URL}/authors.html`);
    }
    });
  })
}
