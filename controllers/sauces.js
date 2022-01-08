const Thing = require("../models/thing");

/// Créer un Objet (sauce)
exports.createThing = (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });

  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch(() => res.status(400).json({ error }));
};

///Modification d'un objet (sauce)

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch(() => res.status(400).json({ error }));
};

//// Supprimer un Objet (sauce)

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch(() => res.status(400).json({ error }));
};

/// Récupérer un seul Objet (sauce)

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

/// Récupérer tous les Objets (sauces)

exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
