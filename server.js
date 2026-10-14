require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/database");
const { connectRedis } = require("./src/config/redis");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        // cnx redis
        await connectRedis();

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
