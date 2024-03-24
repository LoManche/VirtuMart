import React from "react";
//import { renderToString } from "react-dom/server";
//import { StaticRouter } from "react-router-dom/server";
import express from "express";
import session from "express-session";
import * as mysql from "./database.js"; //importing the connection to the database

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
