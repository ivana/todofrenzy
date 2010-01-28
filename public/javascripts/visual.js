$(function(){

  $('h1 + a').button({  // create a new list
    icons: { primary: 'ui-icon-circle-plus' }
  });

  $('input[type="submit"], input[type="reset"]').button();

});