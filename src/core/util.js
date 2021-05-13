export function createHtml(cards, callback, isReverse = false) {
  let items = []
  cards.forEach((c) => items.push(callback(c)))
  return isReverse ? items.reverse().join('') : items.join('')
}

export function getPercent(something, total) {
  return (something * 100) / total
}

export const animateCSS = (element, animation, speed = 'faster', prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`
    const animationSpeed = `${prefix}${speed}`
    const node = typeof element === 'string' ? document.querySelector(element) : element

    node.classList.add(`${prefix}animated`, animationName, animationSpeed)

    function handleAnimationEnd(event) {
      event.stopPropagation()
      node.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true })
})


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}  
