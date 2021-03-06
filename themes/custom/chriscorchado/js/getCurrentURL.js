export const getCurrentURL = () => {
    let currentURL = window.location.toString();
    const currentURLArray = currentURL.split('/');
    const isSearching = currentURL.indexOf('?');
    if (isSearching !== -1) {
        if (currentURLArray[4]) {
            currentURL = currentURLArray[4].split('?')[0];
        }
        else {
            currentURL = currentURLArray[3].split('?')[0];
        }
    }
    else {
        if (currentURLArray[4]) {
            currentURL = currentURLArray[4];
        }
        else {
            currentURL = currentURLArray[3];
        }
    }
    return currentURL;
};
