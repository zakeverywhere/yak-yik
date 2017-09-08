import React, {Component} from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'
import superagent from 'superagent'
class Comments extends Component {
	constructor(){
		super()
		this.state = {
			list: [],
			comment:{
				username:'',
				body:''
			}

		}
	}

	componentDidMount(){
		superagent
		.get('/api/comment')
		.query(null)
		.set('Accept','application/json')
		.end((err,response) => {
			
			if(err){
				alert("ERROR: " + err);
				return
			}

			let results = response.body.results
			this.setState({
				list:results
			})

		})

	}

	submitComment(){
		let updatedList = Object.assign([],this.state.list)
		updatedList.push(this.state.comment);

		this.setState({
			list: updatedList
		})
		
	}

	updateUsername(evt){
		
		let updatedUsername = Object.assign({}, this.state.comment)
		updatedUsername['username'] = evt.target.value
		
		this.setState({
			comment: updatedUsername
		})
	}

	updateBody(evt){
		
		let updatedComment = Object.assign({}, this.state.comment)
		updatedComment['body'] = evt.target.value
		
		this.setState({
			comment: updatedComment
		})
	}

	updateTimestamp(evt){
		let updatedComment = Object.assign({}, this.state.comment)
		updatedComment['timestamp'] = evt.target.value
		
		this.setState({
			comment: updatedComment
		})
	}

	render(){
		const style = styles.comment
		const commentList = this.state.list.map((comment,index)=>{
			return <li key={index}><Comment curComment={comment} /></li>
		})

		return (
			<div>
				<h2>Comments: Zone 1</h2>
				<div style={style.commentsBox}>
					<ul style={style.commentsList}>
						{commentList}
					</ul>
				</div>

				<input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username" /> <br />
				<input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment" /><br />
				<input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Timestamp" /><br />
				<button onClick={this.submitComment.bind(this)} className="form-control"> Submit Comment </button>

			</div>
		)
	}
}

export default Comments