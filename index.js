import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
import {dirname} from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(_dirname+"/public/index.html");
});

app.get("/all", async (req, res) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=100&x_cg_demo_api_key=CG-eFYwrgHm9RnASxatp9QDMzhA");
    const result = response.data;
    res.render("allPrices.ejs", { data: result });
    console.log(result);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});