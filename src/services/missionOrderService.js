const mongoose = require("mongoose");

const trajetRepository = require("../repositories/trajetRepository");
const pdfService = require("./pdfService");
const storageService = require("./storageService");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getMissionOrderUrl = async ({ trajetId, user }) => {
  if (!mongoose.Types.ObjectId.isValid(trajetId)) {
    throw createError("Identifiant du trajet invalide", 400);
  }

  const trajet = await trajetRepository.findByIdForMissionOrder(trajetId);

  if (!trajet) {
    throw createError("Trajet introuvable", 404);
  }

  const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);

  const userId = String(user?._id || user?.id || user?.userId || "");

  const chauffeurId = String(trajet.chauffeur?._id || trajet.chauffeur || "");

  const isAssignedDriver = user?.role === "CHAUFFEUR" && userId === chauffeurId;

  if (!isAdmin && !isAssignedDriver) {
    throw createError(
      "Vous n'êtes pas autorisé à accéder à cet ordre de mission",
      403,
    );
  }

  let metadata = trajet.ordreMission;

  if (!metadata?.s3Key) {
    const pdfBuffer = await pdfService.generateMissionOrderPdf(trajet);

    const referenceDate = trajet.dateDepartPrevue || new Date();

    const year = new Date(referenceDate).getUTCFullYear();

    const filename = `ordre-mission-${trajet._id}.pdf`;
    const s3Key = `orders/${year}/${filename}`;

    await storageService.putObject({
      key: s3Key,
      body: pdfBuffer,
      contentType: "application/pdf",
    });

    metadata = {
      bucket: process.env.S3_BUCKET,
      s3Key,
      sizeBytes: pdfBuffer.length,
      generatedAt: new Date(),
    };

    const savedTrajet = await trajetRepository.saveMissionOrderMetadata(
      trajet._id,
      metadata,
    );

    if (!savedTrajet) {
      throw createError("Impossible d'enregistrer les métadonnées du PDF", 500);
    }
  }

  const filename = `ordre-mission-${trajet._id}.pdf`;
  const expiresIn = 15 * 60;

  const url = await storageService.presignedGetObject({
    key: metadata.s3Key,
    filename,
    expiresIn,
  });

  return {
    url,
    filename,
    expiresIn,
    expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
  };
};

module.exports = {
  getMissionOrderUrl,
};
