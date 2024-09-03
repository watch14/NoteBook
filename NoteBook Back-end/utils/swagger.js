import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Your API Name",
    version: "1.0.0",
    description: "API documentation for your project",
  },
  servers: [
    {
      url: "http://localhost:5000/api", // Change this to your API's base URL
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./controllers/*.js"], // Specify the paths to your routes and controllers
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
