import express from "express";
import cors from "cors";
import request from "request";
import { config } from "dotenv";

config({ path: process.env.ENV_FILE_PATH || "./.env" });

const app = express();

const options = {
  maxAge: Number(process.env.MAX_AGE),
  origin: process.env.ORIGIN,
  methods: process.env.METHODS?.split(",").map((method) => method.trim().toUpperCase()),
  credentials: process.env.CREDENTIALS === "true",
  allowedHeaders: process.env.ALLOWED_HEADERS?.split(",").map((header) => header.trim()) || "*",
  exposedHeaders: process.env.EXPOSED_HEADERS?.split(",").map((header) => header.trim()) || "*",
  preflightContinue: process.env.PREFLIGHT_CONTINUE === "true",
  optionsSuccessStatus: Number(process.env.OPTIONS_SUCCESS_STATUS),
};

app.use(cors(process.env.DISABLE_CORS === "true" ? undefined : options));

app.all("*", (req, res) => {
  const target = req.header("Target-URL");
  if (!target)
    return res.status(400).json({ message: "Missing Target-URL header in request", status: 400 });

  request({
    method: req.method,
    url: target + req.url,
    json: req.body,
    headers: { Authorization: req.header("Authorization") },
  }).pipe(res);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
