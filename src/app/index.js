/* Express App */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";

import fibonacciRoute from "./routes/fibonacci";
import reverseWordsRoute from "./routes/reverse-words";
import tokenRoute from "./routes/token";
import triangleTypeRoute from "./routes/triangle-type";

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

/* My express App */
export default function expressApp(functionName) {
  const app = express();
  const router = express.Router();

  // gzip responses
  router.use(compression());

  // Set router base path for local dev
  const routerBasePath =
    process.env.NODE_ENV === "dev"
      ? `/${functionName}`
      : `/.netlify/functions/${functionName}/`;

  /* define routes */

  router.route("/").all((req, res, next) => {
    res.status(404).end();
  });

  router
    .route("/fibonacci")
    .all((req, res, next) => {
      if (req.method !== "GET") {
        throw new Error("not implemented");
      }
      next();
    })
    .get(fibonacciRoute);

  router
    .route("/reversewords")
    .all((req, res, next) => {
      if (req.method !== "GET") {
        throw new Error("not implemented");
      }
      next();
    })
    .get(reverseWordsRoute);

  router
    .route("/token")
    .all((req, res, next) => {
      if (req.method !== "GET") {
        throw new Error("not implemented");
      }
      next();
    })
    .get(tokenRoute);

  router
    .route("/triangletype")
    .all((req, res, next) => {
      if (req.method !== "GET") {
        throw new Error("not implemented");
      }
      next();
    })
    .get(triangleTypeRoute);

  // Setup routes
  app.use(express.json());
  app.use(routerBasePath, router);
  app.use(function e(err, req, res, next) {
    res.status(400).json({
      message: "The request is invalid."
    });
  });

  // Apply express middlewares
  router.use(cors());
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  return app;
}
