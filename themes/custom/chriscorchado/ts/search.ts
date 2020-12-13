/**
 * Configure search form
 */
export const configureSearchForm = () => {
  let subFolder = ''
  let clearSearchURL = ''

  // live site is hosted from the drupal8 folder
  if (location.pathname.toString().indexOf('/drupal8/') !== -1) {
    subFolder = '/drupal8'
  }

  const checkForSearchContainer = setInterval(function () {
    if (document.getElementById('search-container')) {
      const SEARCH_CONTAINER = document.getElementById('search-container')

      if (location.pathname.toString().indexOf('compan') !== -1) {
        SEARCH_CONTAINER.setAttribute('action', subFolder + '/company-search')
        clearSearchURL = subFolder + '/companies'
      }

      if (location.pathname.toString().indexOf('course') !== -1 || location.pathname.toString().indexOf('award') !== -1) {
        SEARCH_CONTAINER.setAttribute('action', subFolder + '/award-search')
        clearSearchURL = subFolder + '/courses'
      }

      if (location.pathname.toString().indexOf('project') !== -1) {
        SEARCH_CONTAINER.setAttribute('action', subFolder + '/project-search')
        clearSearchURL = subFolder + '/projects'
      }

      // only allow the alphabet and spaces when searching
      const re = /[A-Za-z\s]/

      const SEARCH_INPUT = (<HTMLInputElement>document.getElementById('search-site'))

      SEARCH_INPUT.onkeydown = (e) => {
        if (re.exec(e.key) === null) {
          e.preventDefault()
          return false
        }
      }

      // prevent bypassing the onkeydown filter by checking the input value on submit
      SEARCH_CONTAINER.onsubmit = (e) => {
        if (SEARCH_INPUT.value === '' || re.exec(SEARCH_INPUT.value) === null) {
          e.preventDefault()
          return false
        }
      }

      const params = new URLSearchParams(document.location.search)

      // set a 'clear' querystring param in order to set the focus to the search box after the search is cleared
      document.getElementById('search-clear-btn').onclick = () => {
        location.href = clearSearchURL + '?clear'
      }

      // if searching then set searched value and select it
      if (params.get('search_api')) {
        (<HTMLInputElement>document.getElementById('search-site')).value = params.get('search_api');
        (<HTMLInputElement>document.getElementById('search-site')).select()
        const currentCount = <HTMLInputElement>document.getElementById('search-count')

        if (currentCount.innerText === '0 Items') {
          noRecordsFound('no-records', params.get('search_api'), 'navigation', 'No matches found for')
        }
      } else {
        // search was cleared so set focus back to search input and remove the 'clear' querystring param
        if (document.location.toString().indexOf('clear') !== -1) {
          (<HTMLInputElement>document.getElementById('search-site')).focus()
          history.pushState(null, null, window.location.protocol + '//' + window.location.host + window.location.pathname)
        }
      }

      clearInterval(checkForSearchContainer)
    }
  }, 100)
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
    document.getElementById(noRecordID).remove()
  }

  if (!document.getElementById(noRecordID) && search) {
    document.getElementsByClassName('container')[0].classList.add('hide')

    const notFound = document.createElement('div')
    notFound.id = noRecordID
    notFound.innerHTML = `${msg} '${search}'`

    document.getElementById(appendToID).appendChild(notFound)
  }
}
