import constants from '../constants/constants'

export default {
	profileReceived: (profile) => {
		return {
			type: constants.PROFILE_RECEIVED,
			profile: profile
		}
	},
	commentCreated: (comment) => {
		return {
			type: constants.COMMENT_CREATED,
			comment: comment
		}
	},
	commentReceived: (comments,zone) => {
		return {
			type: constants.COMMENT_RECEIVED,
			comments: comments,
			zone:zone
		}
	},
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
	},
	currentUserReceived: (user) => {
		return {
			type: constants.CURRENT_USER_RECEIVED,
			user: user
		}
	},
	logout: () => {
		return {
			type: constants.LOG_OUT
		}
	}
}