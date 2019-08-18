const mongoose = require('mongoose');
const E = exports;
E.connect = ()=>{
	return mongoose.connect('mongodb://localhost:27017/5_mongoose', 
		{useNewUrlParser: true});		
};
E.disconnect = () => mongoose.disconnect();
