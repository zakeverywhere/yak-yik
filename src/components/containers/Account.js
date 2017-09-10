import React, { Component } from 'react'
import { APIManager } from '../../utils'
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

		APIManager.post('/account/login', this.state.profile , (err, result) => {
			if (err) {
				alert(err.message)
				return
			}
			
			const confirmation = result.confirmation
			if(confirmation != 'success') {
				alert(result.message)
				return
			}
			console.log(result)
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

		//TODO continue from here
		APIManager.post('/api/profile', this.state.profile, (err, result) => {
			if (err) {
				alert(err)
				return
			}
			
			const confirmation = result.confirmation
			if(confirmation != 'success') {
				alert(result.message)
				return
			}

			console.log(result)
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

	render() {
		return (
			<div>
				<h2>Login</h2>
				<input id='username' onChange={this.updateProfile.bind(this)} type='text' placeholder='username' /><br />
				<input id='password' onChange={this.updateProfile.bind(this)} type='password' placeholder='password' /><br />
				<button onClick={this.login.bind(this)}> Log In </button>
				<br />
				<h2>Sign Up</h2>
				<input id='username' onChange={this.updateProfile.bind(this)} type='text' placeholder='username' /><br />
				<input id='password' onChange={this.updateProfile.bind(this)} type='password' placeholder='password' /><br />
				<button onClick={this.signup.bind(this)}> Join </button>						
			</div>
		)
	}
}

export default Account