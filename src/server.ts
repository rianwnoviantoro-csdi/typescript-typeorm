import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { env } from "./config/environtment";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import swaggerUi from "swagger-ui-express";
import { logging } from "./utils/logging";
import { config } from "./config/database";
import router from "./routes";
import swaggerDocument from "./swagger.json";

const app: Application = express();
const port: number = env.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello there!" });
});

if (process.env.NODE_ENV != "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(router);

createConnection(config)
  .then(() => {
    logging.info(`Database connection established`);
    app.listen(port, () => {
      logging.info(`Server running on http://${env.host}:${port}`);
    });
  })
  .catch((e) => {
    logging.error(`Unable to connect to database ${e}`);
    process.exit(1);
  });
