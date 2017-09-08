import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home'

class App extends Component {
	render(){
		return (
			<div>
				Welcome to Yak-yik
				<Home/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
