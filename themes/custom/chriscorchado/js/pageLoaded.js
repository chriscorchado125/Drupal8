const setupPage = () => {
    setPagination();
    setItemCounts();
    configureSearchForm();
};
window.addEventListener('DOMContentLoaded', () => {
    setupPage();
});
