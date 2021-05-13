export function shudAddBoard(event) {
    return event.target.dataset.add === 'board'
}

export function shudShowBoard(event) {
    return event.target.dataset.show === 'board'
}

export function shudRemoveBoard(event) {
    return event.target.dataset.remove === 'board'
}

export function shudMinimize(event) {
    return event.target.dataset.type === 'minimize'
}

export function shudAddList(event) {
    return event.target.dataset.add === 'List'
}

export function shudToggleTask(event) {
    return event.target.dataset.type === 'toggle-task'
}

export function shudAddTask(event) {
    return event.target.dataset.add === 'list-task'
}

export function shudResize(event) {
    return event.target.dataset.type === 'resize'
}

export function shudRemoveList(event) {
    return event.target.dataset.remove === 'list'
}

export function shudCloseModal(event) {
    return event.target.dataset.close === 'input'
}
 