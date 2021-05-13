import './scss/style.scss'

import { app } from './app/app'
import './app/listeners'
import { removeSpinner, spinner } from './templates/spinner'

/**
 * App load
 */
window.onload = () => {
  if (document.readyState == 'loading') {
    // still loading, wait for the event
    spinner()
    document.addEventListener('DOMContentLoaded', app);
    
  } else {
    // DOM is ready!
    spinner()
    setTimeout(() => {
            removeSpinner()
            app()
        }, 100);
  }
  
}



