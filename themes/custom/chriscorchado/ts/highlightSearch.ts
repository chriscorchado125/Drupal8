/**
* Get querystring values
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const urlParams = new URLSearchParams(window.location.search)

/**
 * Highlight search term within a string
 * @param {string} itemToHighlight - string to search
 * @param {string} searchedFor - string to search for
 * @return {string} - search result with/without highlight
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function highlightSearch(itemToHighlight: string, searchedFor: string): string {
  let dataToReturn = itemToHighlight

  if (searchedFor) {
    const searchTerm = new RegExp(searchedFor, 'gi')
    let searchString = ''
    let results = ''

    if (itemToHighlight && +itemToHighlight !== -1) {
      searchString = itemToHighlight.replace('&amp;', '&').replace('&#039;', '\'')
    }

    if (searchString.match(searchTerm)) {
      results = searchString.replace(
        searchTerm,
        (match) => `<span class='highlightSearchText'>${match}</span>`
      )

      dataToReturn = results
    }
  }

  return dataToReturn.replace(/&gt;/g, '>').replace(/&lt;/g, '<')
}

// export { urlParams, highlightSearch }
