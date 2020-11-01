/**
 * Setup pagination, page counts and search
 */
const setupPage = () => {
  setPagination();
  setItemCounts();
  configureSearchForm();
}

window.addEventListener('DOMContentLoaded', () => {
  setupPage();
});

