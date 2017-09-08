import React, { Component } from 'react'

class CreateZone extends Component {
	constructor(){
		super()
		this.state = {
			zone: {
				name:'',
				zipCodes:''
			}
		}
	}

	updateZone(evt){
		let updatedZone = Object.assign({},this.state.zone)
		updatedZone[evt.target.id] = evt.target.value
		// console.log("updatedZone: "+JSON.stringify(updatedZone));

		this.setState({
			zone: updatedZone
		})
	}

	addZone(evt){
		let updatedZone = Object.assign({},this.state.zone)
		updatedZone['zipCodes'] = updatedZone.zipCodes.split(',')
		
		this.props.onCreate(updatedZone)
	}

	render(){
		return (
			<div>
				<input id="name" onChange={this.updateZone.bind(this)} className="form-control" placeholder="Name"></input>
				<input id="zipCodes" onChange={this.updateZone.bind(this)} className="form-control" placeholder="Zip Code"></input>
				<button onClick={this.addZone.bind(this)} className="btn btn-danger"> add zone </button>
			</div>
		)
	}
}

export default CreateZone