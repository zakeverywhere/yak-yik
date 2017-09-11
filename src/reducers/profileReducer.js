import constants from '../constants/constants'

var initialState = {
	list: []
}

export default (state = initialState, action) => {
	let updated = Object.assign({},state)
	
	switch(action.type){
		case constants.PROFILE_RECEIVED:
			// console.log("profile received:")
			// console.log(action.profile)

			let updatedList = Object.assign([],updated.list)
			updatedList.push(action.profile)
			updated['list'] = updatedList

			console.log(updated)
			return updated

		default:
			return state
	}
}