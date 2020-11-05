const configureSearchForm = () => {
    let subFolder = "";
    let clearSearchURL = "";
    if (location.pathname.toString().indexOf('/drupal8/') !== -1) {
        subFolder = "/drupal8";
    }
    const checkForSearchContainer = setInterval(function () {
        if (document.getElementById("search-container")) {
            const SEARCH_CONTAINER = document.getElementById("search-container");
            if (location.pathname.toString().indexOf("compan") !== -1) {
                SEARCH_CONTAINER.setAttribute("action", subFolder + "/company-search");
                clearSearchURL = subFolder + "/companies";
            }
            if (location.pathname.toString().indexOf("course") !== -1 || location.pathname.toString().indexOf("award") !== -1) {
                SEARCH_CONTAINER.setAttribute("action", subFolder + "/award-search");
                clearSearchURL = subFolder + "/courses";
            }
            if (location.pathname.toString().indexOf("project") !== -1) {
                SEARCH_CONTAINER.setAttribute("action", subFolder + "/project-search");
                clearSearchURL = subFolder + "/projects";
            }
            document.getElementById("searchClear").onclick = () => location.href = clearSearchURL + "?clear";
            let params = new URLSearchParams(document.location.search);
            if (params.get("search_api")) {
                document.getElementById("searchSite").value = params.get("search_api");
                document.getElementById("searchSite").select();
            }
            else {
                if (document.location.toString().indexOf("clear") !== -1) {
                    document.getElementById("searchSite").focus();
                }
            }
            clearInterval(checkForSearchContainer);
        }
    }, 100);
};
