const express = require("express");
const routerPersonaje = require("./routes/personajeRoutes.js");
const routerPelicula = require("./routes/peliculaRoutes.js");
const routerGenero = require("./routes/generoRoutes.js");
const routerUser = require("./routes/userRoutes.js")
const { swaggerDocs } = require("./routes/swagger.js");
const db = require("./models/index.js");

const app = express();

const PORT = process.env.PORT || 3009;
app.use(express.json());

app.use("/character", routerPersonaje);
app.use("/movie", routerPelicula);
app.use("/genre", routerGenero);
app.use("/auth", routerUser)

db.sequelize.authenticate();
db.sequelize.sync()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito");
    app.listen(PORT, () => console.log(`esta corriendo en el puerto ${PORT}`));
    swaggerDocs(app, PORT);
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
