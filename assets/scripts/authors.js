$( document ).ready(function() {
  checkQuery();
});

function getAuthors(){
  return $.get(`${SERVER_URL}/authors`)
}
function cleanAuthorData(authors){
  console.log(authors);
  let source = $('#author-template').html();
  let template = Handlebars.compile(source);
  let context = {authors};
  let html = template(context);
  $('#author-append').html(html);
  addDelete();
  updateAuthorButton();
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

function updateAuthorButton(){
  $('.update-author-button').on('click',function(){
    let id = $(this).data('id');
    window.location.replace(`${CLIENT_URL}/newauthor.html?id=${id}`);
  });
}

function checkQuery(){
  if (!window.location.search){
    getAuthors()
      .then(cleanAuthorData)
      .then(addDelete)
      .then(updateAuthorButton)
  } else {
    let query = parseInt(window.location.search.substring(window.location.search.indexOf('=') +1,window.location.search.length));
    return $.get(`${SERVER_URL}/authors/${query}`)
    .then(cleanAuthorData);
  }
}
