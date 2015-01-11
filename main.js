// Write a cat model HERE!
var Cat = function (escape_points, location) {
  this.escape_points = escape_points;
  this.location = location;
  this.updateEscapes = function(esc) {
    this.escape_points = this.escape_points + esc;
  };
  this.updateLocation = function(l) {
    this.location = l;
  };
};

var Room = function (new_name, new_description, new_exits, new_points) {
  this.name = new_name;
  this.description = new_description;
  this.exits = new_exits;
  this.points = new_points;
  this.getDescription = function(){
    return this.name + ": " + this.description;
  };
};

//
// Begin fixture data!
//
var kitchen = new Room(
  "Kitchen",
  "A nice roomy kitchen. Not very safe. There may be dogs nearby.",
  ["Living Room", "Dining Room"],
  0
);

var living_room = new Room(
  "Living Room",
  "Lots of perches, but frequently full of dogs. Kind of safe, but not a good spot for naps!",
  ["Kitchen"],
  2
);

var dining_room = new Room(
  "Dining Room",
  "There's a big table and some chairs and OH NO IT'S A DOG",
  ["Kitchen", "Bedroom"],
  -4
);

var bedroom = new Room(
  "Bedroom",
  "YAY! We finally found the nice toasty warm sunbeam!",
  ["Stairs"],
  20
);

//
// End fixture data!
//

// don't forget to populate this with data!
var starbuck = new Cat(5, kitchen);

// hash table for room object lookup
var rooms = new Object();
rooms["Dining Room"] = dining_room;
rooms["Living Room"] = living_room;
rooms["Kitchen"] = kitchen;
rooms["Bedroom"] = bedroom;
rooms["Stairs"] = "Stairs are here";

var gamePlay = function() {
  // Generate title.
  $("h1").html(starbuck.location.name);

  // Escape points
  $("#points").html("Starbuck has " + starbuck.escape_points + " escape points");

  // Check if stairs are room, change text indicating escape points
  if (starbuck.location === rooms["Stairs"]) {
    console.log("THIS IS HERE");
    $("#points").html("These are just stairs");
  }

  // Counting room divs for for-loop
  var roomDivs = $(".options").children().length - 1;

  // Show all rooms at beginning as default for hide function later
  $(".rooms").show();

  // Updating rooms
  var exits = starbuck.location.exits;
  for (i = 0; i < roomDivs; i ++ ){
    var exit = exits[i];

    console.log(exit);
    // null check for room not in existence
    if (exit === undefined) {
      $("#room" + (i+1) ).hide();
    }

    $("#room"+ (i+1)).html("<span class='run' id='go" + exit.replace(" ", "_") + "'>Run to the " + exit + "</span><span class='look' id = '" + exit.replace(" ", "_") + "'> Look at the " + exit + "</span>");

    // Description flash
    $("#" + exit.replace(" ", "_")).click(function() {
      var roomName = $(this).attr("id").replace("_"," ")
      alert( rooms[roomName].getDescription() );
    });

    // Action of going into new room
    $("#go" + exit.replace(" ", "_")).click(function(){
      var roomName = $(this).attr("id").replace("_"," ").replace("go","");
      $("h1").html( rooms[roomName].name );
      starbuck.updateLocation(rooms[roomName]);
      if (starbuck.location != rooms["Stairs"]) {
        starbuck.updateEscapes(rooms[roomName].points);
      }
      gamePlay();
    });
  }
};

$(document).ready(function(){
  // should be replaced with your beginning/end game logic

    gamePlay();

});
