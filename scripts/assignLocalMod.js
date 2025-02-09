const mongoose = require('mongoose');
const Account = require('../models/account');
const successfulAdmins = [];

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);

Account.find({ username: { $in: ['Uther', 'admin'] } })
	.cursor()
	.eachAsync(acc => {
		acc.staffRole = 'admin';
		acc.save();
		successfulAdmins.push(acc.username);
	})
	.then(() => {
		console.log('Users', successfulAdmins, 'were assigned the admin role.');
		mongoose.connection.close();
	});
