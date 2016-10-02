'use strict';

function Sample (opts) {
  for (var key in opts) {
    this[keys] = opts[keys];
  }
}

Sample.all = [];

Article.prototype.toHtml = function() {
  var $source = $('#sample-template').html();
  var template = Handlebars.compile($source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var html = template(this);
  return html;
};

myLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

myLocalData.forEach(function(ele) {
  samples.push(new Article(ele));
});

samples.forEach(function(a) {
  $('#samples').append(a.toHtml());
});
