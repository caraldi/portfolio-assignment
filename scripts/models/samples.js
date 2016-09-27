'use strict';

function Article (opts) {
  for (key in opts) {
    this[keys] = opts[keys];
  }
}

Article.all = [];

Article.prototype.toHtml = function(scriptTemplate) {
  var template = Handlebars.compile($(scriptTemplate).text());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);
  return template(this);
};

Article.loadAll = function(passedData) {
  passedData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  }).forEach(function(ele) {
    Article.all.push(new Article(ele));
  });
};
