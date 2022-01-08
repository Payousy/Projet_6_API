const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

/// Créer un Objet (sauce)
router.post("/", saucesCtrl.createThing);

///Modification d'un objet (sauce)
router.put("/:id", saucesCtrl.modifyThing);

///// Route pour suppression d'un objet (Route delete)

router.delete("/:id", saucesCtrl.deleteThing);

/// Récupérer un seul Objet (sauce)
router.get("/:id", saucesCtrl.getOneThing);

/// Récupérer tous les Objets (sauces)
router.get("/", saucesCtrl.getAllThings);

module.exports = router;
