
import {$} from '../core/dom'
import { animateCSS } from '../core/util'

export function helperMessagesOnFront(icon, text) {
    let i = icon.length ? `<i class="${icon}"></i>` : ''
    return ` 
        <div class="hero-body">
            ${i}
        <p class="title">
            ${text}
        </p>
        </div>
   `
}

export function modal(h) {
    const modal$ = document.querySelector('.modal')
    if(modal$) {
        notify(`<strong>Modal allredy opened!</strong> `, 'danger', 3000) 
    } else {
        const app$ = document.getElementById('app')
    
        let html = `<div class="modal is-active" data-modal>
                        <div class="modal-background"></div>
                        <div class="modal-content">
                        ${h}
                        </div>
                        <button class="modal-close is-large" aria-label="close" data-close="input"></button>
                    </div>`
        app$.insertAdjacentHTML('afterbegin', html)

        const el$ = document.querySelector(`[data-modal]`) 
        const modalCloseBtn$ = document.querySelector(`[data-close="input"]`)
        if(el$) {
            animateCSS(el$, 'flipInX')
        }
        modalCloseBtn$.onclick = () => {
            animateCSS(el$, 'flipOutX').then(setTimeout(() => {
                el$.remove()
            }, 400))
        }
    }
              
}

export function closeModal() {
    const el$ = document.querySelector(`[data-modal]`) 
    if(el$) {
        animateCSS(el$, 'flipOutX').then(setTimeout(() => {
            el$.remove()
        }, 400))
    }
}

export function inputHtml(options = {placeholder: '', inputDataAtribute: '', btnDataAtribute: '', icon: '', btnText: ''}) {

    let html = `<div class="control-input">
                    <i class="fas fa-${options.icon}"></i>
                    <input
                        autofocus
                        class="input" 
                        type="text" 
                        pattern="^[A-Z].{5,10}$"
                        placeholder="${options.placeholder}" 
                        ${options.inputDataAtribute}
                    >
                    <button ${options.btnDataAtribute} class="button is-inverted is-medium is-fullwidth">${options.btnText}</button>
                </div>`
    return html            
}

export function notify(notifyText, type = 'success', icon, timeOut = 3000){
    const notifyId = Date.now() + Math.floor(Math.random() * 100)
    const notifyContainer$ = document.querySelector('[data-notify-area]')
    const html = `<div class="notification is-${type}" data-notify data-notify-id="${notifyId}">
                        <button data-notify-close class="delete"></button>
                        <span class="notify-icon">
                            <i class="fas fa-${icon}"></i>
                        </span>
                        <span class="notify-text">${notifyText}</span>
                </div>`
    notifyContainer$.insertAdjacentHTML('afterbegin', html)

    const notifyBtn$ = document.querySelector(`[data-notify-close]`)
    const notify$ = document.querySelector('[data-notify]')
    if(notify$) {
        animateCSS(notify$, 'fadeInUp')
        
        notifyBtn$.onclick = () => {
            closeNotify(notifyId)
        }
        setTimeout(() => {
            closeNotify(notifyId)
        }, timeOut);      
    }    
      
}

export function closeNotify(id) {
    const notify$ = document.querySelector(`[data-notify-id="${id}"]`)
    if(notify$) {
        animateCSS(notify$, 'fadeOutDown').then(setTimeout(() => {
            notify$.remove()
        }, 400))
    }
}

export function removeConfirm(data, callback) {
    const html = ``

    return html
}
