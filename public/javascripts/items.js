$(function(){

  $('a.new-item').live('click', function(){
    var listId = $(this).parents('li[id^=todo_list_]').attr('id').match(/\d+$/)[0];
    showNewItemForm(listId);
    return false;
  }); // show new item form


  $('form#new_item').live('submit', function(){
    var listId = $(this).find('#item_todo_list_id').attr('value');

    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        $('#todo_list_' + listId + ' .items').append(data);
        $('input#item_description').val('').focus();
      }
    );

    return false;
  }); // add new item

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

  var showNewItemForm = function(listId){
    $('form#new_item').show().insertBefore('#todo_list_' + listId + ' .items');
    $('#item_todo_list_id').val(listId);
    $('input#item_description').val('').focus();
  };

  $.extend({
    showNewItemForm: showNewItemForm
  });

});
