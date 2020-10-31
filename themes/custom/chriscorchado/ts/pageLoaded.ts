
window.addEventListener('DOMContentLoaded', () => {

  const DRUPAL_PAGER = document.querySelectorAll("ul.js-pager__items li a");
  let actualPrevLink = "", actualNextLink = "";

  for (let i = 0; i < DRUPAL_PAGER.length; i++){

    if (DRUPAL_PAGER[i].getAttribute("rel") == "next") {
      actualNextLink = DRUPAL_PAGER[i].getAttribute("href");
    }

    if (DRUPAL_PAGER[i].getAttribute("rel") == "prev") {
      actualPrevLink = DRUPAL_PAGER[i].getAttribute("href");
    }
  }

  setPagination(actualPrevLink, actualNextLink);

  setItemCounts();
});
