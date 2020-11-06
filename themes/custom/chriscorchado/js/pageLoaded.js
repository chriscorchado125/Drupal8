import { setPagination, setItemCounts } from "./itemCount.js";
import { configureSearchForm } from "./search.js";
import { setNavItem } from "./setNavItem.js";
window.addEventListener('DOMContentLoaded', () => {
    setPagination();
    setItemCounts();
    setNavItem();
    configureSearchForm();
});
