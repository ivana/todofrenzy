# show new item form
$('.todo_list .actions a.new').live 'click', ->
  $(this).closest('.todo_list').showNewItemForm()
  this.blur();
  return false

# immediately after submitting new item to the server, add it to the list too
$('form#new_item').live 'submit', ->
  list = $(this).closest '.todo_list'
  # add the bare item HTML structure to the document
  list.find('.items').prepend '<li class="item pending"><div><input type="checkbox" /> <label></label></div></li>'
  # get the item description from the form input and populate the new `fake` item label
  list.find('.pending:first label').text($(this).find('#item_description').val())
  # clear the form input and focus it to be ready for next item input, 
  # but do it after a short delay so the form has the chance to submit the value
  setTimeout `function() { list.focusItemInput() }`, 20

# the server has confirmed that the item was added, replace the pending (fake) item with real HTML
$('form#new_item').live 'ajax:success', (e, data, status, xhr) ->
    $(this).closest('.todo_list').find('.pending:first').replaceWith data

# dismiss new item form on ESC
$('form#new_item').live 'keyup', (e) ->
  if e.which == 27
    e.preventDefault()
    $(this).hide()


# dismiss the new item form when the user has dismissed the iPhone keyboard
if iPhone
  $('input#item_description').live 'blur', (e) -> $(this).closest('form#new_item').hide()

# handle the cancel button in new item form
$('form#new_item input[type="button"]').live 'click', -> $('form#new_todo_list').after $('form#new_item').hide()

# handle checkbox change for each item
$('form.edit_item input[type="checkbox"]').live 'change', ->
  # submit the embedded form and, without waiting, mark the item as changed
  $(this).closest('form').submit().updateItemState()

# handle server error while updating item state
$('form.edit_item').live 'ajax:error', (e, xhr) ->
  # updating item failed, so undo the change of item state
  $(this).toggleItemState()
  alert("There's been an error saving item state")


# helper functions

$.fn.toggleItemState = ->
  # toggle item checkbox and update its done state
  input = @.find 'input[type=checkbox]'
  input.attr('checked', !input.is ':checked')
  @.updateItemState()

$.fn.updateItemState = ->
  item = @.closest 'li'
  # if the checkbox is checked, mark the item as done and move it to the end
  if item.find('input[type=checkbox]').is ':checked'
    item.addClass('done').appendTo item.parent()
    item.closest('.todo_list').addClass 'has-done'
  else
    item.removeClass('done').prependTo item.parent()
    item.closest('.todo_list').not(':has(.item.done)').removeClass 'has-done'
  @

$.fn.showNewItemForm = ->
  $('form#new_item').insertBefore(@.find '.items').show()
  @.focusItemInput()
  scrollTo 0, @.offset().top - 5 if iPhone # scroll to snap to the current todo list container
  @.find('input#todo_list_id').val @.domId()
  @

$.fn.focusItemInput = -> @.find('input#item_description').val('').focus(); @

$.fn.domId = -> @.attr('id').match(/\d+$/)[0]
