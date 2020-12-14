import { setPagination, setItemCounts } from './itemCount.js'
import { configureSearchForm } from './search.js'
import { setNavItem } from './setNavItem.js'
import { configureContact } from './configureContact.js'
import { animateLogo } from './animateLogo.js'

/**
 * Setup pagination, page counts, main navigation items, search and contact
 */
(function ($, Drupal) {
  Drupal.behaviors.chriscorchado = {
    attach: function (context: any, settings: any) {
      setNavItem()
      setPagination()
      setItemCounts()
      configureContact()
      configureSearchForm()
    }
  }
})(window.jQuery, window.Drupal)

window.onload = function() {
  animateLogo('logo-image', '')
}
