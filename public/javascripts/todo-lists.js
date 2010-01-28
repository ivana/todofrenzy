$(function(){

  $('h1 + a').click(function(eventObject){  // new list form
    $(this).remove();
    $('#new_todo_list').show();
  });

});