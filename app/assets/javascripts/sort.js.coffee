unless supportsTouch
  jQuery ->
    $('#todas').sortable opacity:0.8,
      update: (event, ui) -> # stopped sorting and the DOM position has changed
        $.ajax url:'todo_lists/sort', type:'PUT', data:$(@).sortable('serialize')

    $('.items').sortable opacity:0.8, items:'.item:not(.done)', axis:'y',
      update: (event, ui) ->
        $.ajax url:'items/sort', type:'PUT', data:$(@).sortable('serialize')

