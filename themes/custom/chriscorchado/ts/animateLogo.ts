/**
 * Animate logo as a way to show loading, paging or any other processing
 * @param {string} logoID - ID of the HTML image tag
 * @param {string} animationID - options [spin, spin-reverse, breath]
 * to animate or empty string '' to stop the animation
 */
// eslint-disable-next-line import/prefer-default-export
export const animateLogo = (logoID: string, animationID: string): void => {
  const checkExist = setInterval(() => {
    const logoElement = document.getElementById(logoID) as HTMLElement

    if (logoElement) {
      if (animationID) {
        logoElement.setAttribute('src', `https://chriscorchado.com/images/chriscorchado-initials-logo-animated-${animationID}.gif`)
      } else {
        logoElement.setAttribute('src', 'https://chriscorchado.com/images/chriscorchado-initials-logo.png')
      }

      clearInterval(checkExist)
    }
  }, 100)
}
