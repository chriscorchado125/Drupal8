import { setPagination, setItemCounts } from './itemCount.js'
import { configureSearchForm } from './search.js'
import { setNavItem } from './setNavItem.js'
import { configureContact } from './configureContact.js'

/**
 * Setup pagination, page counts, main navigation items, search and contact
 */
(function ($, Drupal) {
  Drupal.behaviors.chriscorchado = {
    attach: function (context: any, settings: any) {
      setPagination()
      setItemCounts()
      setNavItem()
      configureSearchForm()
      configureContact()
    }
  }
})(window.jQuery, window.Drupal)
