const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
/// Créer un Objet (sauce)
router.post("/", auth, multer, saucesCtrl.createSauce);

///Modification d'un objet (sauce)
router.put("/:id", auth, multer, saucesCtrl.modifySauce);

///// Route pour suppression d'un objet (Route delete)

router.delete("/:id", auth, multer, saucesCtrl.deleteSauce);

/// Récupérer un seul Objet (sauce)
router.get("/:id", auth, multer, saucesCtrl.getOneSauce);

/// Récupérer tous les Objets (sauces)
router.get("/", auth, multer, saucesCtrl.getAllSauces);

module.exports = router;
