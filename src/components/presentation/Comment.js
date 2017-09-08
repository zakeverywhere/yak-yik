import React, {Component} from 'react'

class Comment extends Component {
	render(){
		return (
			<div style={{marginBottom:16}}>
				{this.props.curComment.body}<br />
				{this.props.curComment.username}
				<span>|</span>
				{this.props.curComment.timestamp}
				<hr/>
			</div>
		)
	}
}

export default Comment