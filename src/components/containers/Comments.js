import React, {Component} from 'react'
import { Comment,CreateComment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class Comments extends Component {
	constructor(){
		super()
		this.state = {
			list: []
		}
	}

	componentDidMount(){
		APIManager.get('/api/comment', null, (err,response) => {
			if(err){
				alert("ERROR: " + err) 
				return
			}
			
			this.setState({
				list:response.results
			})
		})
	}

	submitComment(comment){
		APIManager.post('api/comment',comment,(err,response) => {
				if (err) {
					alert('ERROR: ' + err)
					return
				} 

				let updatedList = Object.assign([],this.state.list)
				updatedList.push(response.message);
				this.setState({
					list: updatedList
				})
		})
	}

	render(){
		const style = styles.comment
		const commentList = this.state.list.map((comment,index)=>{
			return <li key={index}><Comment curComment={comment} /></li>
		})

		const selectedZone = this.props.zones[this.props.index]
		const zoneName = (selectedZone == null)? '':selectedZone.name
		return (
			<div>
				<h2>{zoneName}</h2>
				<div style={style.commentsBox}>
					<ul style={style.commentsList}>
						{commentList}
					</ul>

					<CreateComment onCreate={this.submitComment.bind(this)} />
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		index: state.zone.selected,
		zones: state.zone.list
	}
}
export default connect(stateToProps)(Comments)