var mongoose = require(mongoose)

var CommoditySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	price: Number,
	imgSrc: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

CommoditySchema.statics = {
	fecth: function(cb) {
		return this
			.find({})
			.sort('meta.update')
			.exec(cb) 
	},
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}
module.exports = CommoditySchema

