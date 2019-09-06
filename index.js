const db = require('./db/connection.js');
const {User_model} = require('./db/models/user.js');
const {Country_model} = require('./db/models/country.js');
const user = require('./db/methods/user.js');
const test_id = '5d5063604f02fb01396a8faa';
db.connect()
.then(async connection=>{
	const found = await user.find({displayName: 'Petya'}); 
	const foundById = await user.findById(test_id);
	const updated = await user.update({_id: test_id},	
		{displayName: 'Anna'});
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
		.select(['displayName', 'email', 'createdAt', '_id']) // get specific fields
		.exec();
	const usersToAdd = [found[0]._id, foundById._id];
	//const updatedById = await user.updateUsersArrById(specific[0]._id, usersToAdd);
	const paginated = await user.get_paginated({});
	const nested = await user.find({"any.details.name": "Vasya"});
	//console.log(found, foundById, updated, specific, paginated);
	console.log(nested);
	db.disconnect();
})
.catch(console.error);
