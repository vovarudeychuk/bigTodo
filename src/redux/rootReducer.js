import { combineReducers } from 'redux'
import {
  ADD_BOARD,
  SHOW_BOARD,
  ADD_LIST,
  TOGGLE_TASK,
  MINIMIZE_LIST,
  ADD_TASK,
  RESIZE_LIST,
  REMOVE_LIST,
  REMOVE_BOARD,
  ACTIVE_BOARD_LIST,
  ACTIVE_TASK,
} from './types'

const id = 100
let initialState = [
  {
    id,
    name: 'My New board', 
    data: [
      {
        title: 'To do',
        parentId: id,
        id: 323424243234,
        isActive: true,
        value: 30,
        minimize: false,
        styles: {resizeClass: 'is-one-quarter'},
        cards: [
          {
            id: 1223233242,
            parentId: id,
            text: 'Some new card 1',
            checked: false,
            isActive: false
          },
          {
            id: 125343242,
            parentId: id,
            text: 'Some new card 2',
            checked: false,
            isActive: false,
          },
          {
            id: 123334242,
            parentId: id,
            text: 'Some new card 3',
            checked: false,
            isActive: false,
          },
          {
            id: 122366233242,
            parentId: id,
            text: 'Some new card 4',
            checked: false,
            isActive: false,
          },
          {
            id: 122324533242,
            parentId: id,
            text: 'Some new card 5',
            checked: false,
            isActive: false,
          },
          {
            id: 12232343433242,
            parentId: id,
            text: 'Some new card 6',
            checked: false,
            isActive: false,
          },
        ],
      },
    ],
  },
]

export function BigTodoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOARD:
      return [...state, action.data]
    case REMOVE_BOARD: 
      return state.filter((board) => Number(board.id) !== Number(action.boardId))
    case ADD_LIST:
      return state.map((todo) => {
        if (Number(todo.id) === Number(action.id)) {
          todo.data.push(action.data)
        }
        return todo
      })  
    case REMOVE_LIST:
        state.map(todo => todo.data.map(list => {
          if(Number(list.id) === Number(action.id)) {
            // todo wtf with filter ?
            todo.data = todo.data.filter(l => Number(l.id) !== Number(action.id))
          }
          return todo
     }))  
    case MINIMIZE_LIST:
      state.map((todo) => {
        todo.data.map((task) => {
          if (Number(task.id) === Number(action.id)) {
            task.minimize = !task.minimize
          }
        })
        return todo
     })
     case ACTIVE_BOARD_LIST:
      state.map((todo) => {
        if(todo.id === action.boardId) {
        todo.data.map((task) => {
          if(task.isActive) {
            task.isActive = false
          }
          if (Number(task.id) === Number(action.listId)) {
            task.isActive = true
          }
        })
        return todo
      } })
    case TOGGLE_TASK:
      return state.map((todo) => {
        todo.data.map((card) =>
          card.cards.map((task) => {  
            if (Number(task.id) === Number(action.id)) {
              task.checked = !task.checked
            }
          })
        )
        return todo
      })
      case ACTIVE_TASK:
      return state.map((todo) => {
        todo.data.map((card) =>
          card.cards.map((task) => {  
            if(task.isActive) {
              task.isActive = false
            }
            if (Number(task.id) === Number(action.id)) {
              task.isActive = true
            }
          })
        )
        return todo
      })
      case ADD_TASK:
        return state.map((todo) => {
          todo.data.map((card) => {
            if (Number(card.id) === Number(action.id)) {
                card.cards.push(action.task)
            }
          })
          return todo
    })
    default:
      return state
  }
}

function sideBoardReducer(state = { activeBoard: 100,  previousBoard: 100}, action) {
  switch (action.type) {
    case SHOW_BOARD:
      return { activeBoard: action.boardId, previousBoard: state.activeBoard }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  bigTodo: BigTodoReducer,
  activeBoard: sideBoardReducer,
})