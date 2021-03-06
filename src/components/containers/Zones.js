import React, {Component} from 'react'
import { Zone, CreateZone} from '../presentation/index'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class Zones extends Component {
	constructor(){
		super()
		this.state = {
		}
	}

	addZone(updatedZone){
		APIManager.post('/api/zone', updatedZone, (err, response) => {
			if (err) {
				alert('ERROR: ' + err)
				return
			}

			this.props.zoneCreated(response.result)
		})
	}

	selectZone(key){
		this.props.zoneSelected(key)
	}

	componentDidMount(){
		this.props.fetchZone(null)
		// APIManager.get('/api/zone',null,(err,response) => {
		// 		if (err) {
		// 			alert('ERROR: ' + err)
		// 			return
		// 		}

		// 		let zones = response.results
		// 		this.props.zonesReceived(zones)
		// })
	}

	render(){
		const listItems = this.props.list.map((zone,index) =>{
			const selected = (index == this.props.selected) 
			return (
				<li key={index}>
					<Zone index={index} 
					onSelect={this.selectZone.bind(this)} 
					isSelected={selected} 
					currentZone={zone} />
				</li>
			)
		});

		return (
			<div>
				<ol>
					{listItems}
				</ol>
				<CreateZone onCreate={this.addZone.bind(this)}/>
				
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		list: state.zone.list,
		selected: state.zone.selected
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchZone: (params) => {dispatch(actions.fetchZone(params))},
		zoneSelected: (index) => dispatch(actions.zoneSelected(index)),
		zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
		zoneCreated: (zone) => dispatch(actions.zoneCreated(zone))
	}
}

export default connect(stateToProps,dispatchToProps)(Zones)
