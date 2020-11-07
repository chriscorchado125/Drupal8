import { getCurrentURL } from "./getCurrentURL.js";

/**
 * Set the current navigation link style when searching
 * Defaults are commented out below and handled in menu.html.twig
 */
export const setNavItem = () => {

  let navItemToSelect = ""

  switch (getCurrentURL()) {
  //case 'courses':
    case 'award-search':
      navItemToSelect = "courses";
      break;
  //case 'companies':
    case 'company-search':
      navItemToSelect = "companies";
      break;
  //case 'projects':
    case 'project-search':
      navItemToSelect = "projects";
      break;
  }

  // make sure the nav item is there in order to add the active style
  const checkForNavItem = setInterval(function() {

    if (document.querySelectorAll(`a[href='/${navItemToSelect}']`)[0]) {
      document.querySelectorAll(`a[href='/${navItemToSelect}']`)[0].classList.add("nav-item-active");
      clearInterval(checkForNavItem);
    }
  }, 100);
};
