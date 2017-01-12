$( document ).ready(function() {
  getBooks()
    .then(cleanBookData)
    .then(()=>{
      console.log('test');
    });
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
