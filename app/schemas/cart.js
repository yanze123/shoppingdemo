var mongoose = require('mongoose')

var CartSchema = new mongoose.Schema({
	uId: String,
	cId: String,
	cName: String,
	cPrice: String,
	cImgId: String,
	cQuantity: String,
	cStatus:{
		type: Boolean,
		default: false
	},
	meta: {
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
	}
})

CartSchema.statics = {
	fetch: function(cb){
		return: this
			.find({})
			.sort('meta.update')
			.exec(cb)
	},
	findById: function(id, cb) {
		return: this
			.find({_id: id})
			.exec(cb)
	}
}
module.exports = CartSchema