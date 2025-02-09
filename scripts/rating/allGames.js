const mongoose = require('mongoose');
const Game = require('../../models/game'); // temp

let count = 0;

module.exports = async rate => {
	try {
		mongoose.Promise = global.Promise;
		await mongoose.connect(process.env.MONGO_URL);
		const cursor = await Game.find({}, { chats: 0 })
			.limit(5000)
			.cursor();
		for (let game = await cursor.next(); game != null; game = await cursor.next()) {
			// Ignore casual games
			if (!game.casualGame) {
				await rate(game);
				count++;

				if (!(count % 100)) {
					console.log('processed game ' + count);
				}
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		console.log('all done');
		await mongoose.disconnect();
	}
};
