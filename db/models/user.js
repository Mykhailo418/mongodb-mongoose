const mongoose = require('mongoose');
const E = exports;
// Schema
const user = new mongoose.Schema({
	gender: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		unique: false
	},
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
	listObjects: [{
		title: {type: String},
		count: {type: Number},
	}],
	defaultValue: {
		type: Boolean,
		default: true,
	},
	country: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'country',
	},
	similarUsers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	}],
	any: mongoose.Mixed,
}, {timestamps: true});
// Middlewares(Hooks)
user.pre('find', function(){
	console.log('before find');
});
user.post('find', function(){
	console.log('after find');
});
user.post('find', function(doc, next){
	// if there are 2 arguments it consider this like an async function
	setTimeout(()=>{
		console.log('async after find');
		next();
	}, 100);
});
// Indexes
user.index({
	country: 1,
	displayName: 1,
}, {unique: true});
// Virtuals
user.virtual('similarUsersCount')
	.get(function(){
		return this.similarUsers.length;
	});
// Models
E.User_model = mongoose.model('user', user);
