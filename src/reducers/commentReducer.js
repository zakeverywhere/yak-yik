 import constants from '../constants/constants'

var initialState = {
	map: {
	}
}

export default (state = initialState, action) => {
	let updated = Object.assign({},state)
	let updatedMap = Object.assign({},updated.map)

	switch (action.type) {

		case constants.COMMENT_RECEIVED:
			let zoneComments = updatedMap[action.zone._id]

			if(zoneComments == null) {
				zoneComments = []
				
			} else {
				zoneComments = Object.assign([],zoneComments)
			}
			
			action.comments.forEach( (comment,i) => {
				const updatedComment = Object.assign({},comment)
				zoneComments.push(updatedComment)
			})

			updatedMap[action.zone._id] = zoneComments
			updated['map'] = updatedMap
			return updated

		case constants.COMMENT_CREATED:
			const zone = action.comment.zone
			let updatedList = Object.assign([],updatedMap[zone])
			updatedList.push(action.comment)

			updatedMap[zone] = updatedList
			updated['map'] = updatedMap

			return updated
			
		default:
			return state
	}
}