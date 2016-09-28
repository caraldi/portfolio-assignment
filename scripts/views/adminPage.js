'use strict';

articleView.initAdminPage = function() {
  var template = Handlebars.compile($('#sample-template').html());

  Article.numWordsBySample().forEach(function(stat) {
    $('.words-per-data').append(template(stat));
  });
  $('#sample-stats .samples').text(Article.allArticles.length);
  $('#sample-stats .word-count').text(Article.numWordsAll());
};

Article.fetchAll(articleView.initAdminPage);
