const mongoose = require('mongoose');
const connect = ()=>{
	return mongoose.connect('mongodb://localhost:27017/5_mongoose', 
		{useNewUrlParser: true});		
}
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
});
const UserModel = mongoose.model('user', user);
connect()
	.then(async connection=>{
		const user = await UserModel.create({
			gender: 'M',
			displayName: 'Petya',
			email: 'petya@mail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		console.log(user);
	})
	.catch(console.error);
