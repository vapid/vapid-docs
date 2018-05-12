var $sidebar = $('.ui.sidebar');

$('[data-toggle=sidebar]').click((e) => {
  e.preventDefault();
  $sidebar.sidebar('toggle');
});

$sidebar.find('a').click(function (e) {
  var hash = $(this).prop('href').split('#')[1];
  var $section = $('h2#' + hash);

  if ($section.length) {
    e.preventDefault();
    $sidebar.sidebar('hide');
    $('html, body').animate({ scrollTop: $section.offset().top - 60 }, 250);
  };
});

