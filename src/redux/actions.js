import { 
    ADD_BOARD, 
    REMOVE_BOARD, 
    EDIT_BOARD, 
    ADD_LIST, 
    SHOW_BOARD,
    TOGGLE_TASK,
    REMOVE_TASK,
    MINIMIZE_LIST,
    ADD_TASK,
    RESIZE_LIST,
    REMOVE_LIST,
    ACTIVE_BOARD_LIST,
    ACTIVE_TASK

} from './types'

export function addBoard(data) {
    return {
        type: ADD_BOARD,
        data
    }
}

export function showBoard(boardId) {
    return {
        type: SHOW_BOARD,
        boardId
    }
}

export function removeBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}

export function activeBoardList(listId, boardId) {
    return {
        type: ACTIVE_BOARD_LIST,
        listId,
        boardId
    }
}

export function addList(data, id) {
    return {
        type: ADD_LIST,
        data,
        id
    }
}

export function minimizeList(id) {
    return {
        type: MINIMIZE_LIST,
        id
    }
}

export function resizeList(style, id) {
    return {
        type: RESIZE_LIST,
        style,
        id
    }
}

export function removeList(id) {
    return {
        type: REMOVE_LIST,
        id
    }
}

export function addTask(task, id) {
    return {
        type: ADD_TASK,
        task,
        id
    }
}

export function removeTask(id) {
    return {
        type: REMOVE_TASK, 
        id
    }
}

export function toggleTask(id) {
    return {
        type: TOGGLE_TASK,
        id
    }
}

export function activeTask(id) {
    return {
        type: ACTIVE_TASK,
        id
    }
}



