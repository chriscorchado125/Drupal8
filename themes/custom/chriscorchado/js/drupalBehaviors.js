import { setPagination, setItemCounts } from './itemCount.js';
import { configureSearchForm } from './search.js';
import { setNavItem } from './setNavItem.js';
import { configureContact } from './configureContact.js';
import { animateLogo } from './animateLogo.js';
(($, Drupal) => {
    Drupal.behaviors.chriscorchado = {
        attach() {
            setNavItem();
            setPagination();
            setItemCounts();
            configureContact();
            configureSearchForm();
        }
    };
})(window.jQuery, window.Drupal);
animateLogo('logo-image', 'spin');
document.addEventListener('click', (event) => {
    const itemClasses = event.target.className.toString();
    const validClasses = ['logo-image', 'nav-item', 'search-btn', 'pager-navigation', 'resume-link'];
    let okToAnimate = validClasses.some((el) => itemClasses.includes(el));
    const searchButton = ['search-btn click'];
    const searchClicked = searchButton.some((el) => itemClasses.includes(el));
    const searchValue = document.getElementById('search-site');
    if (searchClicked && searchValue.value === '') {
        okToAnimate = false;
    }
    if (okToAnimate) {
        animateLogo('logo-image', 'spin');
    }
});
window.onload = () => {
    animateLogo('logo-image', '');
};
