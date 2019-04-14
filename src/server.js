import swaggerTools from "swagger-tools";
import jsyaml from "js-yaml";
import fs from "fs";
import path from "path";
import http from "http";
import expressApp from "./app";

const serverPort = 80;

// We need to define our function name for express routes to set the correct base path
const functionName = "api";

// Initialize express app
const app = expressApp(functionName);

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(
  path.join(__dirname, "../api/swagger.yaml"),
  "utf8"
);
const swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function server(middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Serve the Swagger documents and Swagger UI
  app.use(
    middleware.swaggerUi({
      apiDocs: "/swagger/docs/1.0",
      swaggerUi: "/swagger/ui/index"
    })
  );

  // Start the server
  http.createServer(app).listen(serverPort, function h() {
    console.log(
      "Your server is listening on port %d (http://localhost:%d)",
      serverPort,
      serverPort
    );
    console.log(
      "Swagger-ui is available on http://localhost:%d/swagger/ui/index",
      serverPort
    );
  });
});
