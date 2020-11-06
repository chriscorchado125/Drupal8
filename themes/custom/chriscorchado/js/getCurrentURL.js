export const getCurrentURL = () => {
    let currentURL = window.location.toString();
    const currentURL_Array = currentURL.split("/");
    const isSearching = currentURL.indexOf("?");
    if (isSearching !== -1) {
        currentURL = currentURL_Array[3].split("?")[0];
    }
    else {
        currentURL = currentURL_Array[3];
    }
    return currentURL;
};
