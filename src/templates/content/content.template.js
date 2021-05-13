import { createHtml, getPercent } from '@core/util'
import { helperMessagesOnFront } from '../util.template'
import { $ } from '@core/dom'

/**
 * Create content template.
 * @constructor
 * @param {object} data - The data for template.
 * @param {string} boardId - curent board id.
 * @returns {string} - return HTML string.
 */
export function createTemplate(data, boardId) {
  // let minimizeData = []
  let isShowHelper

  data.forEach((element) => {
    if (element.minimize === false) {
      isShowHelper = data.length
    }
  })

  let list = ''
  const helperHtml = `<div class="keyboard">
                          <p>Press 
                            <kbd class="kbc-button no-container">Alt</kbd> + 
                            <kbd class="kbc-button no-container">+</kbd> to create.
                          </p>

                          <p>Press
                            <kbd class="kbc-button no-container">CMD</kbd> + 
                            <kbd class="kbc-button no-container"><</kbd> 
                            <kbd class="kbc-button no-container">></kbd>
                            to navigate on top
                          </p>

                          <p>Press
                            <kbd class="kbc-button no-container">CMD</kbd> + 
                            <kbd class="kbc-button no-container">M</kbd> 
                            to maximize list
                          </p>
                      </div>`
  if (data.length && isShowHelper === data.length) {
    list = createHtml(data, addList)
  } else if (data.length && data.length - isShowHelper !== 0) {
    list = helperMessagesOnFront(
      'fas fa-arrow-up',
      `All cards on a top panel! ${helperHtml}`
    )
  } else if (!data.length) {
    list = helperMessagesOnFront(
      'fas fa-exclamation-triangle',
      `You have no tasks! ${helperHtml}`
    )
  }

  let html = `<div class="content-section" data-board="${boardId}">
                <div class="minimize-panel ${data.length ? '' : ''}">
                  <div class="columns is-multiline">
                    <div class="column is-full">
                      <div class="tags are-small">${createHtml(
                        data,
                        minimaizeList
                      )}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="columns is-multiline is-desktop columns-sections"
                  data-id="${boardId}"
                  data-type="container"
                >
                  ${list}

                  <button
                    data-id="${boardId}"
                    data-add="List"
                    class="fixed-button wobble"
                    type="button"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>`
  return html.trim()
}

/**
 * Minimize list panel.
 * @constructor
 * @param {object} task - task object
 * @returns {string} - return HTML string with span tasks
 */
function minimaizeList(task) {
  let listLength = task.cards.length
  let finishedTasks =
    task.cards.filter((data) => data.checked === true).length || 0

  let html = `<span data-idmi="${task.id}"
                    data-id="${task.id}"
                    data-type="minimize" 
                    class="mini-card ${task.isActive ? 'card-active' : ''} panel-shadow tag minimize-tag 
                    is-${colorFromValue(getPercent(finishedTasks, listLength)).color}"
              >${task.title}
                      <i class="far fa-${
                        colorFromValue(getPercent(finishedTasks, listLength))
                          .icon
                      }">
                      </i>
                  </span>`

  return task.minimize ? html : ''
}

/**
 * Adding list.
 * @constructor
 * @param {object} data - list data object.
 * @returns {string} - return HTML string with list
 */


function addList(data) {
  let listLength = data.cards.length
  let finishedTasks =
    data.cards.filter((task) => task.checked === true).length || 0
  
  let html = `<div class="column ${
    data.styles.resizeClass || 'is-one-quarter'
  }">
                <div
                  class="card panel-shadow ${ data.isActive ? 'card-active' : ''}"
                  id="${data.id}"
                  data-id="${data.id}"
                  data-card-id="${data.id}"
                  data-type="list"
                >
                  <p class="message-header is-danger" data-card-header>
                    <span
                      class="
                                  list-icon 
                                  icon 
                                  has-text-${
                                    colorFromValue(
                                      getPercent(finishedTasks, listLength)
                                    ).color
                                  }"
                    >
                      <i
                        class="far fa-${
                          colorFromValue(getPercent(finishedTasks, listLength))
                            .icon
                        }"
                      ></i>
                    </span>
                    ${data.title}
                    <span class="card-icon">
                      <span class="icon icon-minimize">
                        <i
                          data-type="minimize"
                          data-id="${data.id}"
                          class="far fa-window-minimize"
                        ></i>
                      </span>

                      <span class="icon icon-minimize">
                        <i
                          data-id="${data.id}"
                          data-remove="list"
                          class="far fa-trash-alt"
                        ></i>
                      </span>
                    </span>
                    ${createHtml(data.cards, addCard)}
                    <div data-list-input></div>
                    <i data-add="list-task" class="add-list-task fas fa-plus"></i>
                    <progress
                      class="progress ${
                        'is-' +
                        colorFromValue(getPercent(finishedTasks, listLength))
                          .color
                      }"
                      value="${getPercent(finishedTasks, listLength)}"
                      max="100"
                    >
                    </progress>
                  </p>
                </div>
              </div>`

  return data.minimize ? '' : html
}

/**
 * Adding card.
 * @constructor
 * @param {object} card - list card object.
 * @returns {string} - return HTML string with card
 */
export function addCard(card) {
  let html = `
    <div data-task="${card.id}" id="${card.id}" data-id="${card.id}" class="todo-list ${card.isActive ? 'todo-active' : '' }">
      <div class="todo" data-type="card" data-id="${card.id}" >
    <label class="checkbox ${card.checked ? 'todo__text' : ''}">
    <input type="checkbox" data-type="toggle-task" data-id="${card.id}" ${
    card.checked ? 'checked' : ''
  }>
    ${card.text}
    </label>
      </div>
      <span class="icon item_menu">
        <i class="fas fa-ellipsis-v"></i>
      </span>
    </div>
  `

  return html
}

/**
 * Helper color func.
 * @constructor
 * @param {number} value - list data object.
 * @returns {object} - return object { color, icon }
 */
function colorFromValue(value = 0) {
  value = parseInt(value)
  const progressIcon = {
    circle: 'check-circle',
    square: 'check-circle',
    triangle: 'exclamation-circle',
    ban: 'ban',
    exclamation: 'radiation-alt',
    default: 'radiation-alt',
  }

  const progressColors = {
      danger: 'danger',
      info: 'info',
      warning: 'warning',
      success: 'success',
      default: 'danger',
    },
    success = 100,
    warning = 99,
    info = 50,
    danger = 25

  let result = { color: progressColors.info, icon: progressColors.default }

  if (value <= success && value > warning) {
    result = { color: progressColors.success, icon: progressIcon.circle }
  } else if (value <= warning && value > info) {
    result = { color: progressColors.warning, icon: progressIcon.square }
  } else if (value <= info && value > danger) {
    result = { color: progressColors.info, icon: progressIcon.triangle }
  } else if (value <= danger && value > -1) {
    result = { color: progressColors.danger, icon: progressIcon.exclamation }
  } else {
    result = { color: info, icon: progressIcon.default }
  }

  return result
}
