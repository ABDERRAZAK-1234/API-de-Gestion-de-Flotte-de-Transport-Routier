const { createClient } = require("redis");

if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL n'est pas configurée");
}

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("error", (error) => {
    console.error("Erreur Redis :", error.message);
});

redisClient.on("ready", () => {
    console.log("Redis connecté avec succès");
});

async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

module.exports = {
    redisClient,
    connectRedis
};