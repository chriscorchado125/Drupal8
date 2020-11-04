const setupPage = () => {
    setPagination();
    setItemCounts();
    configureSearchForm();
    setNavItem();
};
window.addEventListener('DOMContentLoaded', () => {
    setupPage();
});
