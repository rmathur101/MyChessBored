
//assigning points to pieces to keep track of score (ICEBOX)

var WHITE_KING = 100;
var WHITE_QUEEN = 90;
var WHITE_ROOK = 50;
var WHITE_BISHOP = 31;
var WHITE_KNIGHT = 30;
var WHITE_PAWN = 10;

var BLACK_KING = -WHITE_KING;
var BLACK_QUEEN = -WHITE_QUEEN;
var BLACK_ROOK = -WHITE_ROOK;
var BLACK_BISHOP = -WHITE_BISHOP;
var BLACK_KNIGHT = -WHITE_KNIGHT;
var BLACK_PAWN = -WHITE_PAWN;

//-----------------------------------------------------------------------

var board = [[BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
             [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
             [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK]];


function getsquareName(squareValue){
    switch (squareValue) {
        case WHITE_KING:
            return 'WHITE_KING';
            break;
        case WHITE_QUEEN:
            return 'WHITE_QUEEN';
            break;
        case WHITE_ROOK:
            return 'WHITE_ROOK';
            break;
        case WHITE_BISHOP:
            return 'WHITE_BISHOP';
            break;
        case WHITE_KNIGHT:
            return 'WHITE_KNIGHT';
            break;
        case WHITE_PAWN:
            return 'WHITE_PAWN';
            break;

        case BLACK_KING:
            return 'BLACK_KING';
            break;
        case BLACK_QUEEN:
            return 'BLACK_QUEEN';
            break;
        case BLACK_ROOK:
            return 'BLACK_ROOK';
            break;
        case BLACK_BISHOP:
            return 'BLACK_BISHOP';
            break;
        case BLACK_KNIGHT:
            return 'BLACK_KNIGHT';
            break;
        case BLACK_PAWN:
            return 'BLACK_PAWN';
            break;

        default:
            return 'EMPTY';
            break;
    }
}

var activeplayer = "white" //declaration of the player to make first move


//-----------------------------------------------------------------------
var drawBoard = function (){
    var num = 1;
    var str = '';
    //building rows
    for( var i = 0 ; i < 8 ; i++ ){
      str += '<div class="row">';
    //building columns
    for( var j = 0 ; j < 8 ; j++ ){
      str += '<div id=' + num++ + ' class="column ' +
      ( (i + j) % 2 === 0 ? 'light': 'dark') + '">' +
      '<div class="piece ' + getsquareName(board[i][j]) + '"></div>' +
      '</div>';
    }
    str += '</div>';
    }
  $('#board').append(str);
};

//this is appended to the board
// <div class="row">
//    <div id=1 class=column light>
//    <div class= piece BLACK_PAWN>"This is where the image of the piece goes"</div>
//    </div>
//</div>
//-----------------------------------------------------------------------


var ready = function() {
    drawBoard();
};

$(document).ready(ready);
$(document).on('page:load', ready);

function parse_piece_information(current_piece){
    class_array = current_piece.className.split(" ")[1];
    var piece_location = current_piece.parentNode.id;
    var piece_info = class_array.match(/(.*)(_)(.*)/);
    var piece_color = (piece_info[1]).toLowerCase();
    var piece_type = (piece_info[3]).toLowerCase();
    return {piece_location: piece_location, piece_color: piece_color, piece_type: piece_type}
}
// I wrote this method. it take a current piece (the data type is?) and returns a hash with the info


$(function(){ //"document ready"

  $(".piece").draggable({
    revert: true,
    stack: ".piece",
    start: function(e, ui) {
      var current_piece = ui.helper[0];
    }
  });

  $('[class*=" BLACK"]').draggable( 'disable' )

  $('.column').droppable({
    disabled: true,
    drop: function( event, ui) {
    
    var the_piece_in_div = $(this).find('div')
    var piece_class_names = the_piece_in_div.attr("class");
    if (piece_class_names != undefined){
      var piece_name = piece_class_names.split(" ")[1];
      if (piece_name.match(/WHITE_.*/)){
        $("#white-dead").append(the_piece_in_div);
        $("#white-dead div").css("height", "50px");
        $("#white-dead div").css("width", "50px");
      }
      else if (piece_name.match(/BLACK_.*/)){
        $("#black-dead").append(the_piece_in_div);
        $("#black-dead div").css("height", "50px");
        $("#black-dead div").css("width", "50px");
        // $("#black-dead").children('div').css("height" "50px")
      }
    }


    $(this).empty();
    var $piece = ui.draggable
    $piece.appendTo($(this));
    switch (activeplayer){
      case "white":
        activeplayer = "black"
        $('[class*=" WHITE"]').draggable( 'disable' )
        $('[class*=" BLACK"]').draggable( 'enable' )
        break;
      case "black":
        activeplayer = "white"
        $('[class*=" WHITE"]').draggable( 'enable' )
        $('[class*=" BLACK"]').draggable( 'disable' )
        break;
    }

    $(".column").removeClass("possibleLocations");
    $(".column").droppable("disable");
  }
}),

  $(".piece").mouseover(function(){
    var current_piece = parse_piece_information($(this)[0])
    var left_stop = false
    var right_stop = false
    var up_stop = false
    var down_stop = false
    var up_left_stop = false
    var up_right_stop = false
    var down_left_stop = false
    var down_right_stop = false

    $.ajax({
      type: "POST",
      url: "/get_piece_info",
      data: current_piece,
      complete: {},
      success: function(response){
        var array_possible_divs = []
        var array = response[0]
        for(var i = 0; i < array.length; i++){
          if (activeplayer === "white" && current_piece.piece_color === activeplayer){
            var the_piece_in_div = $("#" + array[i]).find('div')
            var piece_class_names = the_piece_in_div.attr("class");
            if (piece_class_names != undefined){
              var piece_name = piece_class_names.split(" ")[1];
              if (piece_name.match(/BLACK_.*/)){
                $("#" + array[i]).addClass("possibleLocations");
                $("#" + array[i]).droppable("enable");
              }
            }
          }
          if (activeplayer === "black" && current_piece.piece_color === activeplayer){
            var the_piece_in_div = $("#" + array[i]).find('div')
            var piece_class_names = the_piece_in_div.attr("class");
            if (piece_class_names != undefined){
              var piece_name = piece_class_names.split(" ")[1];
              if (piece_name.match(/WHITE_.*/)){
                $("#" + array[i]).addClass("possibleLocations");
                $("#" + array[i]).droppable("enable");
              }
            }
          }
          if ( $("#" + array[i]).children().length == 0 && current_piece.piece_color === activeplayer ){ //or if the div containes a piece of the opposite color
            $("#" + array[i]).addClass("possibleLocations");
            array_possible_divs.push($("#" + array[i]));
            $("#" + array[i]).droppable("enable");
          }
        }

        //console.log(current_piece.piece_location)
        var current_location = current_piece.piece_location
        var current_row = Math.ceil(current_location/8)
        var current_col = current_location%8
        var current_row_min = current_row * 8 - 7
        var current_row_max = current_row * 8
        if (current_col != 0) {
          var current_col_max = 56 + current_col
          var current_col_min = 0 + current_col
        }
        else {
          var current_col_max = 64
          var current_col_min = 1
        }
        for (var i = 1; i <=8; i++) {
          var check_left = parseInt(current_location) - i
          var check_right = parseInt(current_location) + i
          var check_up = parseInt(current_location) + (8 * i)
          var check_down = parseInt(current_location) - (8 * i)
          var check_up_left = parseInt(current_location) + (7 * i)
          var check_up_right = parseInt(current_location) + (9 * i)
          var check_down_left = parseInt(current_location) - (7 * i)
          var check_down_right = parseInt(current_location) - (9 * i)

          //---HORIZONTAL
          if (!left_stop && check_left >= 1) {
            if ( $("#" + check_left).children().length != 0 && current_row == Math.ceil(check_left/8) ) {
              left_stop = check_left;
            }
          }

          if (!right_stop && check_right <= 64) {
            if ( $("#" + check_right).children().length != 0 && current_row == Math.ceil(check_right/8) ) {
              right_stop = check_right
            }
          }

          //---VERTICAL
          if (!up_stop && check_up <= 64) {
            if ( $("#" + check_up).children().length != 0 && current_col == Math.ceil(check_up%8) ) {
              up_stop = check_up
            }
          }

          if (!down_stop && check_down >=1) {
            if ( $("#" + check_down).children().length != 0 && current_col == Math.ceil(check_down%8) ) {
              down_stop = check_down
            }
          }

          //---DIAGONAL
          if (!up_right_stop && check_up_right <= 64) {
            if ( $("#" + check_up_right).children().length != 0 ) {
              up_right_stop = check_up_right;
            }
          }

          if (!up_left_stop && check_up_left <= 64) {
            if ( $("#" + check_up_left).children().length != 0 ) {
              up_left_stop = check_up_left
            }
          }

          if (!down_right_stop && check_down_right >= 1) {
            if ( $("#" + check_down_right).children().length != 0 ) {
              down_right_stop = check_down_right
            }
          }

          if (!down_left_stop && check_down_left >= 1) {
            if ( $("#" + check_down_left).children().length != 0  ) {
              down_left_stop = check_down_left
            }
          }

        }

        // -------------BRING THE PAIN
        if (left_stop) {

            for (var i = current_row_min; i <= left_stop; i++) {
              if ( i == left_stop && (activeplayer === "white" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + left_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/BLACK_.*/) ){
                  return
                }
              }
              if ( i == left_stop && (activeplayer === "black" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + left_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/WHITE_.*/) ){
                  return
                }
              }
              $("#" + i).removeClass("possibleLocations")
              $("#" + i).droppable("disable")
            }
          }

          if (right_stop) {

            for (var i = right_stop; i <= current_row_max; i++) {
              if ( i == right_stop && (activeplayer === "white" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + right_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/BLACK_.*/) ){
                  i++
                }
              }
              if ( i == right_stop && (activeplayer === "black" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + right_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/WHITE_.*/) ){
                  i++
                }
              }
              $("#" + i).removeClass("possibleLocations")
              $("#" + i).droppable("disable")
            }

          }

          if (up_stop){
            for (var i = up_stop; i <= current_col_max; i+=8) {
              if ( i == up_stop && (activeplayer === "white" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + up_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/BLACK_.*/ ) ){
                  i+=8
                }
              }
              if ( i == up_stop && (activeplayer === "black" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + up_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/WHITE_.*/ ) ){
                  i+=8
                }
              }
              $("#" + i).removeClass("possibleLocations")
              $("#" + i).droppable("disable")
            }
          }

          if (down_stop) {
            for (var i = down_stop; i >= current_col_min; i-=8) {
              if ( i == down_stop && (activeplayer === "white" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + down_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/BLACK_.*/ ) ){
                  i-=8
                }
              }
              if ( i == down_stop && (activeplayer === "black" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + down_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/WHITE_.*/ ) ){
                  i-=8
                }
              }
              $("#" + i).removeClass("possibleLocations")
              $("#" + i).droppable("disable")
            }
          }

          if (down_right_stop) {
            for (var i = down_right_stop; i%8 != 0; i-=9) {
              if ( i == down_right_stop && (activeplayer === "white" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + down_right_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/BLACK_.*/) ){
                  i-=9
                }
              }
              if ( i == down_right_stop && (activeplayer === "black" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + down_right_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/WHITE_.*/) ){
                  i-=9
                }
              }
              $("#" + i).removeClass("possibleLocations")
              $("#" + i).droppable("disable")
            }
          }

          if (down_left_stop) {
            for (var i = down_left_stop; (i+7) %8 != 0; i-=7) {
              if ( i == down_left_stop && (activeplayer === "white" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + down_left_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/BLACK_.*/) ){
                  i-=7
                }
              }
              if ( i == down_left_stop && (activeplayer === "black" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + down_left_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/WHITE_.*/) ){
                  i-=7
                }
              }
              $("#" + i).removeClass("possibleLocations")
              $("#" + i).droppable("disable")
            }
          }

          if (up_right_stop) {
            for (var i = up_right_stop; (i+7) %8 != 0; i+=9) {
              if ( i == up_right_stop && (activeplayer === "white" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + up_right_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/BLACK_.*/) ){
                  i+=9
                }
              }
              if ( i == up_right_stop && (activeplayer === "black" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + up_right_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/WHITE_.*/) ){
                  i+=9
                }
              }
              $("#" + i).removeClass("possibleLocations")
              $("#" + i).droppable("disable")
            }
          }

          if (up_left_stop) {
            for (var i = up_left_stop; i%8 != 0; i+=7) {
              if ( i == up_left_stop && (activeplayer === "white" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + up_left_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/BLACK_.*/) ){
                  i+=7
                }
              }
              if ( i == up_left_stop && (activeplayer === "black" && current_piece.piece_color === activeplayer) ){
                var blocking_piece = $("#" + up_left_stop).find('div')[0];
                var blocking_piece = blocking_piece.className.split(" ")[1]
                if (blocking_piece.match(/WHITE_.*/) ){
                  i+=7
                }
              }
              $("#" + i).removeClass("possibleLocations")
              $("#" + i).droppable("disable")
            }
          }

          if (current_piece.piece_type == "pawn") {
            var location = parseInt(current_piece.piece_location)
            if (activeplayer == "white") {
              if ( location >= 56 || location <= 49) {
                $("#" + (location - 16) ).removeClass("possibleLocations");
                $("#" + (location - 16) ).droppable("disable");
              }
              if ($("#" + (location-8) ) .children().length != 0) {
                $("#" + (location - 8) ).removeClass("possibleLocations");
                $("#" + (location - 8) ).droppable("disable");
              };
              var possible_attacks = [(location - 9), (location-7)]
            }
            if (activeplayer == "black") {
              if ( location >= 16 || location <= 8) {
                $("#" + (location + 16) ).removeClass("possibleLocations");
                $("#" + (location + 16) ).droppable("disable");
              }
              if ($("#" + (location + 8) ) .children().length != 0) {
                $("#" + (location + 8) ).removeClass("possibleLocations");
                $("#" + (location + 8) ).droppable("disable");
              };
              var possible_attacks = [(location + 9), (location + 7)]
            }
            for (var i = 0; i < possible_attacks.length; i++) {
              var square = $("#" + possible_attacks[i])
              if ($(square).children().length != 0) {
                var piece = $(square).find('div')[0];
                piece = piece.className.split(" ")[1];
                if (activeplayer == 'white' && current_piece.piece_color === activeplayer) {
                  if (piece.match(/BLACK_.*/)){
                    $("#" + possible_attacks[i]).addClass("possibleLocations");
                    $("#" + possible_attacks[i]).droppable("enable");
                  }
                }
                if (activeplayer == 'black' && current_piece.piece_color === activeplayer) {
                  if (piece.match(/WHITE_.*/)){
                    $("#" + possible_attacks[i]).addClass("possibleLocations");
                    $("#" + possible_attacks[i]).droppable("enable");
                  }
                }
              }
            }
          }
      }
    })
  })
  $(".piece").mouseout(function(){
    $(".column").removeClass("possibleLocations");
    $(".column").droppable("disable");
  })
  //NOTES
  //javascript objects in arrays (black and white) iterate (piece type, location, color, first_move, dead)
  $('.EMPTY').remove();
});


//TO DO
//don't move black first
//make switch statment fire only when a piee is placed = not only when it is dropped
