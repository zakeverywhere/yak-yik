import constants from '../constants/constants'

var initialState = {
	map: {}
}

export default (state = initialState, action) => {
	let updated = Object.assign({},state)
	
	switch(action.type){
		case constants.FETCH_PROFILE:
			let updatedMap = Object.assign({},updated.map)
			updatedMap[action.profile.username] = action.profile
			updated['map'] = updatedMap
			return updated

		default:
			return state
	}
}