import express from "express";
import cors from "cors";
import categories from "./routers/categories.routers.js";
import customers from "./routers/customers.routers.js";
import games from "./routers/games.routers.js";
import rentals from "./routers/rentals.routers.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(categories);
app.use(customers);
app.use(games);
app.use(rentals);

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
