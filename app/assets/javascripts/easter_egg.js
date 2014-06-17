$(document).on('page:load',
  $(document).on('keydown', function(event) {
    if (event.keyCode === 68) {
      $( "#board").prepend("<img src='http://www.reactiongifs.com/r/seal-of-approval2.gif'>")
    };
  })
);
