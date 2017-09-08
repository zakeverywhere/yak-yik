import constants from '../constants/constants'

export default {
	commentCreated: (comment) => {
		return {
			type: constants.COMMENT_CREATED,
			comment: comment
		}
	},
	commentReceived: (comments) => {
		return {
			type: constants.COMMENT_RECEIVED
			comments: comments
		}
	}

	zoneSelected: (index) => {
		return {
			type: constants.ZONE_SELECTED,
			index: index
		}

	},
	zonesReceived: (zones) => {
		return {
			type: constants.ZONES_RECEIVED,
			zones: zones
		}

	},
	zoneCreated: (zone) => {
		return {
			type: constants.ZONE_CREATED,
			zone: zone
		}
	}
}