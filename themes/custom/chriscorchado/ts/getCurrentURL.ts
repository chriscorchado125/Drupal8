/**
 * Get the current URL
 */
// eslint-disable-next-line import/prefer-default-export
export const getCurrentURL = (): string => {
  let currentURL = window.location.toString()
  const currentURLArray = currentURL.split('/')

  const isSearching = currentURL.indexOf('?')

  // currentURLArray[4] is the live /drupal8 directory
  if (isSearching !== -1) {
    if (currentURLArray[4]) {
      currentURL = currentURLArray[4].split('?')[0]
    } else {
      currentURL = currentURLArray[3].split('?')[0]
    }
  } else {
    if (currentURLArray[4]) {
      currentURL = currentURLArray[4]
    } else {
      currentURL = currentURLArray[3]
    }
  }

  return currentURL
}
