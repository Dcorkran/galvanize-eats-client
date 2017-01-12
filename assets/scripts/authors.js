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
  return authors;
}
