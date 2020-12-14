const urlParams = new URLSearchParams(window.location.search);
function highlightSearch(itemToHighlight, searchedFor) {
    let dataToReturn = itemToHighlight;
    if (searchedFor) {
        const searchTerm = new RegExp(searchedFor, 'gi');
        let searchString = '';
        let results = '';
        if (itemToHighlight && +itemToHighlight !== -1) {
            searchString = itemToHighlight.replace('&amp;', '&').replace('&#039;', '\'');
        }
        if (searchString.match(searchTerm)) {
            results = searchString.replace(searchTerm, (match) => `<span class='highlightSearchText'>${match}</span>`);
            dataToReturn = results;
        }
    }
    return dataToReturn.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
}
export { urlParams, highlightSearch };
