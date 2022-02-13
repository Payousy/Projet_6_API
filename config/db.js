const mongoose = require("mongoose");

//connexion base de données
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.h9eig.mongodb.net/Api_project?retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB a réussie !"))
  .catch(() => console.log("Connexion à MongoDB a échoué !"));
