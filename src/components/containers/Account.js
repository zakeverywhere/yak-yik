import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import  actions from '../../actions/actions'


class Account extends Component {
	constructor(){
		super()
		this.state = {
			profile: {
				username: '',
				password: ''
			}
		}
	}

	login(evt) {
		evt.preventDefault()
		if (this.state.profile.username.length == 0 ){
			alert("please enter a username")
			return
		}
		if (this.state.profile.password.length == 0 ){
			alert("please enter a password")
			return
		}

		APIManager.post('/account/login', this.state.profile , (err, response) => {
			if (err) {
				alert(err.message)
				return
			}
			
			const confirmation = response.confirmation
			if(confirmation != 'success') {
				alert(response.message)
				return
			}
			this.props.currentUserReceived(response.result)	
		})

	}

	logout(evt) {
		evt.preventDefault()

		APIManager.get('/account/logout', this.state.profile , (err, response) => {
			if (err) {
				alert(err.message)
				return
			}
			this.props.logout()
		})


	}

	signup(evt){
		evt.preventDefault()
		
		if (this.state.profile.username.length == 0 ){
			alert("please enter a username")
			return
		}
		if (this.state.profile.password.length == 0 ){
			alert("please enter a password")
			return
		}

		APIManager.post('/api/profile', this.state.profile, (err, response) => {
			if (err) {
				alert(err)
				return
			}
			
			const confirmation = response.confirmation
			if(confirmation != 'success') {
				alert(response.message)
				return
			}
		})

		APIManager.post('/account/login', this.state.profile , (err, response) => {
			if (err) {
				alert(err.message)
				return
			}
			
			const confirmation = response.confirmation
			if(confirmation != 'success') {
				alert(response.message)
				return
			}
			this.props.currentUserReceived(response.result)	
		})
	}

	updateProfile(evt) {
		evt.preventDefault()
		let updated = Object.assign({},this.state.profile)
		updated[evt.target.id] = evt.target.value

		this.setState({
			profile: updated
		})
	}

	componentDidMount (){
		APIManager.get('/account/currentuser', null, (err,response) => {
			if (err) {
				// console.log(err.message)
				return
			}

			// console.log(response)
			this.props.currentUserReceived(response.result)
		})
	}

	render() {
		let content = null
		if (this.props.user == null) {
			content = (
				<div>
					<h2>Login</h2>
					<input id='username' onChange={this.updateProfile.bind(this)} type='text' placeholder='username' /><br />
					<input id='password' onChange={this.updateProfile.bind(this)} type='password' placeholder='password' /><br />
					<button onClick={this.login.bind(this)}> Log In </button>
					<br />
					<h2>Sign Up</h2>
					<input id='username' onChange={this.updateProfile.bind(this)} type='text' placeholder='username' /><br />
					<input id='password' onChange={this.updateProfile.bind(this)} type='password' placeholder='password' /><br />
					<input id='city' onChange={this.updateProfile.bind(this)} type='city' placeholder='city' /><br />
					<input id='gender' onChange={this.updateProfile.bind(this)} type='gender' placeholder='gender' /><br />
					<button onClick={this.signup.bind(this)}> Join </button>						
				</div>
			)
		} else {
			content = (
				<div>
					<h2>Welcome {this.props.user.username} </h2> <br />
					<button onClick={this.logout.bind(this)}> log out </button>
				</div>
			)
		} 

		
		return (
			<div>
				{ content }
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		user: state.account.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		logout: () => {dispatch(actions.logout())},
		currentUserReceived: (user) => {dispatch(actions.currentUserReceived(user))}
	}
}

export default connect(stateToProps,dispatchToProps)(Account)
 




