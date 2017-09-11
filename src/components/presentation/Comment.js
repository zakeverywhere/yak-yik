import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Comment extends Component {
	
	render(){
		const curComment = this.props.curComment
		
		return (
			<div style={{marginBottom:16}}>
				<p>{this.props.curComment.body}</p>
				
				<span>
					<Link to={"/profile/"+curComment.username}>
						{curComment.username}
					</Link>
				</span>
				<span>|</span>
				<span>
					{curComment.timestamp}
				</span>
				<hr/>
			</div>
		)
	}
}

export default Comment