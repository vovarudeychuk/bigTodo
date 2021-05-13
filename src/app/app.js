import { $ } from '@core/Dom'
import { store } from '../redux/store'
import { createTemplate } from '../templates/content/content.template'
import { createBoardsMenu } from '../templates/sidebar/sidebar.template'

/**
 * Main function.
 */
export function app() {
  const content = document.getElementById('content')
  const sidebar = document.getElementById('sidebar')

  store.subscribe(() => {
    let state = store.getState()
    if (state.bigTodo.length) {   
      let activeId = state.activeBoard.activeBoard || state.activeBoard.previousBoard
      
      $(sidebar).html(createBoardsMenu(state.bigTodo, activeId))     
  
      let filteredData = state.bigTodo.filter((d) => d.id === activeId) || []
      let todoData = filteredData.length ? filteredData[0] : []
      
      $(content).html(createTemplate(todoData.data, activeId))
    
    } else {
      $(content).html('No data')
    }
  })
    store.dispatch({ type: 'INIT_APPLICATION' })
    
}