// grab the articles as a json
var currentvid = 0
var thisId;
function loadvideo() {
  $('#articles').empty();
  $.getJSON('/articles', function(data) {
    // for each one
    thisId = data[currentvid]._id;
    console.log('thisid '+ thisId);
      var link = data[currentvid].link.split('=')[1];
      // display the apropos information on the page
      $('#articles').append('<h2 data-id="' + data[currentvid]._id + '">'+ data[currentvid].title + '</h2>');
      $('#articles').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+link+'" frameborder="0" allowfullscreen></iframe>')
  })
  .done(function() {
    loadnotes()
  });
};
function loadnotes() {
  
  $('#notes').empty();
  // save the id from the p tag
   console.log(thisId);
  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      console.log(data); 
      // a textarea to add a new note body
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>');   
      // a button to submit a new note, with the id of the article saved to it
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      // if there's a note in the article
      if(data.note){
        // place the title of the note in the title input
        $('#titleinput').val(data.note.title);
        // place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
}
// whenever someone clicks a p tag
$(document).on('click', '#prev', function(){
 currentvid--;
 loadvideo();
});
$(document).on('click', '#next', function(){
 currentvid++;
 loadvideo();
});

// when you click the savenote button
$(document).on('click', '#savenote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#bodyinput').val("");
  loadnotes();
});
loadvideo();
 $.ajax({
    method: "GET",
    url: "/scrape/"
  })