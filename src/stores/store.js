import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { accountReducer, zoneReducer, commentReducer, profileReducer} from '../reducers/index'

var store;
export default {

	configureStore: () => {
		const reducers = combineReducers({
			comment: commentReducer,
			profile: profileReducer,
			zone: zoneReducer,
			account: accountReducer
		})

		store = createStore (reducers,applyMiddleware(thunk))
		
		return store
	},

	currentStore: () => {
		return store
	}
}