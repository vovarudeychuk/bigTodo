import { $ } from '../core/dom'
import { capitalizeFirstLetter, animateCSS } from '@core/util'
import {
  shudAddBoard,
  shudAddList,
  shudAddTask,
  shudCloseModal,
  shudMinimize,
  shudRemoveBoard,
  shudRemoveList,
  shudShowBoard,
  shudToggleTask,
} from './util.function'
import {
  addBoard,
  addList,
  addTask,
  minimizeList,
  removeBoard,
  removeList,
  showBoard,
  toggleTask,
  activeBoardList,
  activeTask,
} from '../redux/actions'
import { store } from '../redux/store'
import {
  closeModal,
  inputHtml,
  modal,
  notify,
} from '../templates/util.template'

// Click Events
$(document).on('click', (event) => {
  if (shudAddBoard(event)) {
    const boardInput = {
      placeholder: 'Board name...',
      inputDataAtribute: 'data-board-create',
      btnDataAtribute: 'data-board-btn',
      btnText: 'Create board',
      icon: 'clipboard',
    }
    addElement(boardInput, boardDispatch)
  } else if (shudRemoveBoard(event)) {
    let id = parseInt(event.target.dataset.id)

    animateCSS(`[data-li='${id}']`, 'fadeOut').then(() => {
      store.dispatch(removeBoard(id))
    })
  } else if (shudShowBoard(event)) {
    const id = parseInt(event.target.dataset.id)
    showBoardDispach(id)
  } else if (shudAddList(event)) {
    const listInput = {
      placeholder: 'List name...',
      inputDataAtribute: 'data-list-create',
      btnDataAtribute: 'data-list-btn',
      btnText: 'Create list',
      icon: 'list-ul',
    }
    addElement(listInput, listDispatch)
  } else if (shudRemoveList(event)) {
    let id = parseInt(event.target.dataset.id)
    animateCSS(`[data-id='${id}']`, 'fadeOut').then(() =>
      store.dispatch(removeList(id))
    )
  } else if (shudMinimize(event)) {
    let id = parseInt(event.target.dataset.id)
    let state = store.getState()
    let isMinimize = false
    state.bigTodo.filter((board) => {
      if (board.id === state.activeBoard.activeBoard) {
        board.data.filter((list) => {
          if (list.id === id) {
            isMinimize = list.minimize
          }
        })
      }
    })

    if (isMinimize) {
      animateCSS(event.target, 'fadeOutDown')
        .then(() => store.dispatch(minimizeList(id)))
        .then(() => activeBoardListDispach(id, store.getState().activeBoard.activeBoard))
        .then(() => animateCSS(`[id='${id}']`, 'fadeInDown'))
    } else if (!isMinimize) {
      animateCSS(`[id='${id}']`, 'fadeOutUp')
        .then(() => store.dispatch(minimizeList(id)))
        .then(() => activeBoardListDispach(id, store.getState().activeBoard.activeBoard))
        .then(() => animateCSS(`[data-idmi='${id}']`, 'fadeInUp'))
    }
  } else if (shudToggleTask(event)) {
    toggleTaskDispach(event.target)
  } else if (shudAddTask(event)) {
    const id = parseInt(event.target.parentNode.dataset.id)
    listTaskDispach(id)
  }
})

// Keypress Events
$(document).on('keypress', (event) => {
  if (event.shiftKey) {
    if (event.code === 'Equal') {
      event.preventDefault()
      const boardInput = {
        placeholder: 'Board name...',
        inputDataAtribute: 'data-board-create',
        btnDataAtribute: 'data-board-btn',
        btnText: 'Create board',
        icon: 'clipboard',
      }
      addElement(boardInput, boardDispatch)
    }
  } else if (event.altKey) {
    if (event.code === 'Equal') {
      event.preventDefault()
      const listInput = {
        placeholder: 'List name...',
        inputDataAtribute: 'data-list-create',
        btnDataAtribute: 'data-list-btn',
        btnText: 'Create list',
        icon: 'clipboard-list',
      }
      addElement(listInput, listDispatch)
    }
  }
})

$(document).on('keydown', function (event) {
  if (event.shiftKey) {
    let menuOptions = {
      allSelector: '.menu-list li a',
      activeSelector: 'is-active',
      keyCodeOne: 38,
      keyCodeTwo: 40,
      callback: showBoardDispach,
    }
    arrowNavigations(event, menuOptions)
  } else if (event.altKey) {
    let cardsOptions = {
      allSelector: '.content-section .card',
      activeSelector: 'card-active',      
      keyCodeOne: 37,
      keyCodeTwo: 39,
      callback: activeBoardListDispach,
    }
    let arrId = arrowNavigations(event, cardsOptions)

    let listId = document.querySelector(`.${cardsOptions.activeSelector}`).dataset.id

    let listOpt = {
      allSelector: `[data-card-id="${listId}"]  .todo-list`,
      activeSelector: 'todo-active',      
      keyCodeOne: 38,
      keyCodeTwo: 40,
      callback: activeTaskDispach,
    }
    let taskId = arrowNavigations(event, listOpt)

    let el = document.querySelector(`.${listOpt.activeSelector}`)

    if(event.keyCode === 70) {
      event.preventDefault()
      toggleTaskDispach(el)
    }
    else if(event.keyCode === 77) { // minimize list
      event.preventDefault()
      animateCSS(`[id='${listId}']`, 'fadeOutUp')
        .then(() => store.dispatch(minimizeList(listId)))
        .then(() => animateCSS(`[data-idmi='${listId}']`, 'fadeInUp'))
    } 
    else if(event.keyCode === 68) { // remove list
      event.preventDefault()
      animateCSS(`[data-id='${listId}']`, 'fadeOut').then(() =>
        store.dispatch(removeList(listId))
      )
    } 
    else if(event.keyCode === 65) { // adding task to list
        event.preventDefault()
        listTaskDispach(listId)
    }
  } else if(event.metaKey) { // minimize
    event.preventDefault()
    let minimizeOpt = {
      allSelector: '.minimize-panel .mini-card',
      activeSelector:  'card-active',      
      keyCodeOne: 37,
      keyCodeTwo: 39,
      callback: activeBoardListDispach
    }
    arrowNavigations(event, minimizeOpt)
    let listId = document.querySelector(`.${minimizeOpt.activeSelector}`).dataset.id

    let activeList = document.querySelector(`[data-id="${listId}"]`)
    if(event.keyCode === 77) { // minimize list
      event.preventDefault() 
      animateCSS(activeList, 'fadeOutDown')
        .then(() => store.dispatch(minimizeList(listId)))
        .then(() => activeBoardListDispach(listId, store.getState().activeBoard.activeBoard))
        .then(() => animateCSS(`[id='${listId}']`, 'fadeInDown'))
    }
  } 
})

function showBoardDispach(id, boardId) {
  store.dispatch(showBoard(id))
}

function activeTaskDispach(id, boardId) {
  store.dispatch(activeTask(id))
}

function activeBoardListDispach(listId, boardId) {
  store.dispatch(activeBoardList(listId, boardId))
}
// CRUD for listeners
function addElement(opt, dispatch) {
  const inputOptions = opt
  modal(inputHtml(inputOptions))

  const input = document.querySelector(`[${inputOptions.inputDataAtribute}]`)
  input.focus()
  const inputBtn = document.querySelector(`[${inputOptions.btnDataAtribute}]`)

  $(inputBtn).on('click', () => dispatch(input.value))
  $(input).on('keypress', (e) =>
    e.key === 'Enter' ? dispatch(input.value) : null
  )
}

function taskDispach(taskText, cardId, cardName = '') {
  const taskReg = /^[A-Z].{4,100}$/
  const task = {
    id: Math.floor(Math.random() * 10320) + Date.now(),
    text: capitalizeFirstLetter(taskText),
    parentId: 100,
    checked: false,
    isActive: false,
  }

  const isTaskReg = taskReg.test(task.text)

  if (isTaskReg) {
    store.dispatch(addTask(task, cardId))
    animateCSS(`[data-task='${task.id}']`, 'fadeIn')
    notify(
      `Task <strong>${task.text}</strong> added to card <strong>${cardName}</strong>`,
      'success',
      'check-circle',
      3000
    )
  } else {
    notify(
      `The task must contain a minimum of <strong>5</strong> and a maximum of <strong>100</strong> characters`,
      'info',
      'exclamation-circle',
      5000
    )
  }
}

