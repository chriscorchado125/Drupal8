import { setPagination, setItemCounts } from "./itemCount.js";
import { configureSearchForm } from "./search.js";
import { setNavItem } from "./setNavItem.js";

/**
 * Setup pagination, page counts, main navigation items and search
 */
(function ($, Drupal) {
  Drupal.behaviors.chriscorchado = {
    attach: function (context: any, settings: any) {
      setPagination();
      setItemCounts();
      setNavItem();
      configureSearchForm();
    }
  };
})(jQuery, Drupal);
