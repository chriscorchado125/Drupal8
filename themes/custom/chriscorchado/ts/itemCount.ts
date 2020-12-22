import { noRecordsFound } from './search.js'

const MAX_ITEMS_PER_PAGE = 50

/**
 * Setup item counts
 */
export const setItemCounts = (): void => {
  let hasPreviousLink = 0
  let hasNextLink = 0

  if (document.getElementsByClassName('pager-navigation')[0]) {
    hasPreviousLink = document.getElementsByClassName('pager-navigation')[0].nodeName === 'A' ? 1 : 0
  }

  if (document.getElementsByClassName('pager-navigation')[1]) {
    hasNextLink = document.getElementsByClassName('pager-navigation')[1].nodeName === 'A' ? 1 : 0
  }

  const params = new URLSearchParams(document.location.search)

  // adjust page number - Drupals page numbers are zero indexed so page 0 is 1
  let pageNum = 1
  if (params.get('page')) {
    pageNum = parseInt(params.get('page'), 10) + 1
  }

  let searchedFor = ''
  if (params.get('search_api')) {
    searchedFor = params.get('search_api')
  }

  if (document.getElementById('record-total')) {
    const count = parseInt(document.getElementById('record-total').innerText, 10)

    // if there is a next or prev link then show the pagination
    if (hasPreviousLink || hasNextLink) {
      let lastRange = pageNum * MAX_ITEMS_PER_PAGE
      let firstRange = lastRange - MAX_ITEMS_PER_PAGE

      // adjust firstRange to compensate for Drupals page numbers being zero indexed
      if (firstRange === 0) {
        firstRange = 1
      } else {
        firstRange++
      }

      if (count < MAX_ITEMS_PER_PAGE) {
        lastRange = (firstRange + count) - 1
      }

      // add item counts to the page
      document.getElementById('search-container').className = 'pagination-yes'
      document.getElementById('search-count').innerHTML = ` Items&nbsp;<span id='total-items'>${firstRange}&nbsp;-&nbsp;${lastRange}</span>`
    } else {
      document.getElementById('search-container').className = 'pagination-no'
      document.getElementById('search-count').innerHTML = `<span id='total-items'>${count}</span>&nbsp${count === 1 ? 'Item' : 'Items'}`
    }
  } else {
    document.getElementById('search-count').innerHTML = ' 0 Items'
    noRecordsFound('noRecords', searchedFor, 'navigation', 'No matches found for')
  }
}

/**
 * Setup pagination links
 */
export const setPagination = () :void => {
  const DRUPAL_PAGER = document.querySelectorAll('ul.js-pager__items li a')
  let actualPrevLink = ''
  let actualNextLink = ''

  // find the previous and next links
  for (let i = 0; i < DRUPAL_PAGER.length; i++) {
    if (DRUPAL_PAGER[i].getAttribute('rel') === 'next') {
      actualNextLink = DRUPAL_PAGER[i].getAttribute('href')
    }

    if (DRUPAL_PAGER[i].getAttribute('rel') === 'prev') {
      actualPrevLink = DRUPAL_PAGER[i].getAttribute('href')
    }
  }

  // configure the previous and next links
  const prevLink = actualPrevLink
    ? `<a href="${actualPrevLink}" class="pager-navigation" title="View the previous page" role="button">Prev</a>`
    : '<span class="pager-navigation disabled" title="There is no previous page available" role="button">Prev</span>'
  const nextLink = actualNextLink
    ? `<a href="${actualNextLink}" class="pager-navigation" title="View the next page" role="button">Next</a>`
    : '<span class="pager-navigation disabled" title="There is no next page available" role="button">Next</span>'

  if (actualPrevLink.length + actualNextLink.length) {
    document.getElementById('pagination').innerHTML = prevLink + nextLink
    // style.display set to block or inline block within the pagination media query
  } else {
    document.getElementById('pagination').innerHTML = ''
    document.getElementById('pagination').style.display = 'none'
  }
}
