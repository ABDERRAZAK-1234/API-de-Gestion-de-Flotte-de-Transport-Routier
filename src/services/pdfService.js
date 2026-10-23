const PDFDocument = require("pdfkit");

const formatDate = (value) => {
  if (!value) return "Non renseignée";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Non renseignée";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Casablanca",
  }).format(date);
};

const formatRelation = (relation, fields = []) => {
  if (!relation) return "Non renseigné";

  if (typeof relation !== "object") {
    return String(relation);
  }

  const result = fields
    .map((field) => relation[field])
    .filter(
      (value) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    )
    .join(" ");

  return result || String(relation._id || "Non renseigné");
};

const formatValue = (value, suffix = "") => {
  if (value === undefined || value === null || value === "") {
    return "Non renseigné";
  }

  return `${value}${suffix}`;
};

const generateMissionOrderPdf = async (trajet) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: "Ordre de mission",
        Subject: `Trajet ${trajet._id}`,
      },
    });

    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", reject);

    const addField = (label, value) => {
      doc
        .font("Helvetica-Bold")
        .text(`${label} : `, { continued: true });

      doc
        .font("Helvetica")
        .text(String(value ?? "Non renseigné"));

      doc.moveDown(0.5);
    };

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("ORDRE DE MISSION", { align: "center" });

    doc.moveDown();

    doc
      .font("Helvetica")
      .fontSize(11)
      .text("FleetTrackPRO — Document de transport", {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .text("1. INFORMATIONS DU TRAJET");

    doc.moveDown();
    doc.fontSize(10);

    addField("Référence", String(trajet._id));
    addField("Statut", trajet.statut);
    addField("Lieu de départ", trajet.lieuDepart);
    addField("Lieu d'arrivée", trajet.lieuArrivee);
    addField("Marchandise", trajet.marchandise);

    addField(
      "Départ prévu",
      formatDate(trajet.dateDepartPrevue)
    );

    addField(
      "Arrivée prévue",
      formatDate(trajet.dateArriveePrevue)
    );

    doc.moveDown();

    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .text("2. CHAUFFEUR ET VÉHICULE");

    doc.moveDown();
    doc.fontSize(10);

    addField(
      "Chauffeur",
      formatRelation(trajet.chauffeur, ["prenom", "nom"])
    );

    addField(
      "Camion",
      formatRelation(trajet.camion, [
        "immatriculation",
        "marque",
        "modele",
      ])
    );

    addField(
      "Remorque",
      formatRelation(trajet.remorque, [
        "immatriculation",
        "reference",
        "nom",
      ])
    );

    doc.moveDown();

    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .text("3. SUIVI DE LA MISSION");

    doc.moveDown();
    doc.fontSize(10);

    addField(
      "Départ réel",
      formatDate(trajet.dateDepartReelle)
    );

    addField(
      "Arrivée réelle",
      formatDate(trajet.dateArriveeReelle)
    );

    addField(
      "Kilométrage départ",
      formatValue(trajet.kilometrageDepart, " km")
    );

    addField(
      "Kilométrage arrivée",
      formatValue(trajet.kilometrageArrivee, " km")
    );

    addField(
      "Volume de gasoil",
      formatValue(trajet.volumeGasoil, " L")
    );

    addField("Remarque", trajet.remarque || "Aucune");

    doc.moveDown(2);

    doc
      .font("Helvetica")
      .fontSize(9)
      .text(
        `Document généré le ${formatDate(new Date())}`,
        { align: "center" }
      );

    doc.end();
  });
};

module.exports = {
  generateMissionOrderPdf,
};