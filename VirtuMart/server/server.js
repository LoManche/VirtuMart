// Programmer: Lo Yat Fung 1155158670, Lai Cheuk Lam 1155159309
// Date: 2024-04-11
// Description: This file is the main server file of the VirtuMart server.
// Purpose: Initialize the server and set up the routes for the server using express.
// The server will listen to the port 3000 and serve the app in the dist folder.
// All api routes are defined in the apiRoutes.js file, accessed by /api/THEROUTE.
// Using: server.js and queries.js
import express from "express";
import session from "express-session";
import cors from "cors";
import process from "process";
import path from "path";
import bodyParser from "body-parser";

import { sessionStore } from "./db.js";
import router from "./apiRoutes.js";
// Default port for the server
const PORT = 3000;

const app = express();
const __dirname = process.cwd();

// Limit the size of the request body
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// For development on local machine with cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  }),
);

// For production
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// Session configuration
app.use(
  session({
    secret: "virtumartserverisawesome",
    name: "sessionId",
    saveUninitialized: false,
    resave: true,
    rolling: true,
    store: sessionStore,
    cookie: {
      maxAge: 15 * 60 * 1000, // 15 minutes inactivation
      // secure: true,
      httpOnly: true,
    },
  }),
);

// Serve the app in dist(created by building the app using npm run build)
app.use(express.static(path.join(__dirname, "dist")));

// APIs routes: all routes start with /api
app.use("/api", router);

// Catch all other routes and return the index file
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
