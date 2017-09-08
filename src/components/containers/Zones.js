import React, {Component} from 'react'
import Zone from '../presentation/Zone.js'
import superagent from 'superagent'

class Zones extends Component {
	constructor(){
		super()
		this.state = {
			list: [],
			zone: {
				name:'',
				zipCodes:''
			}
		}
	}

	componentDidMount(){
		console.log("componentDidMount")
		
		superagent
		.get('/api/zone')
		.query(null)
		.set('Accept','application/json')
		.end((err,response) => {
			
			if(err){
				alert('ERROR: '+err)
				return
			}

			let results = response.body.results
			this.setState({
				list: results
			})
		})
	}

	updateZone(evt){
		let updatedZone = Object.assign({},this.state.zone)

		updatedZone[evt.target.id] = evt.target.value

		this.setState({
			zone: updatedZone
		})
	}
	addZone(evt){
		let updatedList = Object.assign([],this.state.list)
		updatedList.push(this.state.zone)
		this.setState({
			list: updatedList
		})
	}

	render(){
		const listItems = this.state.list.map((zone,index) =>{
			return (
				<li key={index}><Zone currentZone={zone} /></li>
			)
		});

		return (
			<div>
				<ol>
					{listItems}
				</ol>
				<input id="name" onChange={this.updateZone.bind(this)} className="form-control" placeholder="Name"></input>
				<input id="zipCodes" onChange={this.updateZone.bind(this)} className="form-control" placeholder="Zip Codes"></input>
				<button onClick={this.addZone.bind(this)} className="btn btn-danger"> add zone </button>
			</div>
		)
	}
}

export default Zones