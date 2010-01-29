$(function(){

  $('h1 + a').click(function(){  // show new list form
    toggleCreateNewListElements();
  });

  $('form#new_todo_list input[type="reset"]').click(function(){ // cancel new list creation
    toggleCreateNewListElements();
  });

  $('form#new_todo_list input[type="submit"]').click(function(){ // save new list
    $.post(
      $('form#new_todo_list').attr('action'),
      $('form#new_todo_list').serialize(),
      function(data){
        $('body > ol').prepend('<li><h2>' + data.todo_list.name + '</h2></li>');
      }
    );

    toggleCreateNewListElements();
    return false;
  });

  var toggleCreateNewListElements = function(){ // toggle form and button - show one, hide another
    $('input#todo_list_name').val('');
    $('form#new_todo_list').toggle(); // there could be some troubles with jQuery toggle in IE
    $('h1 + a').toggle();
  };

});