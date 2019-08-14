const mongoose = require('mongoose');
const connect = ()=>{
	return mongoose.connect('mongodb://localhost:27017/5_mongoose', 
		{useNewUrlParser: true});		
};
const test_id = '5d5063604f02fb01396a8faa';
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
	name: {type: String, unique: true},
});
const Country_model = mongoose.model('country', country_schema);
const User_model = mongoose.model('user', user);
connect()
	.then(async connection=>{
		// to get all use {} it is like * in SQL
		const found = await User_model.find({displayName: 'Petya'}).exec(); 
		const foundById = await User_model.findById(test_id)
			.populate('country')
			.exec();
			const updated = await User_model.findOneAndUpdate({_id: test_id},	
			{displayName: 'Anna'}, 
			{
				upsert: true, // upsert: true - if found nothing - create
				new: true	// new: true - return updated user,	
			}) 
			.exec();
		const specific = await User_model.find({
			createdAt: {
				$gt: new Date('01-01-2019'), // greater than 
				$lt: new Date('09-01-2019'), // less then
			},
			gender: 'F',
			//list: 'item1', // if includes such value in the array
			list: {$in: ['item2', 'item3']}, // match any value in array
		})
		.sort({createdAt: -1})
		.limit(2)
		.exec();
		console.log(specific);
	})
	.catch(console.error);
