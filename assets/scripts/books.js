$( document ).ready(function() {
  getBooks()
    .then(cleanBookData)
    .then(deleteBook)
    .then(updateBookButton)
});


function getBooks(){
  return $.get(`${SERVER_URL}/books`);
}

function cleanBookData(books){
  let source = $('#book-template').html();
  let template = Handlebars.compile(source);
  let context = {books};
  let html = template(context);
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

function updateBookButton(){
  $('.update-book-button').on('click',function(){
    let id = $(this).data('id');
    window.location.replace(`${CLIENT_URL}/newbook.html?id=${id}`);
  });
}
