/**
 * Update the email input label text and put cursor inside the textbox
 */
export const getCurrentURL = () => {
  if (('label[for="edit-mail"]')) {
    document.querySelector('label[for="edit-mail"]').innerHTML = "Email"
    document.getElementById("edit-mail").focus()
  }
}