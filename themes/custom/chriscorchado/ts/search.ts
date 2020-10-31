/**
 * Configure search form
 */
const configureSearchForm = () => {

  let subFolder = "";

  if(location.pathname.toString().indexOf('/drupal8/') !== -1){
    subFolder = "/drupal8";
  }

  const SEARCH_CONTAINER = document.getElementById("search-container");

  if(location.pathname.toString().indexOf("compan") !== -1){
    SEARCH_CONTAINER.setAttribute("action", subFolder + "/company-search");
  }

  if(location.pathname.toString().indexOf("course") !== -1){
    SEARCH_CONTAINER.setAttribute("action", subFolder + "/course-search");
  }

  if(location.pathname.toString().indexOf("project") !== -1){
    SEARCH_CONTAINER.setAttribute("action", subFolder + "/project-search");
  }

  document.getElementById("searchClear").onclick = () => document.location.search = '';
}
