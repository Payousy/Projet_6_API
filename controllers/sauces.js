const Sauce = require("../models/thing");

const fs = require("fs");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Récupérer tous les Objets (sauces)

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

/// Récupérer un seul Objet (sauce)
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

/// Créer un Objet (sauce)
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersDisLiked: [" "],
  });
  console.log(req.body.sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch(() => res.status(400).json({ error }));
};

///Modification d'un objet (sauce)

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch(() => res.status(400).json({ error }));
};

//// Supprimer un Objet (sauce)
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//////////////////////
////// Partie concernant les likes et dislikes  //////////
////////////////////

exports.likeDislikeSauce = (req, res, next) => {
  console.log("Je suis dans le controleur like !!!");

  Sauce.findOne({ _id: req.params.id })

    .then((Sauce) => {
      switch (req.body.like) {
        case 1:
          if (
            !Sauce.usersLiked.includes(req.body.userId) &&
            req.body.like === 1
          ) {
            console.log(
              "userid n'est pas dans userLiked BDD. Il est envoyer à partir du front like a 1"
            );
            ///// Mise à jour de la BDD
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Sauce like +1" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case -1:
          if (
            !Sauce.usersDisLiked.includes(req.body.userId) &&
            req.body.like === -1
          ) {
            console.log(
              "userid est dans userDisLiked BDD. Il est envoyer à partir du front like = 1"
            );
            ///// Mise à jour de la BDD
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Sauce like +1" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case 0:
          if (Sauce.usersLiked.includes(req.body.userId)) {
            console.log(
              "userId est dans userLiked BDD. Il est envoyer à partir du front et case = 0"
            );
            ///// Mise à jour de la BDD
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Sauce like 0" }))
              .catch((error) => res.status(400).json({ error }));
          }

          if (Sauce.usersDisLiked.includes(req.body.userId)) {
            console.log(
              "userid est dans userLiked BDD. Il est envoyer à partir du front like = 0"
            );
            ///// Mise à jour de la BDD
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { userDisLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: "Sauce dislike 0" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
