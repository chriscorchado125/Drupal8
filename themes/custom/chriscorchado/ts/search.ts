/**
 * Configure search form
 */
export const configureSearchForm = () => {

  let subFolder = "";
  let clearSearchURL = "";

  // live site is hosted from the drupal8 folder
  if(location.pathname.toString().indexOf('/drupal8/') !== -1){
    subFolder = "/drupal8";
  }

  const checkForSearchContainer = setInterval(function() {
    if (document.getElementById("search-container")) {

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

      document.getElementById("searchClear").onclick = () => location.href = clearSearchURL + "?clear";

      let params = new URLSearchParams(document.location.search);

      // if searching then set searched value and select it
      if(params.get("search_api")){
        (<HTMLInputElement>document.getElementById("searchSite")).value = params.get("search_api");
        (<HTMLInputElement>document.getElementById("searchSite")).select();
      } else {

        // search was cleared so set focus back to search input
        if(document.location.toString().indexOf("clear") !== -1){
          (<HTMLInputElement>document.getElementById("searchSite")).focus();
        }
      }

      clearInterval(checkForSearchContainer);
    }
  }, 100);
}

/**
 * Handle no records
 * @param {string} noRecordID - id of div to create
 * @param {string} search - searched for text
 * @param {string} appendToID - id of element to append to
 * @param {string} msg - message
 */
export const noRecordsFound = (
  noRecordID: string,
  search: string,
  appendToID: string,
  msg: string
) => {

  if (document.getElementById(noRecordID)) {
    document.getElementById(noRecordID).remove();
  }

  if (!document.getElementById(noRecordID) && search) {

    document.getElementsByClassName("container")[0].classList.add("hide");

    let notFound = document.createElement("div");
    notFound.id = noRecordID;
    notFound.innerHTML = `${msg} '${search}'`;

    document.getElementById(appendToID).appendChild(notFound);
  }
};
