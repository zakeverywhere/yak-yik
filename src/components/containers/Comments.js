import React, {Component} from 'react'
import { Comment,CreateComment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class Comments extends Component {
	constructor(){
		super()
	}

	submitComment(comment){
		if(this.props.user == null){
			alert("please sign up or log in to comment ")
			return
		}

		let updatedComment = Object.assign({},comment)
		
		const zone = this.props.zones[this.props.index]
		updatedComment['zone'] = zone._id
		updatedComment['username'] = this.props.user.username

		APIManager.post('api/comment',updatedComment,(err,response) => {
				if (err) {
					alert('ERROR: ' + err)
					return
				} 
				this.props.commentCreated(response.result)
		})
	}

	componentDidUpdate(){	

		let zone = this.props.zones[this.props.index]
		if (zone == null) {
			console.log("zone is null")
			return
		}

		let comments = this.props.commentMap[zone._id] 
		if(comments != null){
			return
		}

		APIManager.get('/api/comment', {zone:zone._id}, (err,response) => {
			if(err){
				alert("ERROR: " + err.message) 
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
		commentsLoaded: state.comment.loaded,
		user: state.account.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		commentCreated: (comment) => {dispatch(actions.commentCreated(comment))},
		commentReceived: (comments,zone) => {dispatch(actions.commentReceived(comments,zone))}	
	}
}

export default connect(stateToProps,dispatchToProps)(Comments)