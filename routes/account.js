var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')

router.get('/:action',function(req,res,next){
	const action = req.params.action

	switch (action) {
		case 'currentuser' :
			if (req.session == null || req.session.user == null) {
				res.json({
					confirmation: 'fail',
					message: 'user not logged in'
				})
				return
			}

			ProfileController.findById(req.session.user, (err, result) => {
				if (err) {
					res.json({
						confirmation: 'fail',
						message: err
					})
					return
				}
				res.json({
					confirmation: 'success',
					result: result
				})
			})
			break

		case 'logout' :
			req.session.reset()
			res.json({
				confirmation: 'success',
				result: 'user logged out'
			})
			break

		default:
			res.json({
				confirmation: 'fail',
				message: 'invalid action'
			})
	}
})

router.post('/:action', function(req, res, next){
	const action = req.params.action
	
	switch (action) {
		case 'register' :
			ProfileController.create(req.body, (err, result) => {
				if (err) {
					res.json({
						confirmation: 'fail',
						message: err
					})
					return
				}
				res.json({
					confirmation: 'success',
					result: result
				})
			})
			break
		
		case 'login' :
			ProfileController.find({username: req.body.username},(err, result) => {
				if (err) {
					res.json({
						confirmation: 'fail',
						message: err
					})
					return
				}

				if (result.length == 0) {
					res.json({
						confirmation: 'fail',
						message: 'invalid username'
					})
					return
				}

				const profile = result[0]
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
				if (isPasswordCorrect == false) {
					res.json({
						confirmation: 'fail',
						message: 'wrong password'
					})
					return
				}

				req.session.user = profile._id

				res.json({
					confirmation: 'success',
					result: profile
				})
			})
			break

		default:
			res.json({
				confirmation: 'fail',
				message: 'invalid action'
			})
	}
})

module.exports = router