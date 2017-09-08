import constants from '../constants/constants'

var initialState = {
	selected: 0,
	list: []
}

export default (state = initialState, action) => {
	var updated = Object.assign({},state);
	switch (action.type) {
		case constants.ZONE_SELECTED:
			updated.selected = action.index
			return updated

		case constants.ZONES_RECEIVED:
			updated['list'] = action.zones
			return updated

		case constants.ZONE_CREATED:
			
			let updatedList = Object.assign([], updated.list) 
			updatedList.push(action.zone)
			updated['list'] = updatedList

			return updated

		default:
			return state
	}
}