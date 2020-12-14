import { getCurrentURL } from './getCurrentURL.js';
export const configureContact = () => {
    if (getCurrentURL() === 'contact') {
        document.querySelector('label[for="edit-mail"]').innerHTML = 'Email';
        document.getElementById('edit-mail').focus();
    }
};
