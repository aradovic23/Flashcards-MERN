import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createDecksController } from "./controllers/createDecksController";
import { getDecksController } from "./controllers/getDecksController";
import { deleteDecksController } from "./controllers/deleteDecksController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardForDeckController } from "./controllers/deleteCardForDeckController";

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/decks", createDecksController);
app.get("/decks", getDecksController);
app.delete("/decks/:deckId", deleteDecksController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.get("/decks/:deckId", getDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardForDeckController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
