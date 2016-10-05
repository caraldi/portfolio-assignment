'use strict';

function Sample (opts) {
  for (var key in opts) {
    this[keys] = opts[keys];
  }
}

Sample.all = [];

Sample.prototype.toHtml = function() {
  var source = $('#sample-template').text();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);
  var html = template(this);
  return html;
};

$.ajax({
  type: 'HEAD',
  url: '/data/writingSamples.json',
  success: function(data, status, xhr) {
    var eTag = xhr.getResponseHeader('eTag');
    if (!localStorage.eTag || eTag !== localStorage.eTag) {
      localStorage.eTag = eTag;
    }
  }
});

// Chaining methods
Sample.loadAll = function(sampleData) {
  sampleData.sort(function(a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  }).forEach(function(element) {
    Sample.all.push(new Sample(element));
  });
};

Sample.fetchAll = function() {
  if (localStorage.writingSamples) {
    Sample.loadAll(JSON.parse(localStorage.writingSamples));
    sampleView.renderIndexPage();
  } else {
    // Calling method $.get on jQuery function --> passing string of url it is sending to get requests --> calling function when gets data back --> .fail if something goes wrong
    $.get('/data/writingsamples.json', handleResponse).fail(function() {
      console.log('JSON file retrieval failed!');
    });
  }

  function handleResponse(data, status, xhr) {
    console.log(data);
    localStorage.setItem('writingSamples', xhr.responseText);
    Sample.loadAll(JSON.parse(localStorage.writingSamples));
    sampleView.renderIndexPage();
  }
};
