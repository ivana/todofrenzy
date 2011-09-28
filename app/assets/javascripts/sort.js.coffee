jQuery -> $("#todas").sortable opacity: 0.8,
  update: (event, ui) -> # stopped sorting and the DOM position has changed
    $.ajax url:'todo_lists/sort', type:'PUT', data:$("#todas").sortable("serialize")
