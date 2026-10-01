require('dotenv').config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");

const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingSuperAdmin = await User.findOne({
            role: "SUPER_ADMIN"
        });

        if (existingSuperAdmin) {
            console.log("Super Admin existe déjà.");
            return;
        }

        const hashedPassword = await bcrypt.hash(
            "SuperAdmin123",
            10
        );

        await User.create({
            nom: process.env.SUPER_ADMIN_NOM || "Super",
            prenom: process.env.SUPER_ADMIN_PRENOM || "Admin",
            email: process.env.SUPER_ADMIN_EMAIL,
            password: await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10),
            role: "SUPER_ADMIN",
            statut: "ACTIF"
        });

        console.log("Super Admin créé avec succès.");

    } catch (error) {
        console.error("Erreur seeder:", error.message);

    } finally {
        await mongoose.disconnect();
    }
};

seedSuperAdmin();