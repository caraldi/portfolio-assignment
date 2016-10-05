'use strict';

var sampleView = {};

sampleView.populateFilters = function() {
  $('article').not('template').each(function() {
    var category, optionTag;
    category = $(this).attr('data-category');
    optionTag = '<option value"' + category + '">' + category + '</option>';

    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

sampleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    var selectedValue = $(this).val();
    if (selectedValue) {
      var $samples = $('#samples article');
      $samples.each(function() {
        $(this).hide();
        if (selectedValue === $(this).attr('data-category')) {
          $(this).fadeIn('slow');
        }
      });
    } else {
      var $samples = $('#samples article');
      $samples.not('template').each(function() {
        $(this).show();
      });
    }
    $('#category-filter').val('');
  });
};

sampleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(event) {
    $('.tab-content').hide();
    event.preventDefault();

    var $selectedContent = $(this).data('content');
    console.log(this);
    $('#' + $selectedContent).fadeIn('slow');
  });
  $('.main-nav .tab:first').click();
};

sampleView.renderIndexPage = function() {
  Sample.all.forEach(function(a) {
    $('#samples').append(a.toHtml('#sample-template'));
    if ($('#category-filter option:contains("'+ a.category + '")').length === 0) {
      $('#category-filter').append(a.toHtml('#category-filter-template'));
    };
  });
  sampleView.populateFilters();
  sampleView.handleCategoryFilter();
  sampleView.handleMainNav();
};

Sample.fetchAll();
