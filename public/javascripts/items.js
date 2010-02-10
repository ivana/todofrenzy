$(function(){

  $('a.new-item').live('click', function(){ // show new item form
    var listId = $(this).parents('li[id^=todo_list_]').attr('id').match(/\d+$/)[0];

    $('form#new_item').show().insertBefore('#todo_list_' + listId + ' .items');
    $('#item_todo_list_id').val(listId);
    $('input#item_description').val('').focus();

    return false;
  });


  $('form#new_item').live('submit', function(){ // add new item

    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        $('#todo_list_' + data.item.todo_list_id + ' .items').append('<li>' + data.item.description + '</li>');
        $('input#item_description').val('').focus();
      }
    );

    return false;
  });

  $('form#new_item input[type="reset"]').live('click', function(){ // close add new item form
    $('form#new_item').hide();
  });

  $('input[type="checkbox"][id^="item"]').live('click', function(){ // item checked
    var id = $(this).attr('id').match(/\d+/)[0];
    var url = $(this).parents('form').attr('action') + '/' + id;
    var formId = $(this).parents('form').attr('id');
//    console.log($('#' + formId).serialize());

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

  });
});