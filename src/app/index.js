/* Express App */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nocache from "nocache";
import compression from "compression";

import fibonacciRoute from "./routes/fibonacci";
import reverseWordsRoute from "./routes/reverse-words";
import tokenRoute from "./routes/token";
import triangleTypeRoute from "./routes/triangle-type";

/* My express App */
export default function expressApp(functionName) {
  const app = express();
  const router = express.Router();

  // Set router base path for local dev
  const routerBasePath = `/${functionName}`;

  // Apply express middlewares
  // gzip responses
  router.use(compression());
  router.use(nocache());

  /* define routes */

  router.route("/").all((req, res) => {
    res.status(404).end();
  });

  router
    .route("/fibonacci")
    .all((req, res, next) => {
      if (req.method !== "GET") {
        res.status(405).json({
          message: `The requested resource does not support http method '${
            req.method
          }'.`
        });
        return;
      }
      next();
    })
    .get(fibonacciRoute);

  router
    .route("/reversewords")
    .all((req, res, next) => {
      if (req.method !== "GET") {
        res.status(405).json({
          message: `The requested resource does not support http method '${
            req.method
          }'.`
        });
        return;
      }
      next();
    })
    .get(reverseWordsRoute);

  router
    .route("/token")
    .all((req, res, next) => {
      if (req.method !== "GET") {
        res.status(405).json({
          message: `The requested resource does not support http method '${
            req.method
          }'.`
        });
        return;
      }
      next();
    })
    .get(tokenRoute);

  router
    .route("/triangletype")
    .all((req, res, next) => {
      if (req.method !== "GET") {
        res.status(405).json({
          message: `The requested resource does not support http method '${
            req.method
          }'.`
        });
        return;
      }
      next();
    })
    .get(triangleTypeRoute);

  // Setup routes
  app.use(express.json());
  app.use(routerBasePath, router);
  // eslint-disable-next-line no-unused-vars
  app.use(function e(err, req, res, next) {
    res.status(400).json({
      message: "The request is invalid."
    });
  });

  app.use(cors());
  router.use(bodyParser.json({ type: "*/json" }));
  router.use(bodyParser.urlencoded({ extended: true }));

  return app;
}
