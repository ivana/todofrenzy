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

  $('form#new_todo_list').live('ajax:success', function(event, data){
    $('body > ol').prepend(data).children().first().showNewItemForm();
    hideListForm();
  }); // save new list

  $('form#new_todo_list').live('keyup', function(e){
    // dismiss dynamic form on ESCAPE key
    if (e.which == 27) hideListForm();
  });

  $('.actions a[data-method=delete]').live('ajax:success', function(event, data){
    var list = $(this).closest('.todo_list');
    // safety check: is there a new item form inside? we don't want it to be destroyed with list
    $('form#new_todo_list').after(list.find('form#new_item').hide());
    list.remove();
  });

  $('.actions a[href$="/clear"]').live('ajax:success', function(event, data){
    $.each(data, function(index, value){
      $('#item_' + value.item.id).remove()
    });
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