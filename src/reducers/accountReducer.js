import constants from '../constants/constants'

var initialState = {
	user: null
}

export default (state = initialState, action) => {
	let updated = Object.assign({},state)
	switch(action.type){
		case constants.CURRENT_USER_RECEIVED:
			let updatedUser = Object.assign({},action.user)
			updated['user'] = updatedUser
			return updated

		case constants.LOG_OUT:
			updated['user'] = null
			return updated

		default:
			return state	
	}
}