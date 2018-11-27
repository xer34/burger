$(function() {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    console.log(this + 'clicked!')
    var newDevoured = $(this).data("newdevoured");
    console.log(newDevoured);
    var newDevouredState = {
      devoured: newDevoured
    };
    console.log(newDevouredState)
    
    $.ajax("/api/burger/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(function() {
      console.log("changed devoured to", newDevoured);
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = {
      name: $("#ca")
        .val()
        .trim(),
      devoured: $("[name=devoured]:checked")
        .val()
        .trim()
    };
    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("created new burger");
      location.reload();
    });
  });
});
