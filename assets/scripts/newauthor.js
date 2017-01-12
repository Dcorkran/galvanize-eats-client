$( document ).ready(function() {
  getAuthorData();
  getBooks()
    .then(addBookInput);
});


function getAuthorData(){
  if (!window.location.search){
    addForm()
  } else {
    let query = parseInt(window.location.search.substring(window.location.search.indexOf('=') +1,window.location.search.length));
    return $.get(`${SERVER_URL}/books/${query}`)
    .then((addFormWithData))
  }
}

function addForm(){
  let source = $('#author-form-template').html();
  let template = Handlebars.compile(source);
  let context = {};
  let html = template(context);
  $('#append-author-form').html(html);
  postAuthor();
}

function postAuthor(){
  $('#add-author-form').on('submit',function(event){
    event.preventDefault();
    let authorData = $(this).serialize();
    return $.post(`${SERVER_URL}/authors`,authorData)
      .then((data)=>{
        window.location.replace(`${CLIENT_URL}/authors.html`);
      });
  });
}

function getBooks(){
  return $.get(`${SERVER_URL}/books`)
}

function addBookInput(books){
  for (var i = 0; i < books.length; i++) {
    let $option = `<option>${books[i]['Book Title']}</option>`;
      $('#book-input').append($option)
  }


}
