const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server slusa na portu: ${PORT}`);
});

app.use(express.static("client"));
app.use(express.json());

app.get("/api/podatak", (req, res) => {
  res.json({
    msg: "Uspesno",
    data: "Pogodio si rutu",
  });
});

app.get("/api/niz", (req, res) => {
  const niz = [1, 2, 3, 4];

  res.json({
    niz,
  });
});

app.post("/api/posalji", (req, res) => {
  const podaci = req.body;

  console.log(podaci);

  res.json({
    msg: "Uspesno ste poslali podatke!",
  });
});
