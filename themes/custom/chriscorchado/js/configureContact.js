export const getCurrentURL = () => {
    if (('label[for="edit-mail"]')) {
        document.querySelector('label[for="edit-mail"]').innerHTML = "Email";
        document.getElementById("edit-mail").focus();
    }
};
