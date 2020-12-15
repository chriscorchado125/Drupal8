import { getCurrentURL } from './getCurrentURL.js'

/**
 * Update the email input label text and put cursor focus inside the email input textbox
 */
// eslint-disable-next-line import/prefer-default-export
export const configureContact = (): void => {
  if (getCurrentURL() === 'contact') {
    document.querySelector('label[for="edit-mail"]').innerHTML = 'Email'
    document.getElementById('edit-mail').focus()
  }
}
