
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");

const { redisClient } = require("../config/redis");

const createRedisStore = (prefix) => {
    return new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix,
    });
};

const createLimiter = ({ windowMs, limit, prefix, message }) => {
    return rateLimit({
        windowMs,
        limit,

        store: createRedisStore(prefix),

        standardHeaders: true,
        legacyHeaders: false,

        statusCode: 429,
        message: {
            success: false,
            message,
        },
    });
};

const authLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    prefix: "rl:auth:",
    message: "Trop de tentatives. Réessayez plus tard.",
});

const apiLimiter = createLimiter({
    windowMs: 60 * 1000,
    limit: 120,
    prefix: "rl:api:",
    message: "Limite de requêtes atteinte. Réessayez plus tard.",
});

    const analyticsLimiter = createLimiter({
    windowMs: 60 * 1000,
    limit: 20,
    prefix: "rl:analytics:",
    message: "Limite Analytics atteinte. Réessayez plus tard.",
});

module.exports = {
    authLimiter,
    apiLimiter,
    analyticsLimiter,
};
