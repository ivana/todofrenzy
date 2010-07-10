$(function(){

  $('a.new-item').live('click', function(){
    $(this).parents('.todo_list').showNewItemForm();
    return false;
  }); // show new item form

  $('form#new_item').live('submit', function(){
    var list = $(this).parents('.todo_list');

    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        list.find('.items').append(data);
        list.focusItemInput();
      }
    );

    return false;
  }); // add new item
  
  $('form#new_item').live('keyup', function(e){
    // dismiss dynamic form on ESCAPE key
    if (e.which == 27) $(this).hide();
  });

  $('form#new_item input[type="reset"]').live('click', function(){
    $('form#new_todo_list').after($('form#new_item').hide());
  }); // close add new item form

  $('form.edit_item input[type="checkbox"]').live('change', function(){
    $(this).parents('form').submit();
  });
  
  $('form.edit_item').live('ajax:success', function(event, data){
    var form = $(this), item = form.closest('li'), label = form.find('label');
    if (data.item.done) {
      label.addClass('done');
      item.appendTo(item.parent());
    } else {
      label.removeClass('done');
      item.prependTo(item.parent());
    }
  });

  /* helper functions */

  $.fn.showNewItemForm = function(){
    $('form#new_item').insertBefore(this.find('.items')).show();
    this.focusItemInput();
    this.find('input#todo_list_id').val(this.domId());
  };

  $.fn.focusItemInput = function(){
    this.find('input#item_description').val('').focus();
  };
  
  $.fn.domId = function(){
    return this.attr('id').match(/\d+$/)[0];
  };

});
