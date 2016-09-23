var samples = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.cateogry = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {
  var $source = $('#article-template').html();
  var template = Handlebars.compile($source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var html = template(this);
  return html;
};

myLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

//risa changed "ele" to "a,b"; "ele" was from old code
myLocalData.forEach(function(a,b) {
  samples.push(new Article(a,b));
});

samples.forEach(function(a) {
  $('#samples').append(a.toHtml());
});
