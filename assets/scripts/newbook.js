$( document ).ready(function() {
  postBook()


});


function postBook(){
  $('#add-book-form').on('submit',function(event){
    event.preventDefault();
    let bookData = $(this).serialize();
    return $.post(`${SERVER_URL}/books`,bookData)
      .then((data)=>{
        console.log(data);
      });
  });
}
