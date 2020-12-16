import { noRecordsFound } from './search.js';
const MAX_ITEMS_PER_PAGE = 50;
export const setItemCounts = () => {
    let hasPreviousLink = 0;
    let hasNextLink = 0;
    if (document.getElementsByClassName('pager-navigation')[0]) {
        hasPreviousLink = document.getElementsByClassName('pager-navigation')[0].nodeName === 'A' ? 1 : 0;
    }
    if (document.getElementsByClassName('pager-navigation')[1]) {
        hasNextLink = document.getElementsByClassName('pager-navigation')[1].nodeName === 'A' ? 1 : 0;
    }
    const params = new URLSearchParams(document.location.search);
    let pageNum = 1;
    if (params.get('page')) {
        pageNum = parseInt(params.get('page'), 10) + 1;
    }
    let searchedFor = '';
    if (params.get('search_api')) {
        searchedFor = params.get('search_api');
    }
    if (document.getElementById('record-total')) {
        const count = parseInt(document.getElementById('record-total').innerText, 10);
        if (hasPreviousLink || hasNextLink) {
            let lastRange = pageNum * MAX_ITEMS_PER_PAGE;
            let firstRange = lastRange - MAX_ITEMS_PER_PAGE;
            if (firstRange === 0) {
                firstRange = 1;
            }
            else {
                firstRange++;
            }
            if (count < MAX_ITEMS_PER_PAGE) {
                lastRange = (firstRange + count) - 1;
            }
            document.getElementById('search-container').className = 'pagination-yes';
            document.getElementById('search-count').innerHTML = ` Items <span id='total-items'>${firstRange} - ${lastRange}</span>`;
        }
        else {
            document.getElementById('search-container').className = 'pagination-no';
            document.getElementById('search-count').innerHTML = `<span id='total-items'>${count}</span> ${count === 1 ? 'Item' : 'Items'}`;
        }
    }
    else {
        document.getElementById('search-count').innerHTML = ' 0 Items';
        noRecordsFound('noRecords', searchedFor, 'navigation', 'No matches found for');
    }
};
export const setPagination = () => {
    const DRUPAL_PAGER = document.querySelectorAll('ul.js-pager__items li a');
    let actualPrevLink = '';
    let actualNextLink = '';
    for (let i = 0; i < DRUPAL_PAGER.length; i++) {
        if (DRUPAL_PAGER[i].getAttribute('rel') === 'next') {
            actualNextLink = DRUPAL_PAGER[i].getAttribute('href');
        }
        if (DRUPAL_PAGER[i].getAttribute('rel') === 'prev') {
            actualPrevLink = DRUPAL_PAGER[i].getAttribute('href');
        }
    }
    const prevLink = actualPrevLink
        ? `<a href="${actualPrevLink}" class="pager-navigation" title="View the previous page" role="button">Prev</a>`
        : '<span class="pager-navigation disabled" title="There is no previous page available" role="button">Prev</span>';
    const nextLink = actualNextLink
        ? `<a href="${actualNextLink}" class="pager-navigation" title="View the next page" role="button">Next</a>`
        : '<span class="pager-navigation disabled" title="There is no next page available" role="button">Next</span>';
    if (actualPrevLink.length + actualNextLink.length) {
        document.getElementById('pagination').innerHTML = prevLink + nextLink;
    }
    else {
        document.getElementById('pagination').innerHTML = '';
        document.getElementById('pagination').style.display = 'none';
    }
};
