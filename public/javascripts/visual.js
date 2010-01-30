$(function(){

  $('input[type="submit"], input[type="reset"]').button();

  $('h1 + a').button({  // create a new list
    icons: { primary: 'ui-icon-circle-plus' }
  });

  $('a.edit').button({
    icons: { primary: 'ui-icon-pencil'},
    text: false
  });

  $('a.del').button({
    icons: { primary: 'ui-icon-trash'},
    text: false
  });

});