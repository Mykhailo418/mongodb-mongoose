const {User_model} = require('../models/user.js');
const E = exports;
E.find = function(params){
	// to get all use {} it is like * in SQL
	return User_model.find(params).exec(); 
};
E.findById = function(id){
	return User_model.findById(id)
		.populate('country')
		.exec();
};
E.update = function(params, data){
	return User_model.findOneAndUpdate(params, data, 
		{
			upsert: true, // upsert: true - if found nothing - create
			new: true	// new: true - return updated user,	
		}) 
		.exec();
};
E.updateMany = function(params, data, options){
	return User_model.updateMany(params, data, options).exec();
};
E.get_paginated = function(params){
	return User_model.find(params)
		.sort({createdAt: 1})
		.skip(2)
		.limit(4)
		.exec();
};
E.updateUsersArrById = function(id, arr){
	// updating array by adding new values from another array
	return User_model.findByIdAndUpdate(id, {
		//$push: {similarUsers: {$each: arr}}
		$addToSet: {similarUsers: {$each: arr}} // add values if they not exist
	}, {new: true})
	.exec();
}
E.removeElemFromArray = function(params, arrName, conditions){
	return User_model.updateMany(params, {$pull: {[arrName]: conditions}});
}
E.searchText = function(text){
	return User_model.find({$text: {$search: text}});
}
