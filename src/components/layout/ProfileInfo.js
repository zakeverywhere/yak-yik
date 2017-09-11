import React, { Component } from 'react'
import { Profile } from '../containers/index'

class ProfileInfo extends Component{

	render (){
		const username = this.props.match.params.username
		return (
			<div>
				<Profile username={username}/>
			</div>
		)
	}
}

export default ProfileInfo