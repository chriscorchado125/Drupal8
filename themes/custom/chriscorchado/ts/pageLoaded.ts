/**
 * Setup pagination, page counts and search
 */
const setupPage = () => {
  setPagination();
  setItemCounts();
  configureSearchForm();
  setNavItem();
}

window.addEventListener('DOMContentLoaded', () => {
  setupPage();
});

