import {applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import {rootReducer} from './rootReducer'

const persistConfig = {
    key: 'big-todo',
    storage,
  }
  
export const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(thunk, logger)
    )
  )

persistStore(store)