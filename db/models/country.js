const mongoose = require('mongoose');
const E = exports;
// Schema
const country_schema = new mongoose.Schema({
	name: {type: String, unique: true},
});
// Model
E.Country_model = mongoose.model('country', country_schema);
