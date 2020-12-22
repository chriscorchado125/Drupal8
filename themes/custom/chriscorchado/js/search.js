export const noRecordsFound = (noRecordID, search, appendToID, msg) => {
    if (document.getElementById(noRecordID)) {
        document.getElementById(noRecordID).remove();
    }
    if (!document.getElementById(noRecordID) && search) {
        document.getElementsByClassName('container')[0].classList.add('hide');
        const notFound = document.createElement('div');
        notFound.id = noRecordID;
        notFound.innerHTML = `${msg} '${search}'`;
        document.getElementById(appendToID).appendChild(notFound);
    }
};
export const configureSearchForm = () => {
    let subFolder = '';
    let clearSearchURL = '';
    if (location.pathname.toString().indexOf('/drupal8/') !== -1) {
        subFolder = '/drupal8';
    }
    const checkForSearchContainer = setInterval(() => {
        if (document.getElementById('search-container')) {
            const SEARCH_CONTAINER = document.getElementById('search-container');
            if (location.pathname.toString().indexOf('compan') !== -1) {
                SEARCH_CONTAINER.setAttribute('action', `${subFolder}/company-search`);
                clearSearchURL = `${subFolder}/companies`;
            }
            if (location.pathname.toString().indexOf('course') !== -1 || location.pathname.toString().indexOf('award') !== -1) {
                SEARCH_CONTAINER.setAttribute('action', `${subFolder}/award-search`);
                clearSearchURL = `${subFolder}/courses`;
            }
            if (location.pathname.toString().indexOf('project') !== -1) {
                SEARCH_CONTAINER.setAttribute('action', `${subFolder}/project-search`);
                clearSearchURL = `${subFolder}/projects`;
            }
            const re = /[A-Za-z\s]/;
            const SEARCH_INPUT = document.getElementById('search-site');
            SEARCH_INPUT.onkeydown = (e) => {
                if (re.exec(e.key) === null) {
                    e.preventDefault();
                    return false;
                }
            };
            SEARCH_CONTAINER.onsubmit = (e) => {
                if (SEARCH_INPUT.value === '' || re.exec(SEARCH_INPUT.value) === null) {
                    e.preventDefault();
                    return false;
                }
            };
            const params = new URLSearchParams(document.location.search);
            document.getElementById('search-clear-btn').onclick = () => {
                location.href = `${clearSearchURL}?clear`;
            };
            if (params.get('search_api')) {
                document.getElementById('search-site').value = params.get('search_api');
                document.getElementById('search-site').select();
                const currentCount = document.getElementById('search-count');
                ga('send', 'pageview', `/${clearSearchURL}?q=${params.get('search_api')}`);
                if (currentCount.innerText === '0 Items') {
                    noRecordsFound('no-records', params.get('search_api'), 'navigation', 'No matches found for');
                }
            }
            else {
                if (document.location.toString().indexOf('clear') !== -1) {
                    document.getElementById('search-site').focus();
                    history.pushState(null, null, `${window.location.protocol}//${window.location.host}${window.location.pathname}`);
                }
            }
            clearInterval(checkForSearchContainer);
        }
    }, 100);
};
