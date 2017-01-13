$( document ).ready(function() {
  checkQuery();
});

function checkQuery(){
  if (!window.location.search){
    getBooks()
      .then(cleanBookData)
      .then(deleteBook)
      .then(updateBookButton)
      .then(addAuthorLinks);
  } else {
    getOneBook()
      .then(cleanBookDataWithQuery)
      .then(deleteBook)
      .then(updateBookButton)
      .then(addAuthorLinks);
  }
}

function getBooks(){
  return $.get(`${SERVER_URL}/books`);
}

function cleanBookData(books){
  console.log(books);
  let source = $('#book-template').html();
  let template = Handlebars.compile(source);
  let context = {books};
  let html = template(context);
  $('#book-append').html(html);
  // console.log(books);
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

function cleanBookDataWithQuery(books){
  let source = $('#book-template').html();
  let template = Handlebars.compile(source);
  let context = {books};
  let html = template(context);
  $('#book-append').html(html);
  // console.log(books);
  // getAuthors(books)
  // .then(addAuthors);
}

function addAuthorLinks(){
  $('.author-link').on('click',function(){
    let id = $(this).data('id');
    window.location.replace(`${CLIENT_URL}/authors.html?id=${id}`);
  })
}

function getOneBook(){
  let query = parseInt(window.location.search.substring(window.location.search.indexOf('=') +1,window.location.search.length));
  return $.get(`${SERVER_URL}/books/${query}`)
}
