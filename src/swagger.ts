import swaggerAutogen from "swagger-autogen";
import { logging } from "./utils/logging";
import { env } from "./config/environtment";

const outputFile = "./src/swagger.json";
const endpointsFiles = ["./src/routes/index.ts"];

const swaggerOptions = {
  info: {
    title: "Typeorm Express",
    version: "1.0.0",
  },
  host: `http://${env.host}:${env.port}`,
  basePath: "/",
  schemes: ["http"],
};

swaggerAutogen()(outputFile, endpointsFiles, swaggerOptions).then(() => {
  logging.info("Swagger file generated");
});
