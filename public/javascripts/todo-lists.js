var supportsTouch = 'createTouch' in document,
    iPhone = supportsTouch && /\b(iPhone|iPod)\b/.test(navigator.userAgent);

$(document.body).
  addClass((iPhone ? '' : 'no-') + 'iphone').
  addClass((supportsTouch ? '' : 'no-') + 'touch');

// show new list form
$('a.create').live('click', function(){
  showListForm();
  return false;
});

// show new list form on Shift + A
$(document).keypress(function(e){
  if (e.which == 65 && $(e.target).parents('form:not(:hidden)').size() == 0) {
    showListForm();
    return false;
  }
});

// dissmiss new list form
$('form#new_todo_list input[type="button"]').live('click', function(){
  hideListForm();
  return false;
});

// insert the created list into the document
$('form#new_todo_list').live('ajax:success', function(event, data){
  hideListForm();
  $('body > ol').prepend(data).children(':first').showNewItemForm();
});

// dismiss new list form on ESCAPE key
$('form#new_todo_list').live('keyup', function(e){
  if (e.which == 27) hideListForm();
});

$('.todo_list .actions a.delete').
  // user has chosen to delete the todo list; hide it while we wait for the server
  live('ajax:beforeSend', function(e){
    $(this).closest('.todo_list').hide();
  }).
  // todo list successfully deleted; remove it from the document
  live('ajax:success', function(e, data){
    var list = $(this).closest('.todo_list');
    // safety check: is there a new item form inside? we don't want it to be destroyed with list
    $('form#new_todo_list').after(list.find('form#new_item').hide());
    list.remove();
  }).
  // didn't manage to delete the todo list; unhide it
  live('ajax:error', function(e, xhr){
    $(this).closest('.todo_list').show();
    alert("There's been an error deleting this todo list");
  });

$('.todo_list .actions a.clear').
  // user has chosen to clear done items, so hide them
  live('click', function(e){
    $(this).closest('.todo_list').find('.item.done').hide();
  }).
  // done items deleted on the server; delete them from the document, too
  live('ajax:success', function(e, data){
    $(this).closest('.todo_list').find('.item.done:hidden').remove();
  }).
  // error clearing done items; unhide them
  live('ajax:error', function(e, xhr){
    $(this).closest('.todo_list').find('.item.done:hidden').show();
    alert("There's been an error clearing done items");
  });

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
