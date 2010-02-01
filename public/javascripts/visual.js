$(function(){

  $('input[type="submit"], input[type="reset"]').button();

  $('h1 + a').button({  // create a new list
    icons: { primary: 'ui-icon-circle-plus' }
  });

  $('a.new-item').button({  // add new item
    icons: { primary: 'ui-icon-plus' },
    text:false
  });

  $('a.edit').button({ // edit list
    icons: { primary: 'ui-icon-pencil'},
    text: false
  });

  $('a.del').button({ // delete list
    icons: { primary: 'ui-icon-trash'},
    text: false
  });

});