const mongoose = require('mongoose');
const connect = ()=>{
	return mongoose.connect('mongodb://localhost:27017/5_mongoose', 
		{useNewUrlParser: true});		
};
const test_id = '5acfb053c49b960aa82ae613';
const user = new mongoose.Schema({
	gender: {
		type: String,
		required: true,
	},
	displayName: String,
	email: {
		type: String,
		unique: true,
	},
	createdAt: Date,
	updatedAt: Date,
	info: {
		school: {type: String},
		size: {type: Number},
	},
	list: [{type: String}],
	defaultValue: {
		type: Boolean,
		default: true,
	},
	country: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'country',
	},
}, {timestamps: true});
const country_schema = new mongoose.Schema({
	name: String,
});
const Country_model = mongoose.model('country', country_schema);
const User_model = mongoose.model('user', user);
connect()
	.then(async connection=>{
		//const user = await UserModel({});
		// to get all use {} it is like * in SQL
		const found = await User_model.find({displayName: 'Petya'}).exec(); 
		const foundById = await User_model.findById(test_id).exec();
		const updated = await User_model.findOneAndUpdate({_id: test_id},	
			{displayName: 'Borya'}, {new: true}).exec(); // new: true - means return updated user
		console.log(found, foundById, updated);
	})
	.catch(console.error);
