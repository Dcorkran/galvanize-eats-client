$( document ).ready(function() {
  getBookData();
});


function postBook(){
  $('#add-book-form').on('submit',function(event){
    event.preventDefault();
    let bookData = $(this).serialize();
    return $.post(`${SERVER_URL}/books`,bookData)
      .then((data)=>{
        window.location.replace(`${CLIENT_URL}/books.html`);
      });
  });
  getAuthors()
    .then((addAuthorInput))
}

function getBookData(){
  if (!window.location.search){
    addForm()
  } else {
    let query = parseInt(window.location.search.substring(window.location.search.indexOf('=') +1,window.location.search.length));
    return $.get(`${SERVER_URL}/books/${query}`)
    .then((addFormWithData))
  }
}

function addForm(){
  let source = $('#form-template').html();
  let template = Handlebars.compile(source);
  let context = {};
  let html = template(context);
  $('#append-form').html(html);
  postBook();
}

function addFormWithData(bookData){
  console.log('yoooo');
  let source = $('#form-template').html();
  let template = Handlebars.compile(source);
  let context = bookData[0];
  let html = template(context);
  $('#append-form').html(html);
  updateBook(context.id);
}

function updateBook(id){
  //Needs to be updated to include authors
  getAuthors()
    .then((addAuthorInput))
  $('#add-book-form').on('submit',function(event){
    event.preventDefault();
    let bookData = $(this).serialize();
    $.ajax({
      url: `${SERVER_URL}/books/${id}`,
      method: "PUT",
      data: bookData,
      dataType: "json",
      success: function() {
        window.location.replace(`${CLIENT_URL}/books.html`);
      }
    });
  });
}

function getAuthors(){
  return $.get(`${SERVER_URL}/authors`)
}

function addAuthorInput(authors){
  console.log('yo',authors);
  for (var i = 0; i < authors.length; i++) {
    let $option = `<option>${authors[i]['First Name']} ${authors[i]['Last Name']}</option>`;
    $('#author-input').append($option);
  }
}
