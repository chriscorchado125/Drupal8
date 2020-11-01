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

  if(location.pathname.toString().indexOf("course") !== -1 || location.pathname.toString().indexOf("award") !== -1){
    SEARCH_CONTAINER.setAttribute("action", subFolder + "/award-search");
  }

  if(location.pathname.toString().indexOf("project") !== -1){
    SEARCH_CONTAINER.setAttribute("action", subFolder + "/project-search");
  }

  document.getElementById("searchClear").onclick = () => document.location.search = '';

  let params = new URLSearchParams(document.location.search);
  if(params.get("search_api")){
    (<HTMLInputElement>document.getElementById("searchSite")).value = params.get("search_api");
    (<HTMLInputElement>document.getElementById("searchSite")).select();
  }
}
