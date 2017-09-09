import React, { Component } from 'react'

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

	signup(evt){
		evt.preventDefault()
		console.log(this.state.profile)
		if (this.state.profile.username.length == 0 ){
			alert("please enter a username")
		}
		if (this.state.profile.password.length == 0 ){
			alert("please enter a password")
		}
	}

	updateProfile(evt) {
		evt.preventDefault()
		let updated = Object.assign({},this.state.profile)
		updated[evt.target.id] = evt.target.value

		this.setState({
			profile: updated
		})

		console.log(evt.target.id + "==" + evt.target.value)
	}

	render() {
		return (
			<div>
				<h2>Login</h2>
				<input id='username' onChange={this.updateProfile.bind(this)} type='text' placeholder='username' /><br />
				<input id='password' onChange={this.updateProfile.bind(this)} type='password' placeholder='password' /><br />
				<button> Log In </button>
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