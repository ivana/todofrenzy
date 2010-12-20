// show new item form
$('.todo_list .actions a.new').live('click', function(){
  $(this).closest('.todo_list').showNewItemForm();
  this.blur();
  return false;
});

$('form#new_item').
  // immediately after submitting new item to the server, add it to the list too
  live('submit', function(){
    var list = $(this).closest('.todo_list');
    // add the bare item HTML structure to the document
    list.find('.items').prepend('<li class="item pending"><div><input type="checkbox" /> <label></label></div></li>');
    // get the item description from the form input and populate the new `fake` item label
    list.find('.pending label').text($(this).find('#item_description').val());
    // clear the form input and focus it to be ready for next item input,
    // but do it after a short delay so the form has the chance to submit the value
    setTimeout(function() { list.focusItemInput() }, 20);
  }).
  // the server has confirmed that the item was added
  live('ajax:success', function(e, data){
    var list = $(this).closest('.todo_list');
    // replace the fake item with real HTML
    list.find('.items').find('.pending:last').replaceWith(data);
  }).
  live('keyup', function(e){
    // dismiss new item form on ESCAPE key
    if (e.which == 27) {
      e.preventDefault();
      $(this).hide();
    }
  });

if (iPhone) {
  // dismiss the new item form when the user has dismissed the iPhone keyboard
  $('input#item_description').live('blur', function(e){
    $(this).closest('form#new_item').hide();
  });
}

// handle the cancel button in new item form
$('form#new_item input[type="button"]').live('click', function(){
  $('form#new_todo_list').after($('form#new_item').hide());
});

// handle checkbox change for each item
$('form.edit_item input[type="checkbox"]').live('change', function(){
  // submit the embedded form and, without waiting, mark the item as changed
  $(this).closest('form').submit().updateItemState();
});

// handle server error while updating item state
$('form.edit_item').live('ajax:error', function(e, xhr){
  // updating item failed, so undo the change of item state
  $(this).toggleItemState();
  alert("There's been an error saving item state");
})

/* helper functions */

$.fn.toggleItemState = function(){
  // toggle item checkbox and update its done state
  var input = this.find('input[type=checkbox]');
  input.attr('checked', !input.is(':checked'));
  return this.updateItemState();
};

$.fn.updateItemState = function(){
  var item = this.closest('li');
  // if the checkbox is checked, mark the item as done and move it to the end
  if (item.find('input[type=checkbox]').is(':checked')) {
    item.addClass('done').appendTo(item.parent());
    item.closest('.todo_list').addClass('has-done');
  } else {
    item.removeClass('done').prependTo(item.parent());
    item.closest('.todo_list').not(':has(.item.done)').removeClass('has-done');
  }
  return this;
};

$.fn.showNewItemForm = function(){
  $('form#new_item').insertBefore(this.find('.items')).show();
  this.focusItemInput();
  // scroll to snap to the current todo list container
  if (iPhone) scrollTo(0, this.offset().top - 5);
  this.find('input#todo_list_id').val(this.domId());
  return this;
};

$.fn.focusItemInput = function(){
  this.find('input#item_description').val('').focus();
  return this;
};

$.fn.domId = function(){
  return this.attr('id').match(/\d+$/)[0];
};
