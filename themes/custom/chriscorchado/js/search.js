export const configureSearchForm = () => {
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
            const re = new RegExp(('[a-zA-Z \s]'));
            const SEARCH_INPUT = document.getElementById("searchSite");
            SEARCH_INPUT.onkeydown = (e) => {
                if (re.exec(e.key) == null) {
                    e.preventDefault();
                    return false;
                }
            };
            SEARCH_CONTAINER.onsubmit = (e) => {
                if (re.exec(SEARCH_INPUT.value) == null) {
                    e.preventDefault();
                    alert("Only letters and spaces are allowed");
                    return false;
                }
            };
            let params = new URLSearchParams(document.location.search);
            document.getElementById("searchClear").onclick = () => location.href = clearSearchURL + "?clear";
            if (params.get("search_api")) {
                document.getElementById("searchSite").value = params.get("search_api");
                document.getElementById("searchSite").select();
            }
            else {
                if (document.location.toString().indexOf("clear") !== -1) {
                    document.getElementById("searchSite").focus();
                    history.pushState(null, null, window.location.protocol + "//" + window.location.host + window.location.pathname);
                }
            }
            clearInterval(checkForSearchContainer);
        }
    }, 100);
};
export const noRecordsFound = (noRecordID, search, appendToID, msg) => {
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
