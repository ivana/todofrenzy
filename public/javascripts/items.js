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

  $('input[type="checkbox"][id^="item"]').live('click', function(){
    var id = $(this).attr('id').match(/\d+/)[0];
    var url = $(this).parents('form').attr('action') + '/' + id;
    var formId = $(this).parents('form').attr('id');

    $.ajax({
      url: url,
      type: 'PUT',
      data: $('#' + formId).serialize(),
      success: function(data){
        if(data.item.done){
          $('#' + formId + ' label').addClass('done');
          $($('#' + formId).parents('ul.items')[0]).append($('#' + formId).parents('li')[0]); // move to bottom of the list
        } else {
          $('#' + formId + ' label').removeClass('done');
          $($('#' + formId).parents('ul.items')[0]).prepend($('#' + formId).parents('li')[0]); // move to top of the list
        }
      }
    });
    
  }); // item checked


  /* helper functions */

  $.fn.showNewItemForm = function(){
    $('form#new_item').insertBefore(this.find('.items')).show();
    this.focusItemInput();
    this.find('#todo_list_id').val(this.domId());
  };

  $.fn.focusItemInput = function(){
    this.find('input#item_description').val('').focus();
  };
  
  $.fn.domId = function(){
    return this.attr('id').match(/\d+$/)[0];
  };

});
