import { setPagination, setItemCounts } from './itemCount.js'
import { configureSearchForm } from './search.js'
import { setNavItem } from './setNavItem.js'
import { configureContact } from './configureContact.js'
import { animateLogo } from './animateLogo.js'

/**
 * Setup pagination, page counts, main navigation items, search and contact
 */
(function ($, Drupal) {
  Drupal.behaviors.chriscorchado = {
    attach: function (context: any, settings: any) {
      setNavItem()
      setPagination()
      setItemCounts()
      configureContact()
      configureSearchForm()
    }
  }
})(Query, Drupal)

animateLogo('logo-image', 'spin')

// Animate logo when the navigation, search, pagination or resume links are clicked because the pages wait to load
document.addEventListener('click', function (event) {
  const itemClasses = event.target.className.toString()
  const validClasses = ['logo-image', 'nav-item', 'search-btn', 'pager-navigation', 'resume-link']
  let okToAnimate = validClasses.some(el => itemClasses.includes(el))

  const searchButton = ['search-btn click']
  const searchClicked = searchButton.some(el => itemClasses.includes(el))
  const searchValue = document.getElementById('search-site')

  // Don't animate if searching for an empty value
  if(searchClicked && searchValue.value === ''){
    okToAnimate = false
  }

  if (okToAnimate){
    animateLogo('logo-image', 'spin')
  }
})

window.onload = function() {
  animateLogo('logo-image', '')
}
