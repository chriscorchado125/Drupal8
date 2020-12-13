import { getCurrentURL } from './getCurrentURL.js';
export const setNavItem = () => {
    let navItemToSelect = '';
    switch (getCurrentURL()) {
        case 'award-search':
            navItemToSelect = 'courses';
            break;
        case 'company-search':
            navItemToSelect = 'companies';
            break;
        case 'project-search':
            navItemToSelect = 'projects';
            break;
    }
    const checkForNavItem = setInterval(function () {
        if (document.querySelectorAll(`a[href='/${navItemToSelect}']`)[0]) {
            document.querySelectorAll(`a[href='/${navItemToSelect}']`)[0].classList.add('nav-item-active');
            clearInterval(checkForNavItem);
        }
    }, 100);
};
