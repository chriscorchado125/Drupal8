export const getCurrentURL = () => {
    let currentURL = window.location.toString();
    const currentURLArray = currentURL.split('/');
    const isSearching = currentURL.indexOf('?');
    if (isSearching !== -1) {
        currentURL = currentURLArray[3].split('?')[0];
    }
    else {
        currentURL = currentURLArray[3];
    }
    return currentURL;
};
