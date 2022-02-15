const mongoose = require("mongoose");

//connexion base de données
mongoose
  .connect(
    process.env.DB_USER_PASS,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB a réussie !"))
  .catch(() => console.log("Connexion à MongoDB a échoué !"));
