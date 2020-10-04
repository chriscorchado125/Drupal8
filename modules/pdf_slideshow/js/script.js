
(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.pdfslideshowbehavior = {
    attach: function (context, settings) {

      $('.pdf-slideshow').once().each(function () {

        var fids = $(this).data('fids');
        var width = $(this).data('width');
        var height = $(this).data('height');
        var nbpages = $(this).data('nbpages');
        var currentEl = $(this);

        if (fids && width && height && nbpages) {
          $.ajax({
            url: '/slideshow/render/' + fids + '/' + width + '/' + height + '/' + nbpages,
            type: 'GET',
            dataType: 'html',
            success: function (htmlSlideshow, statut) {
              currentEl.html(htmlSlideshow);
              currentEl.find('.single-item').slick();
            },
            error: function (resultat, statut, erreur) {
            },
            complete: function (resultat, statut) {
            }
          });
        }
      });
    }
  };

})(jQuery, Drupal);
