import { setPagination, setItemCounts } from "./itemCount.js";
import { configureSearchForm } from "./search.js";
import { setNavItem } from "./setNavItem.js";

/**
 * Setup pagination, page counts, main navigation items and search
 * This exist on pageLoaded.ts and drupalBehaviors.ts
 */
window.addEventListener('DOMContentLoaded', () => {
  setPagination();
  setItemCounts();
  setNavItem();
  configureSearchForm();
});
