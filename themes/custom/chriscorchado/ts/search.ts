/**
 * Configure search form
 */
const configureSearchForm = () => {

  let subFolder = "";
  let clearSearchURL = "";

  if(location.pathname.toString().indexOf('/drupal8/') !== -1){
    subFolder = "/drupal8";
  }

  const SEARCH_CONTAINER = document.getElementById("search-container");

  if(location.pathname.toString().indexOf("compan") !== -1){
    SEARCH_CONTAINER.setAttribute("action", subFolder + "/company-search");
    clearSearchURL = subFolder + "/companies";
  }

  if(location.pathname.toString().indexOf("course") !== -1 || location.pathname.toString().indexOf("award") !== -1){
    SEARCH_CONTAINER.setAttribute("action", subFolder + "/award-search");
    clearSearchURL = subFolder + "/courses";
  }

  if(location.pathname.toString().indexOf("project") !== -1){
    SEARCH_CONTAINER.setAttribute("action", subFolder + "/project-search");
     clearSearchURL = subFolder + "/projects";
  }

  document.getElementById("searchClear").onclick = () => location.href = clearSearchURL;


  let params = new URLSearchParams(document.location.search);

  // if searching then set searched value and select it
  if(params.get("search_api")){
    (<HTMLInputElement>document.getElementById("searchSite")).value = params.get("search_api");
    (<HTMLInputElement>document.getElementById("searchSite")).select();
  } else {
    // search was cleared so set focus back to search input
    if(document.location.pathname == "/award-search"){
      (<HTMLInputElement>document.getElementById("searchSite")).focus();
    }
  }
}
