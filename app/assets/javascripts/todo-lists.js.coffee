window.supportsTouch = 'createTouch' of document
window.iPhone = supportsTouch and /\b(iPhone|iPod)\b/.test navigator.userAgent

$ ->
  $(document.body).addClass("#{if iPhone then '' else 'no-'}iphone").addClass("#{if supportsTouch then '' else 'no-'}touch")

if window.navigator.standalone
  # running as iOS full-screen app; make the Twitter login link ajaxy
  $('a.main[href^="/login"]').attr('data-remote', 'true')
  
  $('nav a, h1 a, a[href="/"]').live 'click', (e) ->
    e.preventDefault()
    window.location.assign($(this).attr 'href')


# show NEW LIST form
$('a.create').live 'click', ->
  showListForm()
  false

# show new list form on Shift + A
$(document).keypress (e) ->
  if e.which == 65 and $(e.target).parents('form:not(:hidden)').size() == 0
    showListForm()
    false

# dissmiss new list form
$('form#new_todo_list input[type="button"]').live 'click', ->
  hideListForm()
  false

# insert the created list into the document
$('form#new_todo_list').live 'ajax:success', (event, data) ->
  hideListForm()
  $('body > ol').prepend(data).children(':first').showNewItemForm()

# dismiss new list form on ESC
$('form#new_todo_list').live 'keyup', (e) ->
  if e.which == 27
    e.preventDefault()
    hideListForm()


# user has chosen to DELETE the todo list; hide it while we wait for the server
$('.todo_list .actions a.delete').live 'ajax:beforeSend', (e) -> $(this).closest('.todo_list').hide()

# todo list successfully deleted; remove it from the document
$('.todo_list .actions a.delete').live 'ajax:success', (e, data) ->
  list = $(this).closest('.todo_list')
  # safety check: is there a new item form inside? we don't want it to be destroyed with list
  $('form#new_todo_list').after(list.find('form#new_item').hide())
  list.remove()

# didn't manage to delete the todo list; unhide it
$('.todo_list .actions a.delete').live 'ajax:error', (e, xhr) ->
    $(this).closest('.todo_list').show()
    alert("There's been an error deleting this todo list")


# user has chosen to CLEAR DONE ITEMS, so hide them
$('.todo_list .actions a.clear').live 'click', (e) -> $(this).closest('.todo_list').removeClass('has-done').find('.item.done').hide()

# done items deleted on the server; delete them from the document, too
$('.todo_list .actions a.clear').live 'ajax:success', (e, data) -> $(this).closest('.todo_list').find('.item.done:hidden').remove()

# error clearing done items; unhide them
$('.todo_list .actions a.clear').live 'ajax:error', (e, xhr) ->
  $(this).closest('.todo_list').addClass('has-done').find('.item.done:hidden').show()
  alert("There's been an error clearing done items")


# helper functions

showListForm = ->
  form = $('form#new_todo_list')
  if (form.is(":hidden"))
    form.show().find('input#todo_list_name').val('').focus()
    $('a.create').hide()

hideListForm = ->
  $('form#new_todo_list').hide()
  $('a.create').show()
