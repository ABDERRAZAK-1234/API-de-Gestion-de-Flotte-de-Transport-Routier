require("dotenv").config();

const connectDB = require("./src/config/database");
const { connectRedis } = require("./src/config/redis");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        // cnx redis
        await connectRedis();

        const app = require("./src/app");

        app.listen(PORT, () => {
            console.log(`Server démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error(
            "Erreur lors du démarrage du serveur :",
            error.message
        );

        process.exit(1);
    }
};

startServer();
