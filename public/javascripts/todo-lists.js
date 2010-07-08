$(function(){

  $('a.create').live('click', function(){
    showListForm();
    return false;
  }); // show new list form

  $(document).keypress(function(e){
    if (e.which == 65 && $(e.target).parents('form:not(:hidden)').size() == 0) {
      showListForm();
      return false;
    }
  });

  $('form#new_todo_list input[type="reset"]').live('click', function(){
    hideListForm();
    return false;
  }); // cancel new list creation


  $('form#new_todo_list').live('submit', function(){

    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        $('body > ol').prepend(data);
        var listId = $(data).attr('id').match(/\d+$/)[0];

        hideListForm();
        $.showNewItemForm(listId);
      }
    );

    return false;
  }); // save new list

  $('form#new_todo_list').live('keyup', function(e){
    // dismiss dynamic form on ESCAPE key
    if (e.which == 27) hideListForm();
  });


  $('a.del').live('click', function(){
    if(confirm('Are you sure you want to delete this list? There is no undo!')){

      $.ajax({
        url: $(this).attr('href'),
        type: 'DELETE',
        data:'', // due to jQuery + Chrome love for PUT and DELETE
        success: function(data){
          var listId = data.todo_list.id;

          // safety check: is there a new item form inside? we don't want it to be destroyed with list
          if($('#todo_list_' + listId + ' form#new_item').length){
            $('form#new_todo_list').after($('form#new_item').hide());
          }

          $('#todo_list_' + listId).remove();
        }
      });
    }
    
    return false;
  }); // delete list


  $('a.clear').live('click', function(){

    $.ajax({
      url: $(this).attr('href'),
      type: 'PUT',
      data:'', // due to jQuery + Chrome love for PUT and DELETE
      success: function(data){
        $.each(data, function(index, value){
          $($('#item_' + value.item.id).parents('li')[0]).remove()
        });
      }
    });

    return false;
  }); // clear done items


  /* helper functions */
  
  function showListForm() {
    var form = $('form#new_todo_list');
    if (form.is(":hidden")) {
      form.show().find('input#todo_list_name').val('').focus();
      $('a.create').hide();
    }
  }
  
  function hideListForm() {
    $('form#new_todo_list').hide();
    $('a.create').show();
  }

});