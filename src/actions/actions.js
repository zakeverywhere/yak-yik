import constants from '../constants/constants'
import { APIManager } from '../utils'

export default {
	fetchProfile: (params) => {
		return (dispatch) => {
			APIManager.get('/api/profile', params, (err,response) => {
				
				if (err) {
					console.log(err.message)
					return
				}

				if (response.results.length == 0){
					alert('Profile not found!')
				}

				const profile = response.results[0]
				dispatch({
					type: constants.FETCH_PROFILE,
					profile: profile
				})
			})
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
	fetchZone: (params) => {
		return (dispatch) => {
			APIManager.get('/api/zone',params,(err,response) => {
				if (err) {
					alert('ERROR: ' + err)
					return
				}

				const zones = response.results
				dispatch({
					type: constants.ZONES_RECEIVED,
					zones: zones
				})
			})
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