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
}, {timestamps: true});
const User_model = mongoose.model('user', user);
connect()
	.then(async connection=>{
		//const user = await UserModel({});
		const found = await User_model({displayName: 'Petya'}); // to get all use {} it is like * in SQL
		const foundById = await User_model.findById(test_id);
		const updated = await User_model.findByIdAndUpdate(test_id, 				{displayName: 'Borya'});
		console.log(found, foundById, updated);
	})
	.catch(console.error);
