export function spinner() {
    document.body.insertAdjacentHTML('beforeend', '<div class="spinner"></div>')
}

export function removeSpinner() {
  document.body.querySelector('.spinner').remove()
}
