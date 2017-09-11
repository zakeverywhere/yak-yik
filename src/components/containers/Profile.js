import React, { Component } from 'react'
import { APIManager } from '../../utils/index'
import { connect } from 'react-redux'
import actions from '../../actions/actions'


class Profile extends Component {
	constructor() {
		super()
		this.state = {
		
		}
	}

	componentDidMount () {
		const curProfile = this.props.profiles[this.props.username]
		if(curProfile != null){
			return
		}
		this.props.fetchProfile({username: this.props.username})
	}

	render (){
		let header = null
		const profile = this.props.profiles[this.props.username]
		
		if (profile != null) {
			header = (
				<div>
					<h3>{profile.username}</h3>
					<p>city: {profile.city}</p>
					<p>gender: {profile.gender}</p>
				</div>
			)
		}

		return (
			<div>
				{header}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		profiles: state.profile.map

	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchProfile: (params) => {dispatch(actions.fetchProfile(params))}
	}
}
export default connect(stateToProps,dispatchToProps)(Profile)