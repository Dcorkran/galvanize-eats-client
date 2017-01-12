$( document ).ready(function() {
  getBooks()
    .then(cleanBookData)
    .then(deleteBook)
});


function getBooks(){
  console.log('hello1');
  return $.get(`${SERVER_URL}/books`);
}

function cleanBookData(books){
  console.log('hello2',books);
  let source = $('#book-template').html();
  let template = Handlebars.compile(source);
  let context = {books};
  let html = template(context);
  console.log('hello');
  $('#book-append').html(html);
  return books;
}

function deleteBook(){
  $('.delete-book-button').on('click',function(event){
    let bookID = {
      id:$(this).data('id')
    };
    $.ajax({
      url: `${SERVER_URL}/books`,
      method: "DELETE",
      data: bookID,
      dataType: "json",
      success: function() {
          window.location.replace(`${CLIENT_URL}/books.html`);
    }
    });
  });
}
