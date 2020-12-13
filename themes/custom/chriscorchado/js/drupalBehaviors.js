import { setPagination, setItemCounts } from "./itemCount.js";
import { configureSearchForm } from "./search.js";
import { setNavItem } from "./setNavItem.js";
import { getCurrentURL } from "./getCurrentURL.js";
(function ($, Drupal) {
    Drupal.behaviors.chriscorchado = {
        attach: function (context, settings) {
            setPagination();
            setItemCounts();
            setNavItem();
            configureSearchForm();
            getCurrentURL();
        }
    };
})(jQuery, Drupal);
