$(document).ready(function() {
  $("#tweet-text").on('input', (event) => {
    //use jQuery to target the counter class
     const counter = $(".counter")
//assign currentCount to the event character length, through the DOM
    let currentCount = event.target.value.length;
    let totalChars = 140;
    let charsLeft = totalChars - currentCount;
    counter.val(charsLeft);
    //not toggle, toggle turns on off, use add because it turns on the class and keeps it on
    if (charsLeft < 0) {
     $( ".counter" ).addClass( "counterRed" )
    } else {
      $( ".counter" ).removeClass( "counterRed" )
    }
  })
});