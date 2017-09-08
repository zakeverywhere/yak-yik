import superagent from 'superagent'

export default {
	get: (url,params,callback) => {
		superagent
		.get(url)
		.query(params)
		.set('Accept','application/json')
		.end((err,response) => {
			if(err){
				callback(err, null)
				return
			}

			let confirmation = response.body.confirmation
			if (confirmation != 'success') {
				callback(JSON.stringify(response.body), null)
				return
			}

			callback(null,response.body)
		})
	},

	post: (url,body,callback) => {
		superagent
		.post(url)
		.send(body)
		.set('Accept','application/json')
		.end((err,response) => {
			if(err){
				callback(err, null)
				return
			}

			let confirmation = response.body.confirmation
			if (confirmation != 'success') {
				callback(response.body, null)
				return
			}
			callback(null,response.body)
		})
	},
	put: () => {

	},
	delete: () => {
			
	}

}