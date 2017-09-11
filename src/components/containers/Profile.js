import React, { Component } from 'react'
import { APIManager } from '../../utils/index'
import { connect } from 'react-redux'
import actions from '../../actions/actions'


class Profile extends Component {
	constructor() {
		super()
		this.state = {
			profile: null
		}
	}

	componentDidMount (){
		
		APIManager.get('/api/profile',{username:this.props.username}, (err, response) => {
			if (err) {
				alert (err.message)
				return
			} else {
				if (response.results.length == 0){
					alert('Profile not found!')
				}

				const profile = response.results[0]
				this.props.profileReceived(profile)

				// this.setState({
				// 	profile: profile
				// })
			}
		})
	}

	render (){
		let header = null
		const profile = this.state.profile
		if (profile != null) {
			header = (
				<div>
					<h3>{profile.username}</h3>
					<p>city: {profile.city}</p>
					<p>gender: {profile.gender}</p>
				</div>
			)
		}
		const id = (this.state.profile == null)? null:<h3>{this.state.profile._id}</h3>
		// const profileDiv= this.state.profile.map((field,index) => {
		// }) 

		return (
			<div>
				{header}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		profiles: state.profile.list

	}
}

const dispatchToProps = (dispatch) => {
	return {
		profileReceived: (profile) => {dispatch(actions.profileReceived(profile))}
	}
}
export default connect(stateToProps,dispatchToProps)(Profile)