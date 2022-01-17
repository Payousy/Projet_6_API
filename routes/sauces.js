const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

//const sauceInput = require("../middleware/sauceInput");
const saucesCtrl = require("../controllers/sauces");

/// Récupérer tous les Objets (sauces)
router.get("/", auth, multer, saucesCtrl.getAllSauces);

/// Récupérer un seul Objet (sauce)
router.get("/:id", auth, multer, saucesCtrl.getOneSauce);

/// Créer un Objet (sauce)
router.post("/", auth, multer, /*sauceInput,*/ saucesCtrl.createSauce);

///Modification d'un objet (sauce)
router.put("/:id", auth, multer, /*sauceInput,*/ saucesCtrl.modifySauce);

///// Route pour suppression d'un objet (Route delete)

router.delete("/:id", auth, multer, saucesCtrl.deleteSauce);

router.post("/:id/like", auth, saucesCtrl.likeDislikeSauce);

module.exports = router;
