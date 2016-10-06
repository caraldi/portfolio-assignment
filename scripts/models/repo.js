'use strict';

(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    $.ajax({
      url: '/github/users/codefellows-portland-301d6/repos' +
          '?per_page=10&sort=updated',
      type: 'GET',
      success: function(data, status, xhr) {
        reposObj.allRepos = data;
        callback();
      },
    });
  };

  reposObj.withTheAttribute = function(attr) {
    return reposObj.allRepos.filter(function(aRepo) {
      return aRepo[attr];
    });
  };

  module.reposObj = reposObj;
})(window);