function listDispatch(val) {
  const listReg = /^[A-Z].{4,10}$/
  const list = {
    title: capitalizeFirstLetter(val),
    id: Math.floor(Math.random() * 1001),
    value: Math.floor(Math.random() * 101),
    styles: { resizeClass: 'is-one-quarter' },
    minimize: false,
    isActive: false,
    cards: [
      // {
      //   id: 123442 + Math.floor(Math.random() * 10001),
      //   text: 'Some new card 1',åc
      //   checked: false,
      // }
    ],
  }

  const isListOk = listReg.test(list.title)
  
 
  if (isListOk) {
    const id = parseInt(store.getState().activeBoard.activeBoard)
    store.dispatch(addList(list, id))
    closeModal()
    
    animateCSS(`[id='${list.id}']`, 'fadeInRight', 'fast')
    notify(
      `List <strong>${list.title}</strong> has been created!`,
      'success',
      'clipboard-list',
      3000
    )
    activeBoardListDispach(list.id, id)
  } else {
    notify(
      `The list name must contain a minimum of <strong>5</strong> and a maximum of <strong>10</strong> characters`,
      'info',
      'exclamation-circle',
      5000
    )
  }


}

function boardDispatch(val) {
  const boardReg = /^[A-Z].{4,10}$/
  const board = {
    name: capitalizeFirstLetter(val),
    id: Date.now(),
    activeList: 0,
    data: [],
  }

  const isBoardOk = boardReg.test(board.name)

  if (isBoardOk) {
    store.dispatch(addBoard(board))
    store.dispatch(showBoard(board.id))
    // notifycation
    closeModal()
    animateCSS(`[data-board='${board.id}']`, 'fadeIn')
    animateCSS(`[data-li='${board.id}']`, 'pulse', 'slow')

    notify(
      `Board <strong>${board.name}</strong> has been created!`,
      'success',
      'clipboard-check',
      3000
    )
  } else {
    notify(
      `The board name must contain a minimum of <strong>5</strong> and a maximum of <strong>10</strong> characters`,
      'info',
      'exclamation-circle',
      5000
    )
  }
}

function listTaskDispach(id) {
 
  const card$ = $(document.querySelector(`[data-id="${id}"]`))
  const htmlInput = `<input class="input is-small" type="text" placeholder="Create task...">`
  const inputSection$ = card$.find('[data-list-input]')

  inputSection$.html(htmlInput)

  const input$ = inputSection$.find('.input')
  input$.focus()

  const cardName = card$.find('[data-card-header]').$el.innerText
  input$.on('keypress', (e) => {
    if (e.key === 'Enter') {
      taskDispach(input$.$el.value, id, cardName)
  }
})
}

function toggleTaskDispach($el) {
  let id = parseInt($el.dataset.id)
    store.dispatch(toggleTask(id))
    let task = `Task <strong>${$el.parentNode.innerText}</strong>`

    if (!$el.hasAttribute('checked')) {
      notify(`${task} finished!`, 'success', 'check-circle', 3000)
    } else {
      notify(`${task} unfinished!`, 'info', 'exclamation-circle', 3000)
    }
}

function arrowNavigations(event, opt) {
  const activeBoardId = store.getState().activeBoard.activeBoard || 100
  const listItems = document.querySelectorAll(opt.allSelector)
  let activeBoard = document.querySelector(`.${opt.activeSelector}`)
  let currentLI = [].indexOf.call(listItems, activeBoard)
 
  if (currentLI < 0 || currentLI === -1) {
    currentLI = 0
  } 

  // let result = listItems[currentLI].dataset.id || activeBoard.id || 0

  // $(listItems[currentLI]).addClass(opt.activeSelector)
 
  if (event.keyCode === opt.keyCodeOne) {   // check key presses arrows
    if (currentLI === 0) {
      currentLI = listItems.length
    }

    // $(listItems[currentLI]).removeClass(opt.activeSelector)
    currentLI = currentLI > 0 ? --currentLI : 0 // Decrease the counter
    //  $(listItems[currentLI]).addClass(opt.activeSelector) 
    let id = parseInt(listItems[currentLI].dataset.id)
    opt.callback(id, activeBoardId)

 
  } else if (event.keyCode === opt.keyCodeTwo) {   

    // $(listItems[currentLI]).removeClass(opt.activeSelector)
    currentLI = currentLI < listItems.length - 1 ? ++currentLI : 0 // Increase counter
    // $(listItems[currentLI]).addClass(opt.activeSelector) 
    let id = parseInt(listItems[currentLI].dataset.id)
    opt.callback(id, activeBoardId)
  }

  // return result
}
