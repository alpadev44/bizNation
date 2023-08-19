// In src/v1/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.1.0",
    info: { title: "thebiznationtest", version: "1.0.0" },
  },
  apis: [
    "./src/routes/personajeRoutes.js",
    "./src/routes/generoRoutes.js",
    "./src/routes/peliculaRoutes.js",
    "./src/routes/userRoutes.js",
    "./src/models/genero.js",
    "./src/models/pelicula.js",
    "./src/models/personaje.js",
    "./src/models/user.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };
