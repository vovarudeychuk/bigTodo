import { createHtml } from '@core/util'

export function createBoardsMenu(data, activeId) {
  const bordsItem = (d) => {
    let html = `<li class="menu-list-li" data-li="${d.id}">
                  <a data-show="board" data-id="${d.id}" ${d.id === activeId ? 'disabled' : ''} class="list ${d.id === activeId ? 'is-active' : ''}">
                    ${d.name}
                  <span class="icon item_menu">
                    <!-- <i class="fas fa-ellipsis-v"></i> -->
                    <i style="display: ${d.id === activeId ? 'none' : 'inline-block'}" data-id="${d.id}" data-remove="board" class="far fa-trash-alt"></i>
                  </span>
                  </a>
              </li>`
    return html
  }
  return `<div class="column">
            <aside class="menu">
              <p class="menu-label">Boards</p>
              <ul class="menu-list">
                ${createHtml(data, bordsItem, true)}
              </ul>
              <i data-add="board" class="add-board-btn fas fa-plus"></i>
            </aside>
          </div>`
}

