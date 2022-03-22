import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initWebRoutesAdmin from "./route/admin_route";
import initWebroutesPatient from "./route/patient-route";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config();

let app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

// routes
initWebRoutes(app);
initWebRoutesAdmin(app);
initWebroutesPatient(app);

connectDB();

let port = process.env.PORT || 8081; // need require('dotenv').config() to run

app.listen(port, () => {
  console.log("Backend NodeJS is running on the port : " + port);
});
