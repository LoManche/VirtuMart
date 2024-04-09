//import React from "react";
//import { renderToString } from "react-dom/server";
//import { StaticRouter } from "react-router-dom/server";
import express from "express";
import session from "express-session";
import cors from "cors";
import process from "process";
import path from "path";

import { sessionStore } from "./db.js";
import router from "./apiRoutes.js";

const PORT = 3000;
const app = express();
const __dirname = process.cwd();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
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


// Serve the app in dist(created by npm run build)
app.use(express.static(path.join(__dirname,"dist")));

// Login related APIs
app.use("/api", router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
