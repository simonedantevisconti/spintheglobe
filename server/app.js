const express = require("express");
const cors = require("cors");
const countriesRoutes = require("./routes/countries");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/countries", countriesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API spintheglobe attiva" });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
