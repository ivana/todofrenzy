$(function(){

  $('h1 + a').live('click', function(){  // show new list form
    toggleCreateNewListElements();
  });

  $('form#new_todo_list input[type="reset"]').live('click', function(){ // cancel new list creation
    toggleCreateNewListElements();
  });

  $('form#new_todo_list').live('submit', function(){ // save new list
    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        $('body > ol').prepend('<li><h2>' + data.todo_list.name + '</h2></li>');
      }
    );

    toggleCreateNewListElements();
    return false;
  });

  $('a.del').live('click', function(){  // delete list
    var url = $(this).attr('href');

    $.ajax({
      url: url,
      type: 'DELETE',
      success: function(data){
        $('#todo_list_' + data.todo_list.id).remove();
      }
    });

    return false;
  });

  var toggleCreateNewListElements = function(){ // toggle form and button - show one, hide another
    $('input#todo_list_name').val('');
    $('form#new_todo_list').toggle(); // there could be some troubles with jQuery toggle in IE
    $('h1 + a').toggle();
  };

    // uhvati click na neki od delete linkova
    // treba pogledati njegovog parenta da se vidi koja je lista
//    $.delete(
//      '/todo_lists/<id>'
//    )


});