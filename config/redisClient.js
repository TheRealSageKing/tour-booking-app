const redis = require("redis");
const redisClient = () => {
	const redisClient = redis.createClient({
		url: "redis://redis:6379",
	});

	redisClient.connect().catch(console.error);

	return redisClient;
};

module.exports = redisClient;
