var express = require('express')
var app = express()
var session = require('express-session')
var bodyParser = require('body-parser')
var multipart = require('connect-multiparty')
var mongoose = require('mongoose')
var bcrypt = require("bcrypt")
var dbUrl = "mongodb://localhost/shoppingWebsite"
var logger = require('morgan')

mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
//app.set('views', require('path').join(__dirname, 'app/views')) //设定视图存放的目录
app.use(express.static(require('path').join(__dirname, 'public'))) //在本地项目中，指定本地静态资源访问路径
app.use(bodyParser.urlencoded({extended: true}))
app.use(multipart())
app.use(session({
	secret: 'secret',
	cookie: {
		maxAge: 1000*60*30
	}
}))

app.get('/', function(req, res){
	res.render('register', {
		title: '购物网'
	})
})


if('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(logger(':method :url :status')) // express 4
	app.locals.pretty = true
	mongoose.set('debug', true)
}

require('./config/routes.js')(app)

//使用中间件来传递信息
// app.use(function(req, res, next){
// 	res.locals.user = req.session.user //保存用户信息
// 	var err = req.session.error //保存结果响应信息
// 	res.loacls.message = '' //保存和他们里标签
// })

app.listen(3000)