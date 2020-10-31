const SEARCH_CONTAINER = document.getElementById("search-container");

/**
 * Configure search form
 */
switch (location.pathname.toString()) {
  case "/companies":
  case "/company-search":
    SEARCH_CONTAINER.setAttribute("action", "/company-search");
    break;
  case "/courses":
  case "/course-search":
    SEARCH_CONTAINER.setAttribute("action", "/course-search");
    break;
  case "/projects":
  case "/project-search":
    SEARCH_CONTAINER.setAttribute("action", "/project-search");
    break;
}

document.getElementById("searchClear").onclick = () => document.location.search = '';
