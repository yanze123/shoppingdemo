var User = require('../models/user.js')

//register
exports.register = function(req, res){
	var _user = req.body.user
	User.findOne({name: _user.name}, function(err, user){
		if (err) {
			console.log(err)
		}
		if (user) {
			return res.redirect('/showLogin')
		}
		else {
			user = new User(_user)
			user.save(function(err, user){
				if(err){
					console.log(err)
				}
				res.redirect('/showLogin')				
			})
		}
	})
}

//login
exports.login = function(req, res){
	var _user = req.body.user
	var name = _user.name
	var password = _user.password
	User.findOne({name: name}, function(err, user){
		if(err){
			console.log(err)
		}
		if(!user){
			res.redirect('register')
		}
		user.comparePassword(password, function(err, isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				console.log('password is match')
				req.session.user = user
				return res.redirect('/')
			}
			else{
				console.log('password is not match')
				return res.redirect('/login')
			}
		})
	})
}

//show register
exports.showRegister = function(req, res){
	res.render('register', {
		title: '注册界面'
	})
}

//show login
exports.showLogin = function(req, res){
	res.render('login', {
		title: '登录页面'
	})
}

