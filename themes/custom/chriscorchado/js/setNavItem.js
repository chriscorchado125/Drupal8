import { getCurrentURL } from "./getCurrentURL.js";
export const setNavItem = () => {
    let navItemToSelect = "";
    switch (getCurrentURL()) {
        case 'courses':
        case 'award-search':
            navItemToSelect = "courses";
            break;
        case 'companies':
        case 'company-search':
            navItemToSelect = "companies";
            break;
        case 'projects':
        case 'project-search':
            navItemToSelect = "projects";
            break;
        case 'contact/feedback':
    }
    const checkForNavItem = setInterval(function () {
        if (document.querySelectorAll(`a[href='/${navItemToSelect}']`)[0]) {
            document.querySelectorAll(`a[href='/${navItemToSelect}']`)[0].classList.add("nav-item-active");
            clearInterval(checkForNavItem);
        }
    }, 100);
};
