/**
 * Get the browser name (IE, Firefox, Chrome, Opera, Safari)
 */
const getBrowser = () => {

  const ua = navigator.userAgent.toLowerCase();

  let browser = {};
  let s;

  (s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] :
  (s = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] :
  (s = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
  (s = ua.match(/opera.([\d.]+)/)) ? browser.opera = s[1] :
  (s = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;

  if (browser.ie) return 'IE';
  if (browser.firefox) return 'Firefox';
  if (browser.chrome) return 'Chrome';
  if (browser.opera) return 'Opera';
  if (browser.safari) return 'Safari';
}