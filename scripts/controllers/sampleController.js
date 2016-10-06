'use strict';

(function(module) {
  var sampleController = {
    index: function() {
      $('.tab-content').hide();
      $('#samples').fadeIn();
    }
  };

  module.sampleController = sampleController;
})(window);
