$(function(){

  $('h1 + a').live('click', function(){
    toggleCreateNewListElements();
    $('input#todo_list_name').focus();
    return false;
  }); // show new list form


  $('form#new_todo_list input[type="reset"]').live('click', function(){
    toggleCreateNewListElements();
    return false;
  }); // cancel new list creation


  $('form#new_todo_list').live('submit', function(){
    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        $('body > ol').prepend('<li><h2>' + data.todo_list.name + '</h2></li>');
      }
    );

    toggleCreateNewListElements();
    return false;
  }); // save new list


  $('a.del').live('click', function(){
    if(confirm('Sure?')){
      
      $.ajax({
        url: $(this).attr('href'),
        type: 'DELETE',
        success: function(data){
          $('#todo_list_' + data.todo_list.id).remove();
        }
      });
    }
    
    return false;
  }); // delete list


  $('a.clear').live('click', function(){

    $.ajax({
      url: $(this).attr('href'),
      type: 'PUT',
      success: function(data){
        $.each(data, function(index, value){
          $($('#item_' + value.item.id).parents('li')[0]).remove()
        });
      }
    });

    return false;
  }); // clear done items


/*
  $('li[id^="todo_list"] > a').live('mouseenter', function(){
    $(this).children('span').css('visibility', 'visible');
  });
  $('li[id^="todo_list"] > a').live('mouseleave', function(){
    $(this).children('span').css('visibility', 'hidden');
  }); // list title hover
*/


/*
  $('li[id^="todo_list"] > a').live('click', function(){
  }); // edit list title
*/

  
  /* helper functions */
  
  var toggleCreateNewListElements = function(){
    $('input#todo_list_name').val('');
    $('form#new_todo_list').toggle(); // there could be some troubles with jQuery toggle in IE
    $('h1 + a').toggle();
  }; // toggle form and button - show one, hide another

});