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

		}
	}

	submitComment(comment){
		let updatedComment = Object.assign({},comment)

		const zone = this.props.zones[this.props.index]
		updatedComment['zone'] = zone._id

		APIManager.post('api/comment',updatedComment,(err,response) => {
				if (err) {
					alert('ERROR: ' + err)
					return
				} 
				this.props.commentCreated(response.message)
		})
	}

	componentDidMount(){
		
	}

	componentDidUpdate(){	
		let zone = this.props.zones[this.props.index]
		if (zone == null) {
			return
		}

		let comments = this.props.commentMap[zone._id] 
		if(comments != null){
			return
		}

		// // console.log('Component did update,Zone ' + zone._id)
		// if (this.props.commentsLoaded == true){
		// 	return
		// } 

		APIManager.get('/api/comment', {zone:zone._id}, (err,response) => {
			if(err){
				alert("ERROR: " + err) 
				return
			}
			this.props.commentReceived(response.results,zone)
		})
	}

	render(){

		const style = styles.comment

		const selectedZone = this.props.zones[this.props.index]
		let zoneName = null
		let commentList = null

		if (selectedZone != null) {
			zoneName = selectedZone.name
			let zoneComments = this.props.commentMap[selectedZone._id]
			
			if (zoneComments != null ) {
				commentList = zoneComments.map((comment,index)=>{
					return <li key={index}><Comment curComment={comment} /></li>
				})
			}
		}

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
		commentMap: state.comment.map,
		index: state.zone.selected,
		zones: state.zone.list,
		commentsLoaded: state.comment.loaded
	}
}

const dispatchToProps = (dispatch) => {
	return {
		commentCreated: (comment) => {dispatch(actions.commentCreated(comment))},
		commentReceived: (comments,zone) => {dispatch(actions.commentReceived(comments,zone))}	
	}
}

export default connect(stateToProps,dispatchToProps)(Comments)