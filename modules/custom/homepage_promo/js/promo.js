/**
 * Handle promotion modal
 */
const currentBrowser = getBrowser(); //(IE, Firefox, Chrome, Opera, Safari)

// get the current date
const current = new Date();
const currentDate = current.getMonth() + "/" + current.getDate() + "/" + current.getFullYear();

// if no promotion or old promotion show promotion modal and set/update cookie
if (getCookie("homepage_promo") !== currentDate + "*" + currentBrowser) {

  // set/update promotion cookie with unique ID (date and browser name seperated by an asterisk: date*browser)
  document.cookie = "homepage_promo=" + currentDate + "*" + currentBrowser;

  // get and show modal
  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  // close modal when users clicks X button
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }

  // close modal when user clicks outside the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}