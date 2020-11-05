const setNavItem = () => {
    let currentURL = window.location.toString();
    const currentURL_Array = currentURL.split("/");
    const isSearching = currentURL.indexOf("?");
    if (isSearching !== -1) {
        currentURL = currentURL_Array[3].split("?")[0];
    }
    else {
        currentURL = currentURL_Array[3];
    }
    let navItemToSelect = "";
    switch (currentURL) {
        case 'courses':
        case 'award-search':
            navItemToSelect = "courses";
            break;
        case 'companies':
        case 'company-search':
            navItemToSelect = "companies";
            break;
        case 'projects':
        case 'project-search':
            navItemToSelect = "projects";
            break;
        case 'contact/feedback':
    }
    const checkForNavItem = setInterval(function () {
        if (document.querySelectorAll(`a[href='/${navItemToSelect}']`)[0]) {
            document.querySelectorAll(`a[href='/${navItemToSelect}']`)[0].classList.add("nav-item-active");
            clearInterval(checkForNavItem);
        }
    }, 100);
};
