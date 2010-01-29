$(function(){

  $('h1 + a').click(function(){  // new list form
    $(this).hide();
    $('form#new_todo_list').show();
  });

  $('form#new_todo_list input[type="reset"]').click(function(){ // cancel new list creation
    $('form#new_todo_list').hide();
    $('h1 + a').show();
  });

});