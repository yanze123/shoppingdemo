var User = require('../app/controllers/user.js')

module.exports = function(app) {
	app.use(function(req, res, next){
		var _user = req.session.user

		app.locals.user = _user

		next()
	})


//User
	app.get('/showRegister', User.showRegister)
	app.get('/showLogin', User.showLogin)
	app.post('/user/register', User.register)
	app.post('/user/login', User.login)
}